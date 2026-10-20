import Link from "next/link";
import { notFound } from "next/navigation";
import { viewProject } from "@/lib/projects";
import { ProjectLinks } from "@/components/ProjectLinks";
import { CategoryBadge } from "@/components/CategoryBadge";

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[id]">) {
  const { id } = await params; // Next.js 16: params는 Promise
  const project = await viewProject(id);
  if (!project) notFound();

  return (
    <article className="flex flex-col gap-8">
      <Link href="/projects" className="text-sm text-muted hover:text-foreground">
        ← 프로젝트 목록
      </Link>

      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <CategoryBadge category={project.category} />
          {project.period && <span>{project.period}</span>}
          <span>· 조회 {project.views}</span>
        </div>
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-lg text-muted">{project.summary}</p>
        <ProjectLinks repoUrl={project.repoUrl} deployUrl={project.deployUrl} size="md" />
      </header>

      {(project.repoUrl || project.deployUrl) && (
        <dl className="grid gap-2 rounded-lg border border-line bg-card p-5 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-6">
          {project.repoUrl && (
            <>
              <dt className="text-muted">저장소 주소</dt>
              <dd className="break-all font-mono">{project.repoUrl}</dd>
            </>
          )}
          {project.deployUrl && (
            <>
              <dt className="text-muted">배포 주소</dt>
              <dd className="break-all font-mono">{project.deployUrl}</dd>
            </>
          )}
        </dl>
      )}

      {project.description && (
        <section className="flex flex-col gap-4 leading-relaxed">
          {project.description.split(/\r?\n\s*\r?\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </section>
      )}

      {project.highlights.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold">주요 내용</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="text-accent">▸</span>
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold">사용 기술</h2>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <li key={t} className="rounded-md bg-subtle px-2 py-1 text-sm">
              {t}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
