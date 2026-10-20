"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import { createUser } from "@/lib/users";
import { createEntry, deleteEntry } from "@/lib/guestbook";
import {
  createProject,
  deleteProject,
  isProjectCategory,
  updateProject,
  type ProjectInput,
} from "@/lib/projects";
import { updateProfile, type Profile } from "@/lib/profile";
import { isAdmin, requireAdmin } from "@/lib/authz";

function text(formData: FormData, key: string, max = 5000): string {
  // textarea는 줄바꿈을 CRLF로 보내므로 LF로 통일해서 저장
  return String(formData.get(key) ?? "").replace(/\r\n?/g, "\n").trim().slice(0, max);
}

// javascript: 같은 스킴으로 링크 XSS가 생기지 않도록 http(s) URL만 허용
function safeUrl(value: string): string {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function lines(value: string): string[] {
  return value.split("\n").map((s) => s.trim()).filter(Boolean);
}

/* ───────── 인증 (7주차) ───────── */

export async function registerAction(formData: FormData) {
  const name = text(formData, "name", 50);
  const email = text(formData, "email", 100).toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) redirect("/register?error=empty");
  if (password.length < 8) redirect("/register?error=short");

  try {
    await createUser({ name, email, password });
  } catch {
    redirect("/register?error=exists");
  }
  await signIn("credentials", { email, password, redirectTo: "/" });
}

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=1"); // 실패 이유는 구분하지 않음
    }
    throw error; // 리다이렉트 신호는 반드시 다시 던짐
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

/* ───────── 방명록 ───────── */

export async function createEntryAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const message = text(formData, "message", 500);
  if (!message) redirect("/guestbook");

  await createEntry({
    userId: session.user.id,
    authorName: session.user.name ?? "익명",
    message,
  });
  revalidatePath("/guestbook");
}

export async function deleteEntryAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const id = text(formData, "id", 50);
  await deleteEntry(id, session.user.id, isAdmin(session));
  revalidatePath("/guestbook");
}

/* ───────── 관리자: 프로젝트 / 프로필 ───────── */

function parseProject(formData: FormData): ProjectInput {
  const title = text(formData, "title", 100);
  const summary = text(formData, "summary", 200);
  if (!title || !summary) throw new Error("제목과 한 줄 소개는 필수입니다.");
  const category = formData.get("category");

  return {
    title,
    summary,
    description: text(formData, "description", 5000),
    period: text(formData, "period", 50),
    techStack: text(formData, "techStack", 500).split(",").map((s) => s.trim()).filter(Boolean),
    highlights: lines(text(formData, "highlights", 3000)),
    repoUrl: safeUrl(text(formData, "repoUrl", 300)),
    deployUrl: safeUrl(text(formData, "deployUrl", 300)),
    category: isProjectCategory(category) ? category : "personal",
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order")) || 0,
  };
}

function revalidateProjects() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
}

export async function createProjectAction(formData: FormData) {
  await requireAdmin();
  const project = await createProject(parseProject(formData));
  revalidateProjects();
  redirect(`/projects/${project.id}`);
}

export async function updateProjectAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id", 50);
  await updateProject(id, parseProject(formData));
  revalidateProjects();
  revalidatePath(`/projects/${id}`);
  redirect("/admin");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  await deleteProject(text(formData, "id", 50));
  revalidateProjects();
}

export async function updateProfileAction(formData: FormData) {
  await requireAdmin();

  // "카테고리: 항목1, 항목2" 한 줄에 하나
  const skills = lines(text(formData, "skills", 3000)).map((line) => {
    const idx = line.indexOf(":");
    const category = idx === -1 ? line : line.slice(0, idx);
    const rest = idx === -1 ? "" : line.slice(idx + 1);
    return {
      category: category.trim(),
      items: rest.split(",").map((s) => s.trim()).filter(Boolean),
    };
  });

  // "기간 | 제목 | 설명" 한 줄에 하나
  const timeline = lines(text(formData, "timeline", 3000)).map((line) => {
    const [period = "", title = "", detail = ""] = line.split("|").map((s) => s.trim());
    return { period, title, detail };
  });

  const profile: Profile = {
    name: text(formData, "name", 50) || "이름",
    role: text(formData, "role", 100),
    intro: text(formData, "intro", 200),
    bio: text(formData, "bio", 5000),
    email: text(formData, "email", 100),
    github: safeUrl(text(formData, "github", 300)),
    skills,
    timeline,
  };

  await updateProfile(profile);
  revalidatePath("/", "layout");
  redirect("/admin");
}
