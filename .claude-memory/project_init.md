---
name: Project init
description: serentaeri 프로젝트 초기 셋업 정보 — 포트, 스택, GitHub 레포
type: project
originSessionId: e2acf93c-1cbc-490f-9989-e145128a44da
---
- 프로젝트명: serentaeri
- 생성일: 2026-04-23
- 로컬 경로: D:\dev\serentaeri
- GitHub 레포: https://github.com/tntkorea-glitch/serentaeri (public)
- 스택: Next.js 16 + TypeScript + Tailwind CSS v4 + App Router + src-dir
- **개발 포트: 3010 고정** (package.json dev/start 스크립트에 -p 3010)
- 배포: Vercel (vercel.json 기본 빌드 설정)
- 인앱 브라우저 가드: public/inapp-guard.js + layout.tsx에 Script 삽입 완료
- 자동화: .claude/settings.json 에 SessionStart(git pull) + Stop(auto commit) 훅 설정
- 시크릿 보호: setup.sh + .git/hooks/pre-commit (gitleaks)
- 로그인: NextAuth v5 (beta) 기반 — Credentials + Google + 카카오/네이버(준비중 UI)
  - `src/lib/auth.ts` — NextAuth 설정 (JWT 세션, Google + Credentials provider)
  - `src/app/api/auth/[...nextauth]/route.ts` — handlers re-export (v5 패턴)
  - `src/components/providers/SessionProvider.tsx` — layout에서 children 래핑
  - `src/app/login/page.tsx` — 로그인 UI (이메일/비번 + 소셜 3버튼)
  - `src/components/auth/AuthGuard.tsx` — 인증 필요 페이지용 가드
  - 환경변수: AUTH_SECRET(랜덤 자동생성), AUTH_GOOGLE_ID(빈값), AUTH_GOOGLE_SECRET(빈값)
  - Google OAuth 리디렉션 URI: http://localhost:3010/api/auth/callback/google + 배포도메인

**Why:** 여러 프로젝트를 동시에 개발/테스트할 때 포트 충돌 방지 + 시크릿 유출 방지 + PC 간 동기화 자동화를 위해 /new 스킬 표준 구조를 그대로 따랐다.

**How to apply:** dev 서버는 항상 3010 포트로 실행. OAuth 콜백 URI 등록 시 반드시 3010 사용. 다른 프로젝트 병렬 실행 시 겹치지 않음을 이 메모리로 확인.
