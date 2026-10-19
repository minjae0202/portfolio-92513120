// DB가 비어 있을 때 처음 한 번만 들어가는 초기 데이터입니다.
// 이후 수정은 /admin 페이지에서 하면 DB에 바로 반영됩니다.
// (이미 시드된 뒤에 이 파일을 고쳐도 DB 내용은 바뀌지 않습니다.)

// 화이트햇 스쿨 4기 — scripts/add-whitehat.mjs 가 이미 시드된 DB에도 같은 내용을 반영
export const WHITEHAT_BIO =
  "화이트햇 스쿨 4기(2026.06 ~ 2026.12)에서 보안 실무 교육을 받고 있습니다. 팀 프로젝트로 AI를 활용한 웹서비스를 직접 개발·배포하고, 상대 팀과 서로의 서비스를 모의해킹한 뒤 발견된 취약점을 패치·재검증했습니다.";

export const WHITEHAT_SKILLS = {
  category: "Security",
  items: ["웹 모의해킹", "취약점 분석·패치", "세션 관리", "Rate Limiting", "Kali Linux"],
};

export const WHITEHAT_TIMELINE = {
  period: "2026.06 ~ 2026.12",
  title: "화이트햇 스쿨 4기",
  detail: "팀 프로젝트(TEAM 200): AI 활용 웹서비스 개발 및 상호 보안 검증",
};

export const whitehatProject = {
  _id: "0000000000000000000000a3",
  title: "AI 활용 웹서비스 개발 및 상호 보안 검증",
  summary:
    "화이트햇 스쿨 4기 팀 프로젝트 — 가상 금융 체험 서비스 SeedTheMoa를 개발·배포하고, 상대 팀과 서로의 서비스를 모의해킹·패치",
  description: [
    "화이트햇 스쿨 4기 TEAM 200에서 두 팀이 각자 AI를 활용해 웹서비스를 개발·배포한 뒤, 서로의 서비스를 모의해킹하고 발견된 취약점을 패치·재검증한 프로젝트입니다.",
    "우리 팀(Team B, 4인)은 가상의 금융 환경에서 저축과 자산 관리를 체험하는 SeedTheMoa를 만들었습니다. 초기 자산·저축 목표 설정, 예·적금 가입과 주식·ETF 매매, 대시보드 자산 확인, 미래 자산 시뮬레이션 기능을 제공합니다.",
    "보안 검증 단계에서는 점검 범위와 규칙을 정하고 정찰·공격 표면 분석을 거쳐 상대 팀의 생활체육 매칭 서비스 YANAWA에서 High 2건, Medium 3건의 취약점을 찾았습니다. 우리 서비스에서 발견된 2건(High 1, Low 1)은 직접 패치하고 재검증했습니다.",
    "AI 활용과 직접 구현의 비중에 따라 발견된 취약점 수가 달랐고, 점검자 숙련도의 한계로 발견된 취약점이 전부는 아니라는 점을 확인했습니다. 앞으로 자동화 보안 점검 도구와 소스코드 분석 역량을 더 키우려 합니다.",
  ].join("\n\n"),
  period: "2026.08 ~ 2026.10",
  techStack: ["AI 활용 개발", "Docker", "AWS", "Kali Linux", "Rate Limit", "CAPTCHA"],
  highlights: [
    "개발 · PRD·ERD 설계 → 프론트엔드·백엔드 API 구현 → Docker·AWS 배포",
    "발견 [High] 로그아웃 후 기존 세션 재사용 (YANAWA)",
    "발견 [High] 비밀번호 변경 후 기존 세션 재사용 (YANAWA)",
    "발견 [Medium] 로그인 API 브루트포스 방어 부재 (YANAWA)",
    "발견 [Medium] 승인 참가자 목록 조회 인가 누락 (YANAWA)",
    "발견 [Medium] 완료된 모임 일정 수정으로 참가 방해 (YANAWA)",
    "패치 [High] 로그인 응답 시간 차이·계정 잠금 악용 → 비존재 계정도 Dummy Hash 검증, 하드 잠금 제거, IP당 분당 10회 제한",
    "패치 [Low] 계정 대량 생성 → 회원가입 Rate Limit(분 5회·일 10회) + CAPTCHA, 재검증에서 429·400 차단 확인",
  ],
  repoUrl: "",
  deployUrl: "",
  category: "whitehat",
  featured: true,
  order: 2,
};

// _id를 고정해 두면 동시에 여러 요청이 시드해도 중복 문서가 생기지 않음
export const seedProfile = {
  _id: "000000000000000000000001",
  name: "김민재",
  role: "정보보호학과 · 화이트햇 스쿨 4기",
  intro: "",
  bio: [
    "중부대학교 정보보호학과에서 웹서버보안프로그래밍을 수강하며 Next.js, MongoDB, Auth.js 기반의 풀스택 웹 개발을 배우고 있습니다.",
    "기능을 만드는 것에 그치지 않고, 시크릿 관리·비밀번호 해싱·에러 노출 방지처럼 코드 레벨에서 보안을 챙기는 습관을 기르고 있습니다.",
    WHITEHAT_BIO,
  ].join("\n\n"),
  email: "",
  github: "https://github.com/minjae0202",
  skills: [
    { category: "Frontend", items: ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS v4"] },
    { category: "Backend", items: ["Server Actions", "Route Handlers", "Auth.js v5", "bcrypt"] },
    { category: "Database", items: ["MongoDB Atlas", "Mongoose"] },
    { category: "DevOps · Tools", items: ["Git / GitHub", "Vercel", "VS Code"] },
    WHITEHAT_SKILLS,
  ],
  timeline: [
    { period: "2026.03 ~ 2026.06", title: "웹프로그래밍 수강", detail: "프론트엔드 개발" },
    WHITEHAT_TIMELINE,
    { period: "2026.09 ~", title: "웹서버보안프로그래밍 수강", detail: "Next.js + MongoDB 풀스택 실습, 주차별 과제 제출" },
    { period: "2026.10", title: "개인 포트폴리오 홈페이지 제작", detail: "Next.js + MongoDB + Auth.js, Vercel 배포" },
  ],
};

export const seedProjects = [
  {
    _id: "0000000000000000000000a1",
    title: "웹서버보안프로그래밍 실습 프로젝트",
    summary: "강의에서 매주 확장하고 있는 Next.js 16 + MongoDB 공지사항 게시판",
    description: [
      "강의 실습을 따라 한 학기 동안 자라나는 코스 프로젝트입니다.",
      "함수 시그니처(getNotices, getNotice, createNotice)를 먼저 고정하고, 내부 구현만 메모리 배열 → MongoDB로 교체하는 '계층 분리' 구조로 만들었습니다.",
      "7주차에는 Auth.js Credentials Provider와 bcrypt 해싱으로 회원가입·로그인·로그아웃을 추가했습니다.",
    ].join("\n\n"),
    period: "2026.09 ~ 진행 중",
    techStack: ["Next.js 16", "React 19", "Tailwind v4", "shadcn/ui", "MongoDB", "Mongoose", "Auth.js"],
    highlights: [
      "3주차 · create-next-app, App Router 구조, Server/Client Component",
      "4주차 · 동적 라우팅, loading.tsx, Server Action, Route Handler",
      "5주차 · 공지사항 게시판, form action + useFormStatus, SiteHeader",
      "6주차 · MongoDB Atlas 연동, 연결 캐싱, Mongoose 스키마, error.tsx",
      "7주차 · Auth.js + bcrypt 회원가입/로그인/로그아웃",
    ],
    repoUrl: "https://github.com/minjae0202/wss-2026-2",
    deployUrl: "https://wss-2026-2.vercel.app/",
    category: "course",
    featured: true,
    order: 1,
  },
  {
    _id: "0000000000000000000000a2",
    title: "개인 포트폴리오 홈페이지",
    summary: "지금 보고 있는 이 사이트 — 포트폴리오 데이터를 MongoDB에 저장하고 관리자 페이지에서 편집",
    description: [
      "강의에서 배운 패턴을 그대로 적용해 만든 포트폴리오 사이트입니다.",
      "프로필·프로젝트·방명록 데이터는 모두 MongoDB에 저장되며, 관리자 계정으로 로그인하면 /admin에서 직접 추가·수정·삭제할 수 있습니다.",
    ].join("\n\n"),
    period: "2026.10",
    techStack: ["Next.js 16", "MongoDB", "Mongoose", "Auth.js", "Tailwind v4", "Vercel"],
    highlights: [
      "프로필·프로젝트 CRUD (Server Action + revalidatePath)",
      "Auth.js 로그인 + 관리자 이메일 기반 접근 제어",
      "로그인 사용자 방명록, 본인 글만 삭제 가능",
      "공개 JSON API: /api/projects (Route Handler)",
    ],
    repoUrl: "", // TODO: 이 포트폴리오 저장소를 GitHub에 올린 뒤 /admin에서 입력
    deployUrl: "", // TODO: Vercel 배포 후 /admin에서 입력
    category: "personal",
    featured: true,
    order: 3,
  },
  whitehatProject,
];
