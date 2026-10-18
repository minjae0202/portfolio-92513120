import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-1 text-muted">총 {projects.length}개의 프로젝트</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
