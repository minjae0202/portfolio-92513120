import Link from "next/link";
import { auth } from "@/auth";
import { isAdmin } from "@/lib/authz";
import { logoutAction } from "@/lib/actions";

const nav = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/guestbook", label: "Guestbook" },
];

export async function SiteHeader() {
  const session = await auth(); // 서버에서 세션 쿠키를 읽어 완성된 HTML을 내려줌

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4 sm:gap-8">
        <Link href="/" className="shrink-0 whitespace-nowrap font-mono text-sm font-semibold">
          <span className="text-accent">~/</span>Portfolio
          <span className="ml-0.5 hidden h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-accent sm:inline-block" />
        </Link>
        <nav className="flex min-w-0 flex-1 overflow-x-auto font-mono [scrollbar-width:none] text-xs sm:gap-1 sm:text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-1.5 py-1 text-muted hover:bg-subtle hover:text-foreground sm:px-2"
            >
              {item.label}
            </Link>
          ))}
          {isAdmin(session) && (
            <Link href="/admin" className="whitespace-nowrap rounded-md px-1.5 py-1 text-accent hover:bg-subtle sm:px-2">
              Admin
            </Link>
          )}
        </nav>
        <div className="flex shrink-0 items-center gap-2 text-sm">
          {session?.user ? (
            <>
              <span className="hidden text-muted sm:inline">{session.user.name}님</span>
              <form action={logoutAction}>
                <button className="whitespace-nowrap rounded-md border border-line px-2.5 py-1.5 hover:border-accent hover:text-accent sm:px-3">
                  로그아웃
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="whitespace-nowrap rounded-md border border-line px-2.5 py-1.5 hover:border-accent hover:text-accent sm:px-3"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
