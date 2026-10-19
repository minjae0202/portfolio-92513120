import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectLinks } from "@/components/ProjectLinks";
import { CategoryBadge } from "@/components/CategoryBadge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-5 transition hover:border-accent/50">
      <div className="flex items-center gap-2 text-xs text-muted">
        <CategoryBadge category={project.category} />
        {project.period && <span>{project.period}</span>}
        <span className="ml-auto">조회 {project.views}</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold">
          <Link href={`/projects/${project.id}`} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{project.summary}</p>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {project.techStack.map((t) => (
          <li key={t} className="rounded-md bg-subtle px-2 py-0.5 text-xs">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <ProjectLinks repoUrl={project.repoUrl} deployUrl={project.deployUrl} />
      </div>
    </article>
  );
}
