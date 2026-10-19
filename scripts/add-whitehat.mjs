// 이미 시드된 DB에 화이트햇 스쿨 내용과 category 필드를 반영하는 1회성 마이그레이션
// 실행: node --env-file=.env.local scripts/add-whitehat.mjs   (여러 번 실행해도 안전)
import mongoose from "mongoose";
import {
  WHITEHAT_BIO,
  WHITEHAT_SKILLS,
  WHITEHAT_TIMELINE,
  whitehatProject,
} from "../lib/seed-data.ts";

await mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection.db;
const projects = db.collection("projects");
const profiles = db.collection("profiles");
const oid = (id) => new mongoose.Types.ObjectId(id);

// 1) isCourseProject → category
await projects.updateMany(
  { category: { $exists: false }, isCourseProject: true },
  { $set: { category: "course" } }
);
await projects.updateMany({ category: { $exists: false } }, { $set: { category: "personal" } });
await projects.updateMany({}, { $unset: { isCourseProject: "" } });

// 2) 화이트햇 프로젝트 추가 + 포트폴리오 카드를 뒤로
const { _id, ...project } = whitehatProject;
const now = new Date();
await projects.updateOne(
  { _id: oid(_id) },
  { $setOnInsert: { ...project, views: 0, createdAt: now, updatedAt: now } },
  { upsert: true }
);
await projects.updateOne({ _id: oid("0000000000000000000000a2"), order: 2 }, { $set: { order: 3 } });

// 3) 프로필: 소속, 자기소개, 기술 스택, 이력
const profile = await profiles.findOne();
const set = {};
if (!profile.role.includes("화이트햇")) set.role = `${profile.role} · 화이트햇 스쿨 4기`;
if (!profile.bio.includes("화이트햇 스쿨")) set.bio = `${profile.bio}\n\n${WHITEHAT_BIO}`;
if (Object.keys(set).length) await profiles.updateOne({ _id: profile._id }, { $set: set });
if (!profile.skills.some((s) => s.category === WHITEHAT_SKILLS.category)) {
  await profiles.updateOne({ _id: profile._id }, { $push: { skills: WHITEHAT_SKILLS } });
}
if (!profile.timeline.some((t) => t.title === WHITEHAT_TIMELINE.title)) {
  await profiles.updateOne(
    { _id: profile._id },
    { $push: { timeline: { $each: [WHITEHAT_TIMELINE], $position: 0 } } }
  );
}

const after = await profiles.findOne({}, { projection: { role: 1, timeline: 1 } });
const list = await projects.find({}, { projection: { title: 1, category: 1, order: 1 } }).sort({ order: 1 }).toArray();
console.log("role:", after.role);
console.log("timeline:", after.timeline.map((t) => t.title).join(" / "));
for (const p of list) console.log(p.order, p.category, p.title);
await mongoose.disconnect();
