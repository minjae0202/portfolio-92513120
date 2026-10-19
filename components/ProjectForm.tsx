import { PROJECT_CATEGORIES, type Project } from "@/lib/projects";
import { SubmitButton } from "@/components/SubmitButton";

type Props = {
  action: (formData: FormData) => Promise<void>;
  project?: Project;
  submitLabel: string;
};

// 새 프로젝트 / 수정 화면에서 함께 쓰는 폼 (Server Component)
export function ProjectForm({ action, project, submitLabel }: Props) {
  return (
    <form action={action} className="flex flex-col gap-5">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div>
        <label htmlFor="title" className="label">제목 *</label>
        <input id="title" name="title" required maxLength={100} defaultValue={project?.title} className="field" />
      </div>
      <div>
        <label htmlFor="summary" className="label">한 줄 소개 *</label>
        <input id="summary" name="summary" required maxLength={200} defaultValue={project?.summary} className="field" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="repoUrl" className="label">GitHub 저장소 주소</label>
          <input id="repoUrl" name="repoUrl" type="url" placeholder="https://github.com/..." defaultValue={project?.repoUrl} className="field" />
        </div>
        <div>
          <label htmlFor="deployUrl" className="label">배포 주소</label>
          <input id="deployUrl" name="deployUrl" type="url" placeholder="https://....vercel.app" defaultValue={project?.deployUrl} className="field" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="period" className="label">기간</label>
          <input id="period" name="period" placeholder="2026.09 ~ 2026.12" defaultValue={project?.period} className="field" />
        </div>
        <div>
          <label htmlFor="order" className="label">정렬 순서 (작을수록 위)</label>
          <input id="order" name="order" type="number" defaultValue={project?.order ?? 0} className="field" />
        </div>
      </div>
      <div>
        <label htmlFor="techStack" className="label">사용 기술 (쉼표로 구분)</label>
        <input id="techStack" name="techStack" placeholder="Next.js, MongoDB, Tailwind" defaultValue={project?.techStack.join(", ")} className="field" />
      </div>
      <div>
        <label htmlFor="description" className="label">상세 설명 (빈 줄로 문단 구분)</label>
        <textarea id="description" name="description" rows={6} defaultValue={project?.description} className="field" />
      </div>
      <div>
        <label htmlFor="highlights" className="label">주요 내용 (한 줄에 하나)</label>
        <textarea id="highlights" name="highlights" rows={5} defaultValue={project?.highlights.join("\n")} className="field" />
      </div>
      <div className="flex flex-wrap items-center gap-6 text-sm">
        <label className="flex items-center gap-2">
          분류
          <select name="category" defaultValue={project?.category ?? "personal"} className="field w-auto">
            {Object.entries(PROJECT_CATEGORIES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" defaultChecked={project?.featured ?? true} />
          메인에 표시
        </label>
      </div>
      <div>
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
