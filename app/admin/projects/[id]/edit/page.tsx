import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/authz";
import { getProject } from "@/lib/projects";
import { updateProjectAction } from "@/lib/actions";
import { ProjectForm } from "@/components/ProjectForm";

export const metadata: Metadata = { title: "프로젝트 수정" };

export default async function EditProjectPage({ params }: PageProps<"/admin/projects/[id]/edit">) {
  await requireAdmin();
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">프로젝트 수정</h1>
      <ProjectForm action={updateProjectAction} project={project} submitLabel="저장하기" />
    </div>
  );
}
