import Link from "next/link";
import Image from "next/image";
import type { BodyPart } from "@prisma/client";

type Gender = "female" | "male";

type Props = {
  parts: BodyPart[];
  activeSlug?: string;
  gender: Gender;
};

// 좌표는 DB(BodyPart.hotspotX / hotspotY) 퍼센트값(0~100)을 단일 소스로 사용.
// 남/여 이미지는 동일 포즈·크기·톤이라 좌표 한 세트로 공용.
// 부위별 성차는 BodyPart.gender(BOTH/FEMALE/MALE) 필터로 분리.
export default function BodyMapWiki({ parts, activeSlug, gender }: Props) {
  const mapped = parts
    .filter((p) => p.hotspotX !== null && p.hotspotY !== null)
    .filter((p) => {
      if (p.gender === "BOTH") return true;
      if (p.gender === "FEMALE") return gender === "female";
      if (p.gender === "MALE") return gender === "male";
      return true;
    });

  const src = gender === "male" ? "/body-male.png" : "/body-female.png";

  return (
    <div
      className="relative mx-auto w-full max-w-[360px]"
      style={{ aspectRatio: "941 / 1672" }}
    >
      <Image
        src={src}
        alt="인체맵"
        fill
        className="object-contain select-none pointer-events-none"
        unoptimized
        priority
      />

      {mapped.map((p) => {
        const x = p.hotspotX ?? 50;
        const y = p.hotspotY ?? 50;
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
