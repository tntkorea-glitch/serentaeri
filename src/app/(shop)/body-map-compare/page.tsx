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

// 이미지 C (Depositphotos 전신) 핫스팟 — 중앙 인체 기준 (이미지에서 인체가 차지하는 위치 대략)
// 이미지 전체 비율 기준 (%)
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

export default async function BodyMapComparePage() {
  const parts = await prisma.bodyPart.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8 text-center">
        <div className="inline-block text-xs font-semibold tracking-widest text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full mb-3">
          STYLE COMPARE
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
          인체맵 스타일 3가지 비교
        </h1>
        <p className="text-sm text-gray-500">
          어떤 느낌으로 갈지 골라줘. A는 지금 쓸 수 있고, B·C는 레퍼런스.
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

      <div className="mt-10 rounded-xl bg-amber-50 border border-amber-200 p-6">
        <h3 className="text-base font-bold text-amber-900 mb-3">어떻게 할까?</h3>
        <div className="space-y-2 text-sm text-amber-900 leading-relaxed">
          <p>
            <strong>① A 그대로 쓰기</strong> — 지금 바로 출시 가능. 나중에 C처럼
            정교한 버전으로 교체 가능.
          </p>
          <p>
            <strong>② C 스타일 라이선스 구매 후 사용</strong> — Depositphotos에서
            구매(~$15~30) → 라벨 없는 버전 받기 → 영어 라벨 포토샵으로 제거 또는
            라벨 없는 원본 요청.
          </p>
          <p>
            <strong>③ C 스타일을 자체 SVG로 재현</strong> — 시간 3~5시간, 결과물은
            저작권 100% 우리 것. A보다 훨씬 정교하게 다듬음.
          </p>
          <p>
            <strong>④ Wikimedia/공개 이미지 탐색</strong> — CC0 라이선스 전신
            해부도 찾아 사용. 운에 따라 품질 차이.
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
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
