import Link from "next/link";
import { getProfile } from "@/lib/profile";
import { getProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectLinks } from "@/components/ProjectLinks";

function SectionTitle({ no, title, children }: { no: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
      <h2 className="flex items-baseline gap-3 text-xl font-semibold">
        <span className="section-no">{no}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

export default async function HomePage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  const courseProjects = projects.filter((p) => p.category === "course");
  const featured = projects.filter((p) => p.featured && p.category !== "course").slice(0, 4);

  return (
    <div className="flex flex-col gap-20">
      {/* 소개 */}
      <section className="grid-bg -mx-4 -mt-10 border-b border-line px-4 pb-16 pt-16 sm:pt-24">
        <div className="flex flex-col gap-6">
          {profile.role && (
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {profile.role}
            </p>
          )}
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            안녕하세요,
            <br />
            <span className="text-accent">{profile.name}</span>입니다.
          </h1>
          {profile.intro && <p className="max-w-2xl text-lg text-muted">{profile.intro}</p>}
          <div className="flex gap-3 text-sm">
            <Link
              href="/projects"
              className="rounded-md bg-accent px-5 py-2.5 font-medium text-on-accent hover:bg-accent-strong"
            >
              프로젝트 보기
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-line bg-card px-5 py-2.5 font-medium hover:border-accent hover:text-accent"
            >
              About
            </Link>
          </div>
        </div>
      </section>

      {/* 강의 실습 프로젝트 — 과제 필수 링크 */}
      {courseProjects.length > 0 && (
        <section className="flex flex-col gap-6">
          <SectionTitle no="01" title="강의 실습 프로젝트" />
          {courseProjects.map((p) => (
            <article key={p.id} className="overflow-hidden rounded-lg border border-line bg-card shadow-sm">
              {/* 터미널 창 상단 바 */}
              <div className="flex items-center gap-2 border-b border-line bg-subtle px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <p className="ml-2 truncate text-xs text-muted">웹서버보안프로그래밍 · {p.period}</p>
              </div>
              <div className="flex flex-col gap-5 p-6">
                <div>
                  <h3 className="text-2xl font-semibold">
                    <Link href={`/projects/${p.id}`} className="hover:text-accent">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-muted">{p.summary}</p>
                </div>
                <dl className="grid gap-1.5 rounded-md bg-subtle p-4 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-4">
                  {p.repoUrl && (
                    <>
                      <dt className="text-accent">저장소</dt>
                      <dd className="break-all font-mono">{p.repoUrl}</dd>
                    </>
                  )}
                  {p.deployUrl && (
                    <>
                      <dt className="text-accent">배포 주소</dt>
                      <dd className="break-all font-mono">{p.deployUrl}</dd>
                    </>
                  )}
                </dl>
                <ProjectLinks repoUrl={p.repoUrl} deployUrl={p.deployUrl} size="md" />
              </div>
            </article>
          ))}
        </section>
      )}

      {/* 대표 프로젝트 */}
      {featured.length > 0 && (
        <section className="flex flex-col gap-6">
          <SectionTitle no="02" title="대표 프로젝트">
            <Link href="/projects" className="text-xs text-muted hover:text-accent">
              전체 보기 →
            </Link>
          </SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* 기술 스택 */}
      <section className="flex flex-col gap-6">
        <SectionTitle no="03" title="기술 스택" />
        <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {profile.skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-muted">{group.category}</h3>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="rounded-md border border-line bg-card px-2.5 py-1 text-sm">
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
