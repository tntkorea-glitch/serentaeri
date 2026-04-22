import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 text-gray-500 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="text-base font-bold text-gray-900 mb-2">serentaeri</div>
          <p className="text-xs leading-relaxed">
            도테라 아로마로 부위별 케어. 매일의 웰니스를 위한 에센셜 오일과
            레시피를 제공합니다.
          </p>
        </div>

        <div>
          <h4 className="text-gray-900 font-semibold mb-3 text-xs tracking-wider uppercase">
            쇼핑
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/products" className="hover:text-gray-900">전체 상품</Link></li>
            <li><Link href="/body-map" className="hover:text-gray-900">부위별 레시피</Link></li>
            <li><Link href="/recipes" className="hover:text-gray-900">레시피 모음</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gray-900 font-semibold mb-3 text-xs tracking-wider uppercase">
            고객센터
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/orders" className="hover:text-gray-900">주문 내역</Link></li>
            <li><Link href="/faq" className="hover:text-gray-900">자주 묻는 질문</Link></li>
            <li><Link href="/contact" className="hover:text-gray-900">문의하기</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gray-900 font-semibold mb-3 text-xs tracking-wider uppercase">
            정책
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/terms" className="hover:text-gray-900">이용약관</Link></li>
            <li><Link href="/privacy" className="hover:text-gray-900">개인정보처리방침</Link></li>
            <li><Link href="/refund" className="hover:text-gray-900">환불 정책</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-5 max-w-6xl mx-auto">
        <p className="text-[11px] text-gray-400 leading-relaxed">
          본 사이트의 콘텐츠는 일반 정보 제공 목적이며, 의학적 진단·치료·예방을
          대체하지 않습니다. 건강에 관한 결정은 반드시 의료 전문가와 상의하세요.
          알레르기·임산부·영유아·반려동물이 있는 가정은 사용 전 주의사항을
          확인하세요.
        </p>
        <p className="text-[11px] text-gray-400 mt-2">
          © {new Date().getFullYear()} serentaeri. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
