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
    <header className="sticky top-0 z-10 border-b border-line bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Portfolio<span className="text-accent">.</span>
        </Link>
        <nav className="flex flex-1 gap-4 text-sm text-muted">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
          {isAdmin(session) && (
            <Link href="/admin" className="text-accent hover:text-accent-strong">
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2 text-sm">
          {session?.user ? (
            <>
              <span className="hidden text-muted sm:inline">{session.user.name}님</span>
              <form action={logoutAction}>
                <button className="rounded-lg border border-line px-3 py-1.5 hover:bg-subtle">
                  로그아웃
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="rounded-lg border border-line px-3 py-1.5 hover:bg-subtle">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
