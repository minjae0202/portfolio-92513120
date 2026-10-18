import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-5xl font-bold text-accent">404</p>
      <h1 className="text-xl font-semibold">페이지를 찾을 수 없습니다.</h1>
      <Link href="/" className="text-sm text-muted hover:text-foreground">
        ← 홈으로
      </Link>
    </div>
  );
}
