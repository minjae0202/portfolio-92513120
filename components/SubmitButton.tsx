"use client";

import { useFormStatus } from "react-dom";

type Props = {
  label: string;
  pendingLabel?: string;
  variant?: "primary" | "danger" | "ghost";
};

const styles = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  danger: "text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40",
  ghost: "border border-line hover:bg-subtle",
};

export function SubmitButton({ label, pendingLabel = "저장 중...", variant = "primary" }: Props) {
  const { pending } = useFormStatus(); // 이 버튼을 감싼 form의 제출 상태
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-60 ${styles[variant]}`}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
