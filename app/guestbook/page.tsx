import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { getEntries } from "@/lib/guestbook";
import { isAdmin } from "@/lib/authz";
import { createEntryAction, deleteEntryAction } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata: Metadata = { title: "Guestbook" };

export default async function GuestbookPage() {
  const [session, entries] = await Promise.all([auth(), getEntries()]);
  const admin = isAdmin(session);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Guestbook</h1>
        <p className="mt-1 text-muted">방문 인사를 남겨주세요. 글쓰기는 로그인 후 가능합니다.</p>
      </div>

      {session?.user ? (
        <form action={createEntryAction} className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-5">
          <label htmlFor="message" className="label">
            {session.user.name}님의 메시지
          </label>
          <textarea id="message" name="message" required maxLength={500} rows={3} className="field" />
          <div className="flex justify-end">
            <SubmitButton label="남기기" />
          </div>
        </form>
      ) : (
        <p className="rounded-2xl border border-dashed border-line p-5 text-sm text-muted">
          <Link href="/login" className="text-accent hover:underline">로그인</Link>하거나{" "}
          <Link href="/register" className="text-accent hover:underline">회원가입</Link>하면 방명록을 남길 수 있습니다.
        </p>
      )}

      <ul className="flex flex-col gap-3">
        {entries.length === 0 && <li className="text-sm text-muted">아직 작성된 글이 없습니다.</li>}
        {entries.map((entry) => {
          const canDelete = admin || entry.userId === session?.user?.id;
          return (
            <li key={entry.id} className="rounded-2xl border border-line bg-card p-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{entry.authorName}</span>
                <span className="text-xs text-muted">{entry.createdAt}</span>
                {canDelete && (
                  <form action={deleteEntryAction} className="ml-auto">
                    <input type="hidden" name="id" value={entry.id} />
                    <SubmitButton label="삭제" pendingLabel="삭제 중..." variant="danger" />
                  </form>
                )}
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm">{entry.message}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
