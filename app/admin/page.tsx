import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/authz";
import { getProjects, PROJECT_CATEGORIES } from "@/lib/projects";
import { deleteProjectAction } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminPage() {
  await requireAdmin();
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="flex-1 text-3xl font-bold">관리자</h1>
        <Link href="/admin/profile" className="rounded-lg border border-line px-4 py-2 text-sm hover:bg-subtle">
          프로필 수정
        </Link>
        <Link href="/admin/projects/new" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent-strong">
          + 새 프로젝트
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-line bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-line text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">순서</th>
              <th className="px-4 py-3 font-medium">제목</th>
              <th className="px-4 py-3 font-medium">링크</th>
              <th className="px-4 py-3 font-medium">조회</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 text-muted">{p.order}</td>
                <td className="px-4 py-3">
                  <Link href={`/projects/${p.id}`} className="font-medium hover:text-accent">
                    {p.title}
                  </Link>
                  {p.category !== "personal" && (
                    <span className="ml-2 text-xs text-accent">{PROJECT_CATEGORIES[p.category]}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-muted">
                  {p.repoUrl ? "저장소 ✓" : "저장소 —"} / {p.deployUrl ? "배포 ✓" : "배포 —"}
                </td>
                <td className="px-4 py-3 text-muted">{p.views}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Link href={`/admin/projects/${p.id}/edit`} className="rounded-lg px-3 py-2 text-sm hover:bg-subtle">
                      수정
                    </Link>
                    <form action={deleteProjectAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <SubmitButton label="삭제" pendingLabel="삭제 중..." variant="danger" />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
