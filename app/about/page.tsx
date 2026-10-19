import type { Metadata } from "next";
import { getProfile } from "@/lib/profile";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h1 className="text-3xl font-bold">About</h1>
        {profile.role && <p className="mt-1 text-muted">{profile.role}</p>}
        <div className="mt-6 flex flex-col gap-4 leading-relaxed">
          {profile.bio.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <ul className="mt-6 flex flex-wrap gap-4 text-sm">
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
      </section>

      {profile.timeline.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">이력</h2>
          <ol className="mt-4 border-l border-line">
            {profile.timeline.map((t, i) => (
              <li key={i} className="relative pb-6 pl-6 last:pb-0">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                <p className="text-xs text-muted">{t.period}</p>
                <p className="font-medium">{t.title}</p>
                {t.detail && <p className="text-sm text-muted">{t.detail}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold">기술 스택</h2>
        <dl className="mt-4 grid gap-3">
          {profile.skills.map((group) => (
            <div key={group.category} className="grid gap-1 sm:grid-cols-[10rem_1fr]">
              <dt className="text-sm font-medium text-muted">{group.category}</dt>
              <dd className="text-sm">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
