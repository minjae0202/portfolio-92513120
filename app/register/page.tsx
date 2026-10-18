import type { Metadata } from "next";
import Link from "next/link";
import { registerAction } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata: Metadata = { title: "회원가입" };

const messages: Record<string, string> = {
  empty: "이름, 이메일, 비밀번호를 모두 입력해주세요.",
  short: "비밀번호는 8자 이상이어야 합니다.",
  exists: "가입할 수 없는 이메일입니다. 다른 이메일을 사용하거나 로그인해주세요.",
};

export default async function RegisterPage({ searchParams }: PageProps<"/register">) {
  const { error } = await searchParams;
  const message = typeof error === "string" ? messages[error] : undefined;

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6">
      <h1 className="text-2xl font-bold">회원가입</h1>
      {message && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {message}
        </p>
      )}
      <form action={registerAction} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="label">이름</label>
          <input id="name" name="name" required maxLength={50} className="field" />
        </div>
        <div>
          <label htmlFor="email" className="label">이메일</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
        <div>
          <label htmlFor="password" className="label">비밀번호 (8자 이상)</label>
          <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="field" />
        </div>
        <SubmitButton label="가입하고 로그인" pendingLabel="가입 중..." />
      </form>
      <p className="text-sm text-muted">
        이미 계정이 있나요?{" "}
        <Link href="/login" className="text-accent hover:underline">로그인</Link>
      </p>
    </div>
  );
}
