---
name: Project status
description: serentaeri 현재 진행 상태 + 다음 세션 재개 가이드 (2026-04-23 기준)
type: project
originSessionId: e2acf93c-1cbc-490f-9989-e145128a44da
---
## 현재 상태 (2026-04-23 14:50 기준)

**Production:** https://serentaeri.vercel.app
**GitHub:** https://github.com/tntkorea-glitch/serentaeri (master 자동 배포)

### ✅ Phase 1 완료
- Next.js 16 + TS + Tailwind v4 + App Router + src-dir
- NextAuth v5 (Google OAuth + Credentials)
- Prisma 6 + Supabase Postgres
- 홈 / 공용 헤더 · 푸터 / Admin 대시보드
- 상품 CRUD + `/products` + 상세
- Supabase Storage 이미지 업로드

### ✅ Phase 2 대폭 진전 (오늘 세션)
- **#19 BodyPart 시드** — 21개 부위(추가 여/남 전용 3개 포함: 생리·PMS, 갱년기, 전립선·요로)
- **#20 인체맵 이미지** — **사용자 제공 포토리얼 남/여 페어**(`public/body-male.png`, `body-female.png`, 941×1672). 동일 포즈·톤·비율 완벽 매칭. 이전 Wikimedia SVG 네 개는 삭제 정리.
- **#21 /body-map + /body-map/[slug]** — 공개 페이지 완성, 성별 토글, 성별별 노트 카드(pink/sky), 부위 뱃지
- **성별 상태 URL 고정** — `?gender=male/female` 쿼리로 페이지 이동 시 토글 유지, 북마크/공유 가능
- **DB 스키마 확장** — `BodyPart.gender` (BOTH/FEMALE/MALE), `maleNote`, `femaleNote` 필드 + 마이그레이션 `20260423014212_add_bodypart_gender_fields`
- **좌표 체계 단일화** — 구 0~180 Y 체계 폐기, X/Y 둘 다 0~100 퍼센트. 18개 부위 전부 새 이미지에 맞게 재튜닝
- **관리자 UI 대폭 개선** (`/admin/body-parts`)
  - 접이식 편집 폼: 이름/슬러그/카테고리/성별/뷰/핫스팟 X·Y/설명/여성 노트/남성 노트 전체 편집
  - 새 부위 추가 폼 (상단 접이식) — 성별 선택 포함
  - 레시피 연결 0개 부위만 삭제 가능
  - 서버 액션 3종: `createBodyPartAction`, `updateBodyPartAction`, `deleteBodyPartAction` + 기존 `seedBodyPartsAction`

### ❌ Phase 2 남은 부분
- **#22 Recipe CRUD (관리자)** — `/admin/recipes` 목록/생성/편집, ingredients(Product 연결) + bodyParts 연결 UI
- **#23 AI 레시피 초안 일괄 생성** — Anthropic API, 부위별 30~50개 초안 → DB 저장 (isPublished=false)
- **#24 /recipes 공개 페이지** — 카탈로그 + 상세

## Next up when resuming

**1순위 — 핫스팟 좌표 미세조정 (필요 시)**
- 현재 DB 값은 1차 튜닝 상태. 사용자가 보고 어색한 부위만 `/admin/body-parts` 에서 개별 수정
- 클릭-투-플레이스 UI 추가 옵션 (사용자 요청 시): `/admin/body-parts/[id]/place-hotspot` 형태로 인체맵 위에 클릭 시 X/Y 자동 기입

**2순위 — Recipe CRUD (#22)**
- `/admin/recipes`, `/admin/recipes/new`, `/admin/recipes/[id]/edit`
- Recipe 모델 ingredients(RecipeIngredient: Product 연결, dropCount) + bodyParts(BodyPartRecipe) 관계 UI
- 참고 패턴: `/admin/products` + 방금 만든 `/admin/body-parts` 편집 폼 구조

**3순위 — AI 레시피 자동 생성 (#23)**
- `ANTHROPIC_API_KEY` 준비 완료 (.env.local + Vercel)
- `/admin/recipes/generate` 버튼 → `/api/admin/ai-recipe` POST → Anthropic API → 부위별 초안 → DB 저장
- 프롬프트에 면책 고지 + "전통적 활용" 톤 + 의학적 효능 주장 금지

**4순위 — /recipes 공개 페이지 (#24)**

## 중요 메모
- **Phase 3 (커머스: 장바구니/PG/주문)** 는 사업자등록 + 통신판매업 신고 + 토스페이먼츠 가입 후 착수
- **body-ref.jpg / body-ref2.jpg** — 더 이상 사용 안 함. 정리 시점에 삭제 가능
- **BodyMap.tsx / HumanSilhouette.tsx** — 구 cartoon SVG 컴포넌트. `BodyMapWiki` + `BodyMapSection` 이 현재 경로. BodyMap.tsx 파일은 레거시로 남아있으나 import 없음 → 다음 세션 정리 가능
- **BodyMapWiki.tsx 파일명은 "Wiki" 지만 실제 이미지는 사용자 제공 PNG** (이름 의미 없어짐, 다음 리팩터 시 BodyMap.tsx 로 되돌리는 것 고려)
