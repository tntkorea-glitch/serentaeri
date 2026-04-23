import Link from "next/link";
import Image from "next/image";
import type { BodyPart } from "@prisma/client";

type Props = {
  parts: BodyPart[];
  activeSlug?: string;
};

// Wikimedia CC0 신체 템플릿 (1454 x 2320) 기준 핫스팟 좌표 (%)
// 성별 구분 없이 "중성적 인체도"로 사용. 부위별 성차는 slug 페이지에서 표기.
const HOTSPOT_OVERRIDES: Record<string, { x: number; y: number }> = {
  scalp:      { x: 38, y: 5 },
  eye:        { x: 38, y: 9 },
  ear:        { x: 33, y: 10 },
  nose:       { x: 38, y: 11 },
  mouth:      { x: 38, y: 13 },
  "face-skin": { x: 38, y: 8 },
  neck:       { x: 38, y: 16 },
  shoulder:   { x: 27, y: 21 },
  lung:       { x: 33, y: 27 },
  heart:      { x: 41, y: 29 },
  arm:        { x: 20, y: 33 },
  stomach:    { x: 42, y: 37 },
  liver:      { x: 33, y: 37 },
  intestine:  { x: 38, y: 46 },
  "lower-back": { x: 38, y: 54 },
  "hand-skin": { x: 15, y: 47 },
  knee:       { x: 35, y: 77 },
  foot:       { x: 38, y: 96 },
};

export default function BodyMapWiki({ parts, activeSlug }: Props) {
  const mapped = parts.filter(
    (p) => p.hotspotX !== null && p.hotspotY !== null
  );

  return (
    <div
      className="relative mx-auto w-full max-w-[360px]"
      style={{ aspectRatio: "1454 / 2320" }}
    >
      <Image
        src="/body-wikimedia-female.svg"
        alt="인체맵"
        fill
        className="object-contain select-none pointer-events-none"
        unoptimized
        priority
      />

      {mapped.map((p) => {
        const override = HOTSPOT_OVERRIDES[p.slug];
        const x = override ? override.x : (p.hotspotX ?? 50);
        const y = override
          ? override.y
          : ((p.hotspotY ?? 0) / 180) * 100;
        const isActive = p.slug === activeSlug;
        return (
          <Link
            key={p.id}
            href={`/body-map/${p.slug}`}
            className="group absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-label={p.name}
          >
            <span
              className={`absolute inset-0 -m-1 rounded-full opacity-60 animate-ping ${
                isActive ? "bg-amber-400" : "bg-emerald-400"
              }`}
            />
            <span
              className={`relative block w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-125 ${
                isActive ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap px-2 py-1 rounded-md bg-gray-900 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition pointer-events-none">
              {p.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
