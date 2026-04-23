"use client";

import { useState } from "react";
import type { BodyPart } from "@prisma/client";
import BodyMapWiki from "./BodyMapWiki";

type Gender = "female" | "male";

export default function BodyMapSection({
  parts,
  initialGender = "female",
}: {
  parts: BodyPart[];
  initialGender?: Gender;
}) {
  const [gender, setGender] = useState<Gender>(initialGender);

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setGender("female")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              gender === "female"
                ? "bg-emerald-600 text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
            aria-pressed={gender === "female"}
          >
            여성
          </button>
          <button
            type="button"
            onClick={() => setGender("male")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              gender === "male"
                ? "bg-emerald-600 text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
            aria-pressed={gender === "male"}
          >
            남성
          </button>
        </div>
      </div>

      <BodyMapWiki parts={parts} gender={gender} />
    </div>
  );
}
