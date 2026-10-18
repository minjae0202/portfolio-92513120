import type { Metadata } from "next";
import { requireAdmin } from "@/lib/authz";
import { getProfile } from "@/lib/profile";
import { updateProfileAction } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata: Metadata = { title: "프로필 수정" };

export default async function EditProfilePage() {
  await requireAdmin();
  const profile = await getProfile();

  const skillsText = profile.skills.map((s) => `${s.category}: ${s.items.join(", ")}`).join("\n");
  const timelineText = profile.timeline.map((t) => `${t.period} | ${t.title} | ${t.detail}`).join("\n");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">프로필 수정</h1>
      <form action={updateProfileAction} className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="label">이름</label>
            <input id="name" name="name" required defaultValue={profile.name} className="field" />
          </div>
          <div>
            <label htmlFor="role" className="label">소속 / 역할</label>
            <input id="role" name="role" defaultValue={profile.role} className="field" />
          </div>
        </div>
        <div>
          <label htmlFor="intro" className="label">한 줄 소개 (메인 화면)</label>
          <input id="intro" name="intro" defaultValue={profile.intro} className="field" />
        </div>
        <div>
          <label htmlFor="bio" className="label">자기소개 (빈 줄로 문단 구분)</label>
          <textarea id="bio" name="bio" rows={6} defaultValue={profile.bio} className="field" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="label">공개 이메일</label>
            <input id="email" name="email" type="email" defaultValue={profile.email} className="field" />
          </div>
          <div>
            <label htmlFor="github" className="label">GitHub 주소</label>
            <input id="github" name="github" type="url" defaultValue={profile.github} className="field" />
          </div>
        </div>
        <div>
          <label htmlFor="skills" className="label">기술 스택 — 한 줄에 &quot;분류: 기술1, 기술2&quot;</label>
          <textarea id="skills" name="skills" rows={5} defaultValue={skillsText} className="field font-mono" />
        </div>
        <div>
          <label htmlFor="timeline" className="label">이력 — 한 줄에 &quot;기간 | 제목 | 설명&quot;</label>
          <textarea id="timeline" name="timeline" rows={5} defaultValue={timelineText} className="field font-mono" />
        </div>
        <div>
          <SubmitButton label="저장하기" />
        </div>
      </form>
    </div>
  );
}
