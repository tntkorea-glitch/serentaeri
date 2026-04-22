import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [productCount, recipeCount, orderCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.recipe.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">대시보드</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="상품" value={productCount} />
        <StatCard label="레시피" value={recipeCount} />
        <StatCard label="주문" value={orderCount} />
        <StatCard label="회원" value={userCount} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-3xl font-bold">{value.toLocaleString()}</div>
    </div>
  );
}
