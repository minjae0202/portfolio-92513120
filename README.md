# 개인 포트폴리오 홈페이지

웹서버보안프로그래밍 중간 과제: **Next.js 16 + MongoDB + Auth.js**로 만든 개인 포트폴리오입니다.

- 강의 실습 프로젝트 저장소: https://github.com/minjae0202/wss-2026-2
- 강의 실습 프로젝트 배포: https://wss-2026-2.vercel.app/
- 이 포트폴리오 배포: `https://<배포 후 입력>.vercel.app`

## 기능

| 경로 | 내용 | 강의 연결 |
|---|---|---|
| `/` | 소개, **강의 실습 프로젝트(저장소·배포 링크)**, 대표 프로젝트, 기술 스택 | 3주차 App Router, Server Component |
| `/about` | 자기소개, 이력, 기술 스택 | |
| `/projects`, `/projects/[id]` | 프로젝트 목록/상세, 조회수 | 4주차 동적 라우팅, `loading.tsx`, `await params` |
| `/guestbook` | 로그인 사용자 방명록, 본인 글만 삭제 | 5주차 `form action` + `SubmitButton` |
| `/login`, `/register` | 회원가입·로그인·로그아웃 | 7주차 Auth.js Credentials + bcrypt |
| `/admin` | 프로젝트 CRUD, 프로필 수정 (`ADMIN_EMAIL`만 접근) | 9주차 예고: 인가 |
| `/api/projects` | 프로젝트 목록 JSON | 4주차 Route Handler |

모든 데이터(프로필, 프로젝트, 방명록, 회원)는 MongoDB에 저장됩니다. DB가 비어 있으면 첫 접속 때 `lib/seed-data.ts`의 초기 데이터가 자동으로 들어갑니다(6주차 `seedIfEmpty` 패턴).

## 구조

```
app/                 페이지 (화면)
lib/
  mongodb.ts         연결 캐싱 (globalThis)
  projects.ts        getProjects / getProject / createProject ...  ← 화면은 이 함수만 호출
  profile.ts         getProfile / updateProfile
  guestbook.ts       getEntries / createEntry / deleteEntry
  users.ts           createUser (bcrypt 해싱)
  actions.ts         Server Actions (폼 처리 + 권한 검사)
  authz.ts           isAdmin / requireAdmin
  seed-data.ts       초기 데이터 ← 여기서 이름 등 수정
models/              Mongoose 스키마 (User, Project, Profile, GuestbookEntry)
auth.ts              Auth.js 설정
```

## 보안 포인트

- 접속 문자열과 시크릿은 `.env.local`에만 저장하고 커밋하지 않습니다(`.gitignore`의 `.env*`).
- 비밀번호는 `bcrypt.hash(pw, 10)`로 해시만 저장합니다.
- 로그인 실패 시 "이메일 없음"과 "비밀번호 틀림"을 구분하지 않습니다(계정 열거 방지).
- 관리자 기능은 화면뿐 아니라 **Server Action 안에서도** `requireAdmin()`으로 다시 검사합니다.
- 방명록 삭제는 `{ _id, userId }` 조건으로 쿼리해서 남의 글을 지울 수 없습니다.
- 프로젝트 링크는 `http(s)` URL만 저장합니다(`javascript:` 링크 XSS 방지).
- `error.tsx`는 내부 에러 내용을 노출하지 않고 일반 문구만 보여줍니다.

## 로컬 실행

```bash
npm install
cp .env.local.example .env.local   # 값 채우기
npx auth secret                    # AUTH_SECRET 자동 추가
npm run dev
```

1. http://localhost:3000 접속 → 프로필·프로젝트가 자동 시드됨
2. `/register`에서 **`ADMIN_EMAIL`과 같은 이메일**로 가입 → 헤더에 `Admin` 메뉴 표시
3. `/admin/profile`에서 이름·소개 수정

## 배포 (Vercel)

1. GitHub에 push (`git status`로 `.env.local`이 목록에 없는지 먼저 확인)
2. Vercel → Add New Project → 저장소 Import
3. Settings → Environment Variables에 **3개** 등록: `MONGODB_URI`, `AUTH_SECRET`, `ADMIN_EMAIL`
4. Redeploy → 배포 주소에서 관리자 계정 가입 → `/admin`에서 "개인 포트폴리오 홈페이지" 프로젝트의 저장소/배포 주소 입력
