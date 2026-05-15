---
name: Project status
description: serentaeri 현재 진행 상태 + 다음 세션 재개 가이드 (2026-05-16 기준)
type: project
originSessionId: e2acf93c-1cbc-490f-9989-e145128a44da
---
## 현재 상태 (2026-05-16 — 계정 이관 완료)

### ✅ 이관 완료
| 항목 | 값 |
|------|-----|
| Supabase | vvzhecgaszxdfsdmxcko (a01047235659-maker's Org FREE) |
| Vercel | a01047235659 계정 (Hobby) |
| 사이트 URL | https://serentaeri-theta.vercel.app |
| GitHub (push) | tntkorea-glitch/serentaeri (로컬 remote) |
| GitHub (Vercel 연결) | a01047235659-maker/serentaeri (Vercel clone 레포) |

**배포 방식:** GitHub 자동 배포 없음 → `/bye` 또는 `vercel --prod`로 수동 배포
**Why:** Vercel Clone 방식으로 생성해서 GitHub 계정 변경 불가. 기존 `/bye` 배포 패턴과 동일해서 문제없음.

### 정리된 환경변수 (.env / .env.local)
- DATABASE_URL / DIRECT_URL → 새 Supabase (vvzhecgaszxdfsdmxcko)
- NEXT_PUBLIC_SUPABASE_URL → https://vvzhecgaszxdfsdmxcko.supabase.co
- SUPABASE_SERVICE_ROLE_KEY → 새 service_role key
- Google OAuth 콜백 URI → serentaeri-theta.vercel.app 추가 완료

---

**Production:** https://serentaeri-theta.vercel.app
**GitHub:** https://github.com/tntkorea-glitch/serentaeri

### ✅ Phase 1 완료
- Next.js 16 + TS + Tailwind v4 + App Router + src-dir
- NextAuth v5 (Google OAuth + Credentials)
- Prisma 6 + Supabase Postgres
- 홈 / 공용 헤더 · 푸터 / Admin 대시보드
- 상품 CRUD + `/products` + 상세
- Supabase Storage 이미지 업로드

### ✅ Phase 2 대폭 진전
- BodyPart 시드 (21개 부위, 성별 분기 포함)
- 인체맵 이미지 (사용자 제공 포토리얼 남/여 PNG)
- /body-map + /body-map/[slug] 공개 페이지 (성별 토글, URL 쿼리 고정)
- DB 스키마 확장 (BodyPart.gender / maleNote / femaleNote)
- 관리자 UI (/admin/body-parts) 접이식 편집 폼

### ❌ Phase 2 남은 부분
- #22 Recipe CRUD (관리자) — /admin/recipes
- #23 AI 레시피 초안 일괄 생성 (Anthropic API)
- #24 /recipes 공개 페이지

## 중요 메모
- **Phase 3 (커머스)** 는 사업자등록 + 통신판매업 신고 + 토스페이먼츠 가입 후 착수
- 개발 포트: 3010
