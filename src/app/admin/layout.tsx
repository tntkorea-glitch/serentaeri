import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/?error=forbidden");
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-gray-900 text-gray-100 p-4 space-y-1">
        <div className="text-sm font-semibold text-gray-400 mb-4 px-2">
          serentaeri Admin
        </div>
        <NavLink href="/admin">대시보드</NavLink>
        <NavLink href="/admin/products">상품 관리</NavLink>
        <NavLink href="/admin/recipes">레시피 관리</NavLink>
        <NavLink href="/admin/body-parts">인체 부위</NavLink>
        <NavLink href="/admin/orders">주문 관리</NavLink>
        <div className="pt-4 mt-4 border-t border-gray-800">
          <NavLink href="/">← 사이트로</NavLink>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 p-8 overflow-x-auto">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
    >
      {children}
    </Link>
  );
}
