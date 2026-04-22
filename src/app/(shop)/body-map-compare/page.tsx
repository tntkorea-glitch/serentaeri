import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import BodyMap from "@/components/body-map/BodyMap";

// 사진 이미지(body-ref.jpg) 기준 핫스팟 좌표 — 상반신 해부도이므로 흉복부 장기만
const PHOTO_HOTSPOTS = [
  { slug: "lung",      name: "폐",   x: 30, y: 30 },
  { slug: "heart",     name: "심장", x: 55, y: 32 },
  { slug: "liver",     name: "간",   x: 38, y: 53 },
  { slug: "stomach",   name: "위",   x: 58, y: 55 },
  { slug: "intestine", name: "장",   x: 50, y: 72 },
];

export default async function BodyMapComparePage() {
  const parts = await prisma.bodyPart.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8 text-center">
        <div className="inline-block text-xs font-semibold tracking-widest text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full mb-3">
          PREVIEW COMPARE
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
          인체맵 스타일 비교
        </h1>
        <p className="text-sm text-gray-500">
          좌(A): 자체 제작 SVG 해부도 · 우(B): 사진 기반 해부도 레퍼런스
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Version A: SVG */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-1">A. 자체 SVG 해부도</h2>
          <p className="text-xs text-gray-500 mb-6">
            전신 · 장기 5종 반투명 · 핫스팟 23개 · 저작권 100% 우리 것
          </p>
          <BodyMap parts={parts} />
          <div className="mt-6 space-y-1 text-xs text-gray-500">
            <p>✓ 전신(머리~발) 핫스팟 모두 배치 가능</p>
            <p>✓ 해상도 자유 · 모바일 반응형</p>
            <p>✓ 부위별 색상 조정 · 애니메이션 자유</p>
            <p>× 사진만큼 사실적이지는 않음</p>
          </div>
        </section>

        {/* Version B: Photo */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-1">B. 사진 기반 해부도</h2>
          <p className="text-xs text-gray-500 mb-6">
            상반신만 · 독일어 라벨 박혀있음 · 저작권 불명
          </p>

          <div
            className="relative w-full max-w-xs mx-auto"
            style={{ aspectRatio: "960 / 832" }}
          >
            <Image
              src="/body-ref.jpg"
              alt="Anatomy reference"
              fill
              className="object-contain rounded-lg"
              unoptimized
            />
            {PHOTO_HOTSPOTS.map((h) => (
              <Link
                key={h.slug}
                href={`/body-map/${h.slug}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                aria-label={h.name}
              >
                <span className="absolute inset-0 -m-1 rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative block w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-md group-hover:scale-125 transition" />
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap px-2 py-1 rounded-md bg-gray-900 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition pointer-events-none">
                  {h.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 space-y-1 text-xs text-gray-500">
            <p>✓ 진짜 해부학 이미지처럼 사실적</p>
            <p>✓ 혈관·장기 세부 표현</p>
            <p>× 머리/다리 없음 — 부위 절반만 표현 가능</p>
            <p>× 독일어 라벨이 이미지에 박혀있음</p>
            <p>× 저작권 문제로 실제 사용 불가 (참고용)</p>
          </div>
        </section>
      </div>

      <div className="mt-10 rounded-xl bg-amber-50 border border-amber-100 p-5 text-sm text-amber-900 leading-relaxed">
        <strong>결정 도움말:</strong> A가 지금 바로 쓸 수 있음. B 스타일 원하면{" "}
        <span className="font-semibold">저작권 깨끗한 전신 해부도</span>를 구해야 함
        — Wikimedia Commons에서 공개 라이선스 이미지를 찾거나, A의 현재 SVG를 더
        정교하게 다듬는 것도 가능. 원하는 방향 알려줘.
      </div>
    </div>
  );
}
