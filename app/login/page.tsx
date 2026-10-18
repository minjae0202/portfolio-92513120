import type { Metadata } from "next";
import Link from "next/link";
import { loginAction } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata: Metadata = { title: "로그인" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { error } = await searchParams; // Next.js 16: searchParams도 Promise

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6">
      <h1 className="text-2xl font-bold">로그인</h1>
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          이메일 또는 비밀번호가 올바르지 않습니다.
        </p>
      )}
      <form action={loginAction} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="label">이메일</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
        <div>
          <label htmlFor="password" className="label">비밀번호</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" className="field" />
        </div>
        <input type="hidden" name="redirectTo" value="/" />
        <SubmitButton label="로그인" pendingLabel="로그인 중..." />
      </form>
      <p className="text-sm text-muted">
        계정이 없나요?{" "}
        <Link href="/register" className="text-accent hover:underline">회원가입</Link>
      </p>
    </div>
  );
}
