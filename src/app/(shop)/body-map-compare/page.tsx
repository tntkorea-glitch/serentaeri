import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import BodyMap from "@/components/body-map/BodyMap";

// 이미지 B (상반신 해부도) 핫스팟 — 흉복부만
const PHOTO_HOTSPOTS_B = [
  { slug: "lung",      name: "폐",   x: 30, y: 30 },
  { slug: "heart",     name: "심장", x: 55, y: 32 },
  { slug: "liver",     name: "간",   x: 38, y: 53 },
  { slug: "stomach",   name: "위",   x: 58, y: 55 },
  { slug: "intestine", name: "장",   x: 50, y: 72 },
];

// 이미지 C (Depositphotos 전신) 핫스팟
const PHOTO_HOTSPOTS_C = [
  { slug: "scalp",      name: "두피", x: 50, y: 22 },
  { slug: "eye",        name: "눈",   x: 50, y: 25 },
  { slug: "neck",       name: "목",   x: 50, y: 32 },
  { slug: "lung",       name: "폐",   x: 54, y: 40 },
  { slug: "heart",      name: "심장", x: 47, y: 38 },
  { slug: "liver",      name: "간",   x: 47, y: 50 },
  { slug: "stomach",    name: "위",   x: 52, y: 50 },
  { slug: "intestine",  name: "장",   x: 50, y: 60 },
  { slug: "knee",       name: "무릎", x: 48, y: 82 },
  { slug: "foot",       name: "발",   x: 50, y: 95 },
];

// Wikimedia CC0 템플릿 (Mikael Häggström) — 전신 + 장기
// 이미지 원본 비율 기준 핫스팟 (%)
const WIKI_MALE_HOTSPOTS = [
  { slug: "scalp",      name: "두피", x: 48, y: 5 },
  { slug: "eye",        name: "눈",   x: 48, y: 9 },
  { slug: "neck",       name: "목",   x: 48, y: 17 },
  { slug: "lung",       name: "폐",   x: 42, y: 28 },
  { slug: "heart",      name: "심장", x: 52, y: 30 },
  { slug: "liver",      name: "간",   x: 42, y: 40 },
  { slug: "stomach",    name: "위",   x: 53, y: 42 },
  { slug: "intestine",  name: "장",   x: 48, y: 52 },
  { slug: "knee",       name: "무릎", x: 45, y: 80 },
  { slug: "foot",       name: "발",   x: 47, y: 96 },
];

export default async function BodyMapComparePage() {
  const parts = await prisma.bodyPart.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8 text-center">
        <div className="inline-block text-xs font-semibold tracking-widest text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full mb-3">
          STYLE COMPARE
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
          인체맵 스타일 비교
        </h1>
        <p className="text-sm text-gray-500">
          A/B/C + Wikimedia CC0 후보들. 어떤 느낌으로 갈지 골라줘.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* A: SVG */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="text-xs text-emerald-700 font-bold tracking-wider mb-1">
            OPTION A
          </div>
          <h2 className="text-lg font-bold mb-1">자체 SVG 해부도</h2>
          <p className="text-[11px] text-gray-500 mb-4">
            전신 · 장기 5종 반투명 · 저작권 100% 안전
          </p>
          <div className="flex items-center justify-center bg-gray-50 rounded-xl p-2 mb-4">
            <BodyMap parts={parts} />
          </div>
          <ul className="text-[11px] text-gray-600 space-y-0.5">
            <li>✓ 전신 핫스팟 23개 모두 배치</li>
            <li>✓ 저작권 리스크 0</li>
            <li>✓ 지금 바로 사용 가능</li>
            <li>× 사실적 사진만큼 디테일 X</li>
          </ul>
        </section>

        {/* B: 독일어 상반신 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="text-xs text-orange-700 font-bold tracking-wider mb-1">
            OPTION B · 참고용
          </div>
          <h2 className="text-lg font-bold mb-1">사진 해부도 (상반신)</h2>
          <p className="text-[11px] text-gray-500 mb-4">
            네이버 블로그 이미지 · 독일어 라벨 · 저작권 불명
          </p>
          <div
            className="relative w-full max-w-[240px] mx-auto bg-white rounded-lg overflow-hidden mb-4"
            style={{ aspectRatio: "960 / 832" }}
          >
            <Image
              src="/body-ref.jpg"
              alt="Anatomy ref B"
              fill
              className="object-contain"
              unoptimized
            />
            {PHOTO_HOTSPOTS_B.map((h) => (
              <Link
                key={h.slug}
                href={`/body-map/${h.slug}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                <span className="absolute inset-0 -m-1 rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative block w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-md" />
              </Link>
            ))}
          </div>
          <ul className="text-[11px] text-gray-600 space-y-0.5">
            <li>✓ 진짜 사진처럼 사실적</li>
            <li>× 상반신만 — 머리/다리 없음</li>
            <li>× 독일어 라벨 박혀있음</li>
            <li>× 저작권 불명 — 사용 불가</li>
          </ul>
        </section>

        {/* C: Depositphotos 전신 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="text-xs text-orange-700 font-bold tracking-wider mb-1">
            OPTION C · 참고용
          </div>
          <h2 className="text-lg font-bold mb-1">스톡 일러스트 (전신)</h2>
          <p className="text-[11px] text-gray-500 mb-4">
            Depositphotos 유료 스톡 · 영어 라벨
          </p>
          <div
            className="relative w-full max-w-[240px] mx-auto bg-white rounded-lg overflow-hidden mb-4"
            style={{ aspectRatio: "1 / 1" }}
          >
            <Image
              src="/body-ref2.jpg"
              alt="Anatomy ref C"
              fill
              className="object-contain"
              unoptimized
            />
            {PHOTO_HOTSPOTS_C.map((h) => (
              <Link
                key={h.slug}
                href={`/body-map/${h.slug}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                <span className="absolute inset-0 -m-1 rounded-full bg-amber-400 opacity-70 animate-ping" />
                <span className="relative block w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-md" />
              </Link>
            ))}
          </div>
          <ul className="text-[11px] text-gray-600 space-y-0.5">
            <li>✓ 전신 + 리얼 장기 표현</li>
            <li>× 스톡 이미지 (라이선스 구매 필요, ~$15)</li>
            <li>× 주변 장기 일러스트와 핫스팟 겹침</li>
            <li>× 영어 라벨 박혀있음</li>
          </ul>
        </section>
      </div>

      {/* ======== 신규: Option 4 (Wikimedia CC0) ======== */}
      <div className="mt-12 mb-6">
        <div className="inline-block text-xs font-semibold tracking-widest text-sky-700 bg-sky-100 px-2.5 py-1 rounded-full mb-2">
          NEW · OPTION 4
        </div>
        <h2 className="text-xl md:text-2xl font-extrabold">
          Wikimedia Commons CC0 공개도메인 후보
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Mikael Häggström 작 · CC0 1.0 (저작권 없음, 자유롭게 수정/상업이용 가능) · 이미지에 박힌 텍스트는 전부 &quot;Example text&quot; 플레이스홀더라 무시/삭제 가능
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* D-1: Wikimedia Male */}
        <section className="bg-white rounded-2xl border border-sky-200 p-5">
          <div className="text-xs text-sky-700 font-bold tracking-wider mb-1">
            OPTION 4-A · 남성 전신
          </div>
          <h3 className="text-lg font-bold mb-1">Wikimedia 남성 템플릿</h3>
          <p className="text-[11px] text-gray-500 mb-4">
            전신 + 장기 · CC0 · 1363×1211
          </p>
          <div
            className="relative w-full max-w-[240px] mx-auto bg-white rounded-lg overflow-hidden mb-4"
            style={{ aspectRatio: "1363 / 1211" }}
          >
            <Image
              src="/body-candidates/male-organs.svg"
              alt="Wikimedia CC0 male template"
              fill
              className="object-contain"
              unoptimized
            />
            {WIKI_MALE_HOTSPOTS.map((h) => (
              <Link
                key={h.slug}
                href={`/body-map/${h.slug}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                <span className="absolute inset-0 -m-1 rounded-full bg-sky-400 opacity-70 animate-ping" />
                <span className="relative block w-3 h-3 rounded-full bg-sky-500 border-2 border-white shadow-md" />
              </Link>
            ))}
          </div>
          <ul className="text-[11px] text-gray-600 space-y-0.5">
            <li>✓ 전신 + 주요 장기 (뇌/심장/폐/간/위/장/신장)</li>
            <li>✓ CC0 — 상업이용/수정 100% 자유</li>
            <li>✓ 영어 라벨조차 없음 (플레이스홀더만)</li>
            <li>△ 화면 비율이 옆으로 넓음 (인체 왼쪽 + 라벨 공간 오른쪽)</li>
            <li>△ 인체 부분만 잘라내는 후처리 필요</li>
          </ul>
        </section>

        {/* D-2: Wikimedia Female */}
        <section className="bg-white rounded-2xl border border-sky-200 p-5">
          <div className="text-xs text-sky-700 font-bold tracking-wider mb-1">
            OPTION 4-B · 여성 전신
          </div>
          <h3 className="text-lg font-bold mb-1">Wikimedia 여성 템플릿</h3>
          <p className="text-[11px] text-gray-500 mb-4">
            전신 + 장기 · CC0 · 1454×2320
          </p>
          <div
            className="relative w-full max-w-[240px] mx-auto bg-white rounded-lg overflow-hidden mb-4"
            style={{ aspectRatio: "1454 / 2320" }}
          >
            <Image
              src="/body-candidates/female-organs.svg"
              alt="Wikimedia CC0 female template"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <ul className="text-[11px] text-gray-600 space-y-0.5">
            <li>✓ 세로 비율이 전신에 더 적합</li>
            <li>✓ CC0 — 자유 사용</li>
            <li>✓ 가장 널리 쓰이는 표준 템플릿 (100+ 파생작)</li>
            <li>△ 여성 전용 — 남녀 공용인지 결정 필요</li>
          </ul>
        </section>

        {/* D-3: Internal organs only */}
        <section className="bg-white rounded-2xl border border-sky-200 p-5">
          <div className="text-xs text-sky-700 font-bold tracking-wider mb-1">
            OPTION 4-C · 장기만
          </div>
          <h3 className="text-lg font-bold mb-1">장기 단독 (Internal organs)</h3>
          <p className="text-[11px] text-gray-500 mb-4">
            장기 클로즈업 · CC0 · 1363×1212
          </p>
          <div
            className="relative w-full max-w-[240px] mx-auto bg-white rounded-lg overflow-hidden mb-4"
            style={{ aspectRatio: "1363 / 1212" }}
          >
            <Image
              src="/body-candidates/internal-organs.svg"
              alt="Wikimedia CC0 internal organs"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <ul className="text-[11px] text-gray-600 space-y-0.5">
            <li>✓ 장기 디테일 최상급</li>
            <li>✓ CC0 — 자유 사용</li>
            <li>× 전신 실루엣 없음 (흉복부 단면만)</li>
            <li>△ 자체 SVG 실루엣과 합성하면 A보다 훨씬 사실적</li>
          </ul>
        </section>
      </div>

      {/* ======== OPTION 3 설명 ======== */}
      <div className="mt-12 mb-6">
        <div className="inline-block text-xs font-semibold tracking-widest text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full mb-2">
          OPTION 3 · 계획
        </div>
        <h2 className="text-xl md:text-2xl font-extrabold">
          C 스타일을 자체 SVG로 재현
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Depositphotos 스타일의 사실적 전신 해부도를 직접 그려서 저작권 100% 우리 것.
        </p>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 space-y-4">
        <div>
          <h4 className="text-sm font-bold text-purple-900 mb-1">작업 범위</h4>
          <ul className="text-sm text-purple-900 space-y-1 list-disc list-inside">
            <li>현재 <code>HumanSilhouette.tsx</code> 업그레이드 — 근육 음영 + 피부 그라데이션 강화</li>
            <li>장기 재그리기: 심장(심방/심실 분리) / 폐(기관지 트리 표현) / 간(좌엽/우엽) / 위(곡선) / 소장·대장(구불구불) / 신장(콩팥 형태) / 뇌(측면 컷)</li>
            <li>장기별 Path 정교화 — 현재 단순 타원에서 해부학적 실루엣으로</li>
            <li>라벨 없음 (핫스팟으로 대체)</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-purple-900 mb-1">예상 시간</h4>
          <p className="text-sm text-purple-900">3~5시간. 장기 1개당 30~60분.</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-purple-900 mb-1">장단점</h4>
          <ul className="text-sm text-purple-900 space-y-0.5">
            <li>✓ 저작권 100% 우리 것, 영구 사용</li>
            <li>✓ 브랜드 톤(세련된 자연/한방)에 맞춤 가능</li>
            <li>✓ 핫스팟 23개 정확히 배치 가능</li>
            <li>× 시간 투자 3~5시간</li>
            <li>× 4-B(Wikimedia CC0)보다 더 나은지는 실제로 그려봐야 앎</li>
          </ul>
        </div>
        <div className="pt-3 border-t border-purple-300">
          <h4 className="text-sm font-bold text-purple-900 mb-1">추천 순서</h4>
          <p className="text-sm text-purple-900">
            <strong>4-B (Wikimedia 여성 CC0)</strong> 을 먼저 붙여보고, 느낌이 별로면 Option 3로 자체 드로잉. 4-B는 이미 다운로드 완료라 5분이면 붙일 수 있음.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/body-map"
          className="inline-block text-sm text-gray-500 hover:text-gray-900"
        >
          ← 기본 /body-map 으로
        </Link>
      </div>
    </div>
  );
}
