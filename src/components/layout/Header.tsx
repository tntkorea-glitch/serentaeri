import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export default async function Header() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight">
            serentaeri
          </span>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest">
            doTERRA care
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-gray-700">
          <Link href="/body-map" className="hover:text-gray-900 transition-colors">
            부위별 레시피
          </Link>
          <Link href="/recipes" className="hover:text-gray-900 transition-colors">
            전체 레시피
          </Link>
          <Link href="/products" className="hover:text-gray-900 transition-colors">
            상품
          </Link>
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/cart"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="장바구니"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0" />
            </svg>
          </Link>
          {session?.user ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-xs px-2 py-1 bg-gray-900 text-white rounded-md"
                >
                  관리자
                </Link>
              )}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="text-gray-600 hover:text-gray-900"
                >
                  로그아웃
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
