// DB가 비어 있을 때 처음 한 번만 들어가는 초기 데이터입니다.
// 이후 수정은 /admin 페이지에서 하면 DB에 바로 반영됩니다.
// (이미 시드된 뒤에 이 파일을 고쳐도 DB 내용은 바뀌지 않습니다.)

// _id를 고정해 두면 동시에 여러 요청이 시드해도 중복 문서가 생기지 않음
export const seedProfile = {
  _id: "000000000000000000000001",
  name: "홍길동", // TODO: 본인 이름
  role: "정보보호학과 · 풀스택 웹 개발자 지망생",
  intro: "안전한 웹 서비스를 직접 설계하고 만드는 개발자를 목표로 합니다.",
  bio: [
    "중부대학교 정보보호학과에서 웹서버보안프로그래밍을 수강하며 Next.js, MongoDB, Auth.js 기반의 풀스택 웹 개발을 배우고 있습니다.",
    "기능을 만드는 것에 그치지 않고, 시크릿 관리·비밀번호 해싱·에러 노출 방지처럼 코드 레벨에서 보안을 챙기는 습관을 기르고 있습니다.",
  ].join("\n\n"),
  email: "",
  github: "https://github.com/minjae0202",
  skills: [
    { category: "Frontend", items: ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS v4"] },
    { category: "Backend", items: ["Server Actions", "Route Handlers", "Auth.js v5", "bcrypt"] },
    { category: "Database", items: ["MongoDB Atlas", "Mongoose"] },
    { category: "DevOps · Tools", items: ["Git / GitHub", "Vercel", "VS Code"] },
  ],
  timeline: [
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
    isCourseProject: true,
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
    isCourseProject: false,
    featured: true,
    order: 2,
  },
];
