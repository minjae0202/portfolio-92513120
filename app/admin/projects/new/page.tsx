import type { Metadata } from "next";
import { requireAdmin } from "@/lib/authz";
import { createProjectAction } from "@/lib/actions";
import { ProjectForm } from "@/components/ProjectForm";

export const metadata: Metadata = { title: "새 프로젝트" };

export default async function NewProjectPage() {
  await requireAdmin();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">새 프로젝트</h1>
      <ProjectForm action={createProjectAction} submitLabel="등록하기" />
    </div>
  );
}
