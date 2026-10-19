import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic"; // 빌드 시점이 아니라 요청마다 DB 조회

// 공개 JSON API — 브라우저에서 /api/projects 로 확인 가능
export async function GET() {
  try {
    const projects = await getProjects();
    return Response.json({
      count: projects.length,
      projects: projects.map((p) => ({
        id: p.id,
        title: p.title,
        summary: p.summary,
        techStack: p.techStack,
        repoUrl: p.repoUrl,
        deployUrl: p.deployUrl,
        category: p.category,
      })),
    });
  } catch (err) {
    console.error(err); // 상세 내용은 서버 로그에만
    return Response.json({ error: "프로젝트 목록을 불러오지 못했습니다." }, { status: 500 });
  }
}
