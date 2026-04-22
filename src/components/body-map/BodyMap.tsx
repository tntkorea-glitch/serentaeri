import Link from "next/link";
import type { BodyPart } from "@prisma/client";
import HumanSilhouette from "./HumanSilhouette";

type Props = {
  parts: BodyPart[];
  activeSlug?: string;
};

export default function BodyMap({ parts, activeSlug }: Props) {
  const mapped = parts.filter(
    (p) => p.hotspotX !== null && p.hotspotY !== null
  );

  return (
    <div
      className="relative w-full max-w-xs mx-auto"
      style={{ aspectRatio: "100 / 180" }}
    >
      <HumanSilhouette className="absolute inset-0 w-full h-full" />

      {mapped.map((p) => {
        const isActive = p.slug === activeSlug;
        return (
          <Link
            key={p.id}
            href={`/body-map/${p.slug}`}
            className="group absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${p.hotspotX}%`,
              top: `${((p.hotspotY ?? 0) / 180) * 100}%`,
            }}
            aria-label={p.name}
          >
            {/* Pulse ring */}
            <span
              className={`absolute inset-0 -m-1 rounded-full opacity-60 animate-ping ${
                isActive ? "bg-amber-400" : "bg-emerald-400"
              }`}
            />
            {/* Dot */}
            <span
              className={`relative block w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-125 ${
                isActive ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
            {/* Tooltip */}
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap px-2 py-1 rounded-md bg-gray-900 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition pointer-events-none">
              {p.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
