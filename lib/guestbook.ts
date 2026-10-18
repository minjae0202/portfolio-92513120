import { connectDB } from "@/lib/mongodb";
import { GuestbookEntryModel } from "@/models/GuestbookEntry";

export type GuestbookEntry = {
  id: string;
  userId: string;
  authorName: string;
  message: string;
  createdAt: string;
};

type EntryDocLike = {
  _id: unknown;
  userId: unknown;
  authorName: string;
  message: string;
  createdAt?: Date;
};

function toEntry(doc: EntryDocLike): GuestbookEntry {
  return {
    id: String(doc._id),
    userId: String(doc.userId),
    authorName: doc.authorName,
    message: doc.message,
    createdAt: (doc.createdAt ?? new Date()).toISOString().slice(0, 16).replace("T", " "),
  };
}

export async function getEntries(limit = 50): Promise<GuestbookEntry[]> {
  await connectDB();
  const docs = await GuestbookEntryModel.find().sort({ createdAt: -1 }).limit(limit).lean();
  return docs.map((doc) => toEntry(doc as unknown as EntryDocLike));
}

export async function createEntry(input: {
  userId: string;
  authorName: string;
  message: string;
}): Promise<GuestbookEntry> {
  await connectDB();
  const doc = await GuestbookEntryModel.create(input);
  return toEntry(doc.toObject() as EntryDocLike);
}

// 본인 글이거나 관리자일 때만 삭제 — 조건을 쿼리에 넣어 DB 레벨에서 보장
export async function deleteEntry(id: string, userId: string, isAdmin: boolean): Promise<boolean> {
  await connectDB();
  try {
    const filter = isAdmin ? { _id: id } : { _id: id, userId };
    const result = await GuestbookEntryModel.deleteOne(filter);
    return result.deletedCount === 1;
  } catch {
    return false;
  }
}
