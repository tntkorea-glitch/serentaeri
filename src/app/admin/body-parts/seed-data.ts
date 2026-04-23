import type { BodyPartCategory, BodyPartGender, BodyView } from "@prisma/client";

export type BodyPartSeed = {
  slug: string;
  name: string;
  category: BodyPartCategory;
  view: BodyView;
  hotspotX: number | null;
  hotspotY: number | null;
  description: string;
  order: number;
  gender?: BodyPartGender;
  maleNote?: string | null;
  femaleNote?: string | null;
};

// 좌표는 SVG viewBox "0 0 100 180" 기준 (x: 0~100, y: 0~180)
export const BODY_PART_SEED: BodyPartSeed[] = [
  // 머리/안면 (HEAD)
  { slug: "scalp",      name: "두피",        category: "HEAD", view: "FRONT", hotspotX: 50,  hotspotY: 8,   order: 10,  description: "두피 건강과 탈모 케어" },
  { slug: "eye",        name: "눈",          category: "HEAD", view: "FRONT", hotspotX: 50,  hotspotY: 17,  order: 20,  description: "눈의 피로, 시야 이완" },
  { slug: "ear",        name: "귀",          category: "HEAD", view: "FRONT", hotspotX: 37,  hotspotY: 21,  order: 30,  description: "귀 주변 순환" },
  { slug: "nose",       name: "코",          category: "HEAD", view: "FRONT", hotspotX: 50,  hotspotY: 22,  order: 40,  description: "코막힘, 호흡기 상쾌함" },
  { slug: "mouth",      name: "입 · 구강",   category: "HEAD", view: "FRONT", hotspotX: 50,  hotspotY: 28,  order: 50,  description: "구강 청결, 입 냄새" },
  { slug: "face-skin",  name: "얼굴 피부",   category: "SKIN", view: "FRONT", hotspotX: 50,  hotspotY: 13,  order: 60,  description: "트러블, 수분, 탄력 케어" },

  // 상체 (UPPER)
  { slug: "neck",       name: "목",          category: "UPPER", view: "FRONT", hotspotX: 50, hotspotY: 34,  order: 100, description: "목 뻐근함, 긴장 완화" },
  { slug: "shoulder",   name: "어깨",        category: "UPPER", view: "FRONT", hotspotX: 33, hotspotY: 42,  order: 110, description: "어깨 뭉침, 근육 이완" },
  { slug: "lung",       name: "폐 · 호흡기", category: "UPPER", view: "FRONT", hotspotX: 50, hotspotY: 52,  order: 120, description: "호흡 깊이, 기침 완화" },
  { slug: "heart",      name: "심장",        category: "UPPER", view: "FRONT", hotspotX: 42, hotspotY: 56,  order: 130, description: "심박 안정, 순환" },
  { slug: "arm",        name: "팔",          category: "UPPER", view: "FRONT", hotspotX: 24, hotspotY: 62,  order: 140, description: "팔 근육, 손목 피로" },

  // 소화기 (DIGESTIVE)
  { slug: "stomach",    name: "위 · 명치",   category: "DIGESTIVE", view: "FRONT", hotspotX: 50, hotspotY: 72, order: 200, description: "소화, 속 쓰림, 더부룩함" },
  { slug: "liver",      name: "간",          category: "DIGESTIVE", view: "FRONT", hotspotX: 58, hotspotY: 70, order: 210, description: "간 기능 지지, 피로" },
  { slug: "intestine",  name: "장 · 복부",   category: "DIGESTIVE", view: "FRONT", hotspotX: 50, hotspotY: 82, order: 220, description: "장 움직임, 가스, 변비" },

  // 하체 (LOWER)
  { slug: "lower-back", name: "허리",        category: "LOWER", view: "FRONT", hotspotX: 50, hotspotY: 90,  order: 300, description: "허리 통증, 피로" },
  { slug: "knee",       name: "무릎",        category: "LOWER", view: "FRONT", hotspotX: 41, hotspotY: 128, order: 310, description: "무릎 관절, 쑤심" },
  { slug: "foot",       name: "발",          category: "LOWER", view: "FRONT", hotspotX: 42, hotspotY: 172, order: 320, description: "발 피로, 부종, 발냄새" },

  // 피부 (SKIN) — 위치 없는 것 (전신)
  { slug: "body-skin",  name: "전신 피부",   category: "SKIN", view: "FRONT", hotspotX: null, hotspotY: null, order: 400, description: "건조, 가려움, 탄력" },
  { slug: "hand-skin",  name: "손 피부",     category: "SKIN", view: "FRONT", hotspotX: 20,   hotspotY: 78,   order: 410, description: "손 건조, 주름" },

  // 정서/수면 (EMOTION) — 위치 없음
  { slug: "sleep",      name: "수면",        category: "EMOTION", view: "FRONT", hotspotX: null, hotspotY: null, order: 500, description: "잠들기, 숙면, 깊은 휴식" },
  { slug: "stress",     name: "스트레스",    category: "EMOTION", view: "FRONT", hotspotX: null, hotspotY: null, order: 510, description: "긴장 완화, 안정" },
  { slug: "focus",      name: "집중 · 각성", category: "EMOTION", view: "FRONT", hotspotX: null, hotspotY: null, order: 520, description: "학습, 업무 집중" },
  { slug: "mood",       name: "기분 전환",   category: "EMOTION", view: "FRONT", hotspotX: null, hotspotY: null, order: 530, description: "우울감, 무기력 환기" },
];
