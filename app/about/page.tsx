import type { Metadata } from "next";
import { getProfile } from "@/lib/profile";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <div className="flex flex-col gap-14">
      <section className="grid gap-8 sm:grid-cols-[12rem_1fr]">
        <div>
          <h1 className="text-3xl font-bold">About</h1>
          {profile.role && <p className="mt-2 text-sm leading-relaxed text-muted">{profile.role}</p>}
          <ul className="mt-4 flex flex-col gap-1.5 font-mono text-xs">
            {profile.email && (
              <li>
                <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                  {profile.email}
                </a>
              </li>
            )}
            {profile.github && (
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  {profile.github.replace(/^https?:\/\//, "")}
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-4 border-l-2 border-accent pl-6 leading-relaxed">
          {profile.bio.split(/\r?\n\s*\r?\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {profile.timeline.length > 0 && (
        <section>
          <h2 className="flex items-baseline gap-3 border-b border-line pb-3 text-xl font-semibold">
            <span className="section-no">01</span>이력
          </h2>
          <ol className="mt-2">
            {profile.timeline.map((t, i) => (
              <li
                key={i}
                className="grid gap-1 border-b border-dashed border-line py-4 last:border-0 sm:grid-cols-[12rem_1fr] sm:gap-6"
              >
                <p className="font-mono text-xs text-accent sm:pt-1">{t.period}</p>
                <div>
                  <p className="font-medium">{t.title}</p>
                  {t.detail && <p className="mt-0.5 text-sm text-muted">{t.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section>
        <h2 className="flex items-baseline gap-3 border-b border-line pb-3 text-xl font-semibold">
          <span className="section-no">02</span>기술 스택
        </h2>
        <dl className="mt-2">
          {profile.skills.map((group) => (
            <div
              key={group.category}
              className="grid gap-2 border-b border-dashed border-line py-4 last:border-0 sm:grid-cols-[12rem_1fr] sm:gap-6"
            >
              <dt className="font-mono text-xs font-medium uppercase tracking-wider text-muted sm:pt-1">
                {group.category}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="rounded-md border border-line bg-card px-2.5 py-1 text-sm">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
