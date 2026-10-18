import { connectDB } from "@/lib/mongodb";
import { ProjectModel } from "@/models/Project";
import { seedProjects } from "@/lib/seed-data";

export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  period: string;
  techStack: string[];
  highlights: string[];
  repoUrl: string;
  deployUrl: string;
  isCourseProject: boolean;
  featured: boolean;
  order: number;
  views: number;
  createdAt: string;
};

export type ProjectInput = Omit<Project, "id" | "views" | "createdAt">;

type ProjectDocLike = Omit<Project, "id" | "createdAt"> & {
  _id: unknown;
  createdAt?: Date;
};

function toProject(doc: ProjectDocLike): Project {
  return {
    id: String(doc._id),
    title: doc.title,
    summary: doc.summary,
    description: doc.description ?? "",
    period: doc.period ?? "",
    techStack: doc.techStack ?? [],
    highlights: doc.highlights ?? [],
    repoUrl: doc.repoUrl ?? "",
    deployUrl: doc.deployUrl ?? "",
    isCourseProject: Boolean(doc.isCourseProject),
    featured: Boolean(doc.featured),
    order: doc.order ?? 0,
    views: doc.views ?? 0,
    createdAt: (doc.createdAt ?? new Date()).toISOString().slice(0, 10),
  };
}

async function seedIfEmpty() {
  const count = await ProjectModel.estimatedDocumentCount();
  if (count === 0) {
    try {
      await ProjectModel.insertMany(seedProjects, { ordered: false });
    } catch {
      // 다른 요청이 먼저 시드한 경우(중복 _id) — 무시
    }
  }
}

export async function getProjects(): Promise<Project[]> {
  await connectDB();
  await seedIfEmpty();
  const docs = await ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean();
  return docs.map((doc) => toProject(doc as unknown as ProjectDocLike));
}

export async function getProject(id: string): Promise<Project | undefined> {
  await connectDB();
  try {
    const doc = await ProjectModel.findById(id).lean();
    return doc ? toProject(doc as unknown as ProjectDocLike) : undefined;
  } catch {
    return undefined; // ObjectId 형식이 아니면 '찾을 수 없음'으로 처리
  }
}

// 상세 페이지 조회 시 조회수 +1 후 최신 문서를 반환
export async function viewProject(id: string): Promise<Project | undefined> {
  await connectDB();
  try {
    const doc = await ProjectModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).lean();
    return doc ? toProject(doc as unknown as ProjectDocLike) : undefined;
  } catch {
    return undefined;
  }
}

export async function createProject(input: ProjectInput): Promise<Project> {
  await connectDB();
  const doc = await ProjectModel.create(input);
  return toProject(doc.toObject() as ProjectDocLike);
}

export async function updateProject(id: string, input: ProjectInput): Promise<void> {
  await connectDB();
  await ProjectModel.findByIdAndUpdate(id, input, { runValidators: true });
}

export async function deleteProject(id: string): Promise<void> {
  await connectDB();
  await ProjectModel.findByIdAndDelete(id);
}
