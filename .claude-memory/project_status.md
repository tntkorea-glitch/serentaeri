---
name: Project status
description: serentaeri 현재 진행 상태 + 다음 세션 재개 가이드 (Phase 1 완료, Phase 2 절반)
type: project
originSessionId: e2acf93c-1cbc-490f-9989-e145128a44da
---
## 현재 상태 (2026-04-23 03:00 기준)

**Production 배포:** https://serentaeri.vercel.app (Vercel)
**GitHub:** https://github.com/tntkorea-glitch/serentaeri (master 브랜치 기준 자동 배포)

### ✅ Phase 1 완료 (전체)
- Next.js 16 + TypeScript + Tailwind v4 + App Router + src-dir
- NextAuth v5 (Google OAuth + Credentials placeholder)
- Prisma 6 + Supabase Postgres (Shared Pooler)
- User role (CUSTOMER/ADMIN) + ADMIN_EMAILS 자동 승격
- 홈 페이지 (`src/app/(shop)/page.tsx`) — 히어로/카테고리/베스트셀러/면책 고지
- 공용 Header + Footer (`src/components/layout/*`)
- Admin layout + 대시보드 (`src/app/admin/*`)
- 상품 CRUD + `/products` 공개 페이지 + 상품 상세
- Supabase Storage 이미지 업로드 (드래그앤드롭 + 순서 변경 + 삭제)
- Google OAuth 리디렉션 URI: `https://serentaeri.vercel.app/api/auth/callback/google` (**사용자가 Google Console에서 등록 확인 필요**)

### ✅ Phase 2 부분 완료
- **#19 BodyPart 시드** — 23개 부위 (머리/상체/소화기/하체/피부/정서)
  - 시드 버튼: `/admin/body-parts` 에서 "기본 부위 23개 시드 (upsert)" 클릭
- **#20 SVG 인체 일러스트 + 핫스팟 컴포넌트** — `src/components/body-map/HumanSilhouette.tsx` (해부학 스타일, 심장/폐/간/위/장/뇌 반투명 오버레이)
- **#21 /body-map + /body-map/[slug]** — 인체맵 공개 페이지 + 부위별 상세
- **추가:** `/body-map-compare` — 3가지 스타일 비교 프리뷰 페이지 (**나중에 제거해야 함**)

### ❌ Phase 2 미완료
- **#22 Recipe CRUD (관리자)** — `/admin/recipes` 목록/생성/편집, ingredients(Product 연결) + bodyParts 연결 UI
- **#23 AI 레시피 초안 일괄 생성** — Anthropic API 활용, 부위별 초안 30~50개 생성 → DB 저장 (isPublished=false)
- **#24 /recipes 공개 페이지 (목록 + 상세)** — 레시피 카탈로그 + 사용 제품 카드 링크

## Next up when resuming

**1순위 — 인체맵 스타일 최종 결정**
- `/body-map-compare` 페이지에 3안 준비됨 (A: 자체 SVG / B: 독일어 상반신 참고 / C: Depositphotos 전신 참고)
- 사용자 결정 대기 중 → 정해지면 `/body-map-compare`는 삭제, 선택된 스타일만 `/body-map`에 유지
- B/C 그대로 쓰려면 저작권 라이선스 해결 필요 (권장: A 유지 또는 A를 더 정교하게 개선)

**2순위 — Recipe CRUD (#22)**
- 구조 예시: `/admin/recipes`, `/admin/recipes/new`, `/admin/recipes/[id]/edit`
- Recipe 모델에 ingredients(RecipeIngredient: Product 연결, dropCount) + bodyParts(BodyPartRecipe) 관계 UI 필요
- 기존 `/admin/products` 패턴 참고

**3순위 — AI 레시피 자동 생성 (#23)**
- `ANTHROPIC_API_KEY` 이미 .env.local + Vercel 등록 완료 (postica/yutica와 공유)
- 구현: `/admin/recipes/generate` 버튼 → `/api/admin/ai-recipe` POST → Anthropic API 호출 → 부위별 1~3개 초안 생성 → DB 저장 (isPublished=false)
- AI 프롬프트에 면책 고지 + "전통적 활용" 톤 강제 + 의학적 효능 직접 주장 금지

**4순위 — /recipes 공개 페이지 (#24)**
- 전체 레시피 목록 (필터: 부위/용법)
- 상세 페이지: 레시피 본문 + 사용 제품 카드 + 관련 부위 링크

## 중요 메모

- **인체맵 파일 3개**: `HumanSilhouette.tsx` (SVG), `BodyMap.tsx` (핫스팟 래퍼), `/body-map-compare/page.tsx` (미정리, 스타일 확정 후 삭제)
- **레퍼런스 이미지 2개**: `public/body-ref.jpg` (독일어 상반신), `public/body-ref2.jpg` (Depositphotos 전신) — 저작권 문제로 실서비스엔 미사용 예정. compare 페이지 정리 시 삭제.
- **Vercel 환경변수**: production/development 등록 완료. preview 환경은 CLI 자동 등록 실패 (브랜치 지정 프롬프트). 필요해지면 대시보드에서 수동.
- **Phase 3 (커머스: 장바구니/PG 결제/주문)** 는 사업자등록 + 통신판매업 신고 + 토스페이먼츠 가입 후 착수.
