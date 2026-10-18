import Link from "next/link";
import { getProfile } from "@/lib/profile";
import { getProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectLinks } from "@/components/ProjectLinks";

export default async function HomePage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  const courseProjects = projects.filter((p) => p.isCourseProject);
  const featured = projects.filter((p) => p.featured && !p.isCourseProject).slice(0, 4);

  return (
    <div className="flex flex-col gap-16">
      {/* 소개 */}
      <section className="flex flex-col gap-4 pt-6">
        <p className="text-sm font-medium text-accent">{profile.role}</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          안녕하세요, {profile.name}입니다.
        </h1>
        <p className="max-w-2xl text-lg text-muted">{profile.intro}</p>
        <div className="flex gap-3 pt-2 text-sm">
          <Link href="/projects" className="rounded-lg bg-accent px-4 py-2 font-medium text-white hover:bg-accent-strong">
            프로젝트 보기
          </Link>
          <Link href="/about" className="rounded-lg border border-line px-4 py-2 font-medium hover:bg-subtle">
            About
          </Link>
        </div>
      </section>

      {/* 강의 실습 프로젝트 — 과제 필수 링크 */}
      {courseProjects.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">강의 실습 프로젝트</h2>
          {courseProjects.map((p) => (
            <article
              key={p.id}
              className="flex flex-col gap-4 rounded-2xl border border-accent/40 bg-accent/5 p-6"
            >
              <div>
                <p className="text-xs font-medium text-accent">웹서버보안프로그래밍 · {p.period}</p>
                <h3 className="mt-1 text-2xl font-semibold">
                  <Link href={`/projects/${p.id}`} className="hover:text-accent">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-2 text-muted">{p.summary}</p>
              </div>
              <dl className="grid gap-2 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-4">
                {p.repoUrl && (
                  <>
                    <dt className="text-muted">저장소</dt>
                    <dd className="break-all font-mono">{p.repoUrl}</dd>
                  </>
                )}
                {p.deployUrl && (
                  <>
                    <dt className="text-muted">배포 주소</dt>
                    <dd className="break-all font-mono">{p.deployUrl}</dd>
                  </>
                )}
              </dl>
              <ProjectLinks repoUrl={p.repoUrl} deployUrl={p.deployUrl} size="md" />
            </article>
          ))}
        </section>
      )}

      {/* 대표 프로젝트 */}
      {featured.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold">대표 프로젝트</h2>
            <Link href="/projects" className="text-sm text-muted hover:text-foreground">
              전체 보기 →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* 기술 스택 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">기술 스택</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {profile.skills.map((group) => (
            <div key={group.category} className="rounded-2xl border border-line bg-card p-5">
              <h3 className="text-sm font-semibold text-muted">{group.category}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="rounded-md bg-subtle px-2 py-1 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
