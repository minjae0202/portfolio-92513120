"use client";

// 내부 에러 내용(DB 주소, 스택 트레이스)은 화면에 노출하지 않고 일반 문구만 표시
export default function RootError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <h1 className="text-xl font-semibold">페이지를 불러오지 못했습니다.</h1>
      <p className="text-sm text-muted">일시적인 서버/DB 연결 문제일 수 있습니다. 잠시 후 다시 시도해주세요.</p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent-strong"
      >
        다시 시도
      </button>
    </div>
  );
}
