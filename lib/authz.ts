import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import { auth } from "@/auth";

// 인가(Authorization): 포트폴리오 주인(ADMIN_EMAIL)만 관리자 기능 사용
export function isAdmin(session: Session | null): boolean {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const email = session?.user?.email?.toLowerCase();
  return Boolean(adminEmail && email && email === adminEmail);
}

// 페이지와 Server Action 양쪽에서 호출 — 화면에서 버튼을 숨기는 것만으로는 막을 수 없음
export async function requireAdmin(): Promise<Session> {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!isAdmin(session)) redirect("/");
  return session;
}
