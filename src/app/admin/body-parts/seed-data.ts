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

// 좌표는 Wikimedia 여성 템플릿(1454x2320) 기준 X/Y 둘 다 0~100 퍼센트.
// /admin/body-parts 에서 수정할 수 있으며, 이 시드는 복구/초기화용.
export const BODY_PART_SEED: BodyPartSeed[] = [
  // 머리/안면 (HEAD)
  { slug: "scalp",      name: "두피",        category: "HEAD", view: "FRONT", hotspotX: 38, hotspotY: 5,  order: 10,  description: "두피 건강과 탈모 케어" },
  { slug: "eye",        name: "눈",          category: "HEAD", view: "FRONT", hotspotX: 38, hotspotY: 9,  order: 20,  description: "눈의 피로, 시야 이완" },
  { slug: "ear",        name: "귀",          category: "HEAD", view: "FRONT", hotspotX: 33, hotspotY: 10, order: 30,  description: "귀 주변 순환" },
  { slug: "nose",       name: "코",          category: "HEAD", view: "FRONT", hotspotX: 38, hotspotY: 11, order: 40,  description: "코막힘, 호흡기 상쾌함" },
  { slug: "mouth",      name: "입 · 구강",   category: "HEAD", view: "FRONT", hotspotX: 38, hotspotY: 13, order: 50,  description: "구강 청결, 입 냄새" },
  { slug: "face-skin",  name: "얼굴 피부",   category: "SKIN", view: "FRONT", hotspotX: 38, hotspotY: 8,  order: 60,  description: "트러블, 수분, 탄력 케어" },

  // 상체 (UPPER)
  { slug: "neck",       name: "목",          category: "UPPER", view: "FRONT", hotspotX: 38, hotspotY: 16, order: 100, description: "목 뻐근함, 긴장 완화" },
  { slug: "shoulder",   name: "어깨",        category: "UPPER", view: "FRONT", hotspotX: 27, hotspotY: 21, order: 110, description: "어깨 뭉침, 근육 이완" },
  { slug: "lung",       name: "폐 · 호흡기", category: "UPPER", view: "FRONT", hotspotX: 33, hotspotY: 27, order: 120, description: "호흡 깊이, 기침 완화" },
  { slug: "heart",      name: "심장",        category: "UPPER", view: "FRONT", hotspotX: 41, hotspotY: 29, order: 130, description: "심박 안정, 순환" },
  { slug: "arm",        name: "팔",          category: "UPPER", view: "FRONT", hotspotX: 20, hotspotY: 33, order: 140, description: "팔 근육, 손목 피로" },

  // 소화기 (DIGESTIVE)
  { slug: "stomach",    name: "위 · 명치",   category: "DIGESTIVE", view: "FRONT", hotspotX: 42, hotspotY: 37, order: 200, description: "소화, 속 쓰림, 더부룩함" },
  { slug: "liver",      name: "간",          category: "DIGESTIVE", view: "FRONT", hotspotX: 33, hotspotY: 37, order: 210, description: "간 기능 지지, 피로" },
  { slug: "intestine",  name: "장 · 복부",   category: "DIGESTIVE", view: "FRONT", hotspotX: 38, hotspotY: 46, order: 220, description: "장 움직임, 가스, 변비" },

  // 하체 (LOWER)
  { slug: "lower-back", name: "허리",        category: "LOWER", view: "FRONT", hotspotX: 38, hotspotY: 54, order: 300, description: "허리 통증, 피로",
    femaleNote: "여성은 생리 기간·PMS 중 하복부와 연결된 허리 불편이 함께 오는 경우가 많아, 따뜻한 마사지 오일과 온찜질을 병행합니다.",
    maleNote: "남성은 장시간 앉은 자세·운동 후 하부 척추 긴장이 주 원인이며, 롤온·국소도포로 집중 완화합니다." },
  { slug: "knee",       name: "무릎",        category: "LOWER", view: "FRONT", hotspotX: 35, hotspotY: 77, order: 310, description: "무릎 관절, 쑤심" },
  { slug: "foot",       name: "발",          category: "LOWER", view: "FRONT", hotspotX: 38, hotspotY: 96, order: 320, description: "발 피로, 부종, 발냄새" },

  // 여성/남성 전용 (예시)
  { slug: "menstrual",  name: "생리·PMS",    category: "LOWER", view: "FRONT", hotspotX: null, hotspotY: null, order: 330, description: "주기 관련 하복부 긴장, 기분 기복", gender: "FEMALE" },
  { slug: "menopause",  name: "갱년기",      category: "EMOTION", view: "FRONT", hotspotX: null, hotspotY: null, order: 340, description: "열오름·수면·기분 변화 케어", gender: "FEMALE" },
  { slug: "prostate",   name: "전립선·요로", category: "LOWER", view: "FRONT", hotspotX: null, hotspotY: null, order: 350, description: "하복부 불편, 빈뇨 등 일반 케어", gender: "MALE" },

  // 피부 (SKIN) — 위치 없는 것 (전신)
  { slug: "body-skin",  name: "전신 피부",   category: "SKIN", view: "FRONT", hotspotX: null, hotspotY: null, order: 400, description: "건조, 가려움, 탄력" },
  { slug: "hand-skin",  name: "손 피부",     category: "SKIN", view: "FRONT", hotspotX: 15,   hotspotY: 47,   order: 410, description: "손 건조, 주름" },

  // 정서/수면 (EMOTION) — 위치 없음
  { slug: "sleep",      name: "수면",        category: "EMOTION", view: "FRONT", hotspotX: null, hotspotY: null, order: 500, description: "잠들기, 숙면, 깊은 휴식" },
  { slug: "stress",     name: "스트레스",    category: "EMOTION", view: "FRONT", hotspotX: null, hotspotY: null, order: 510, description: "긴장 완화, 안정" },
  { slug: "focus",      name: "집중 · 각성", category: "EMOTION", view: "FRONT", hotspotX: null, hotspotY: null, order: 520, description: "학습, 업무 집중" },
  { slug: "mood",       name: "기분 전환",   category: "EMOTION", view: "FRONT", hotspotX: null, hotspotY: null, order: 530, description: "우울감, 무기력 환기" },
];
