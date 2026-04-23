import Link from "next/link";
import Image from "next/image";
import type { BodyPart } from "@prisma/client";

type Gender = "female" | "male";

type Props = {
  parts: BodyPart[];
  activeSlug?: string;
  gender: Gender;
};

// Wikimedia CC0 female template (1454 x 2320) 기준 핫스팟 좌표 (%)
const FEMALE_OVERRIDES: Record<string, { x: number; y: number }> = {
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

// Wikimedia 202403 male/neutral full-body (600 x 1000) 기준 핫스팟 좌표 (%)
// 초기 추정치. 추후 정교하게 조정 예정.
const MALE_OVERRIDES: Record<string, { x: number; y: number }> = {
  scalp:      { x: 50, y: 4 },
  eye:        { x: 50, y: 7 },
  ear:        { x: 43, y: 8 },
  nose:       { x: 50, y: 9 },
  mouth:      { x: 50, y: 11 },
  "face-skin": { x: 50, y: 7 },
  neck:       { x: 50, y: 15 },
  shoulder:   { x: 33, y: 20 },
  lung:       { x: 42, y: 26 },
  heart:      { x: 54, y: 27 },
  arm:        { x: 25, y: 33 },
  stomach:    { x: 55, y: 38 },
  liver:      { x: 42, y: 36 },
  intestine:  { x: 50, y: 44 },
  "lower-back": { x: 50, y: 49 },
  "hand-skin": { x: 22, y: 46 },
  knee:       { x: 45, y: 75 },
  foot:       { x: 47, y: 97 },
};

const GENDER_CONFIG: Record<
  Gender,
  { src: string; aspectRatio: string; overrides: Record<string, { x: number; y: number }> }
> = {
  female: {
    src: "/body-wikimedia-female.svg",
    aspectRatio: "1454 / 2320",
    overrides: FEMALE_OVERRIDES,
  },
  male: {
    src: "/body-wikimedia-male.svg",
    aspectRatio: "600 / 1000",
    overrides: MALE_OVERRIDES,
  },
};

export default function BodyMapWiki({ parts, activeSlug, gender }: Props) {
  const config = GENDER_CONFIG[gender];
  const mapped = parts.filter(
    (p) => p.hotspotX !== null && p.hotspotY !== null
  );

  return (
    <div
      className="relative mx-auto w-full max-w-[360px]"
      style={{ aspectRatio: config.aspectRatio }}
    >
      <Image
        src={config.src}
        alt="인체맵"
        fill
        className="object-contain select-none pointer-events-none"
        unoptimized
        priority
      />

      {mapped.map((p) => {
        const override = config.overrides[p.slug];
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
