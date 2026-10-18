import { connectDB } from "@/lib/mongodb";
import { ProfileModel } from "@/models/Profile";
import { seedProfile } from "@/lib/seed-data";

export type SkillGroup = { category: string; items: string[] };
export type TimelineItem = { period: string; title: string; detail: string };

export type Profile = {
  name: string;
  role: string;
  intro: string;
  bio: string;
  email: string;
  github: string;
  skills: SkillGroup[];
  timeline: TimelineItem[];
};

type ProfileDocLike = Profile & { _id: unknown };

function toProfile(doc: ProfileDocLike): Profile {
  return {
    name: doc.name,
    role: doc.role ?? "",
    intro: doc.intro ?? "",
    bio: doc.bio ?? "",
    email: doc.email ?? "",
    github: doc.github ?? "",
    // 서브도큐먼트의 _id가 Client Component로 넘어가지 않도록 필요한 필드만 복사
    skills: (doc.skills ?? []).map((s) => ({ category: s.category, items: [...(s.items ?? [])] })),
    timeline: (doc.timeline ?? []).map((t) => ({
      period: t.period ?? "",
      title: t.title ?? "",
      detail: t.detail ?? "",
    })),
  };
}

// 프로필은 문서 1개만 사용합니다
export async function getProfile(): Promise<Profile> {
  await connectDB();
  let doc = await ProfileModel.findOne().lean();
  if (!doc) {
    // 고정 _id로 upsert — 동시 요청이 와도 프로필 문서는 1개만 생김
    await ProfileModel.updateOne(
      { _id: seedProfile._id },
      { $setOnInsert: seedProfile },
      { upsert: true }
    ).catch(() => {});
    doc = await ProfileModel.findOne().lean();
  }
  return toProfile(doc as unknown as ProfileDocLike);
}

export async function updateProfile(input: Profile): Promise<void> {
  await connectDB();
  await ProfileModel.findOneAndUpdate({}, input, { upsert: true, runValidators: true });
}
