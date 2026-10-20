import { PROJECT_CATEGORIES, type ProjectCategory } from "@/lib/projects";

const styles: Record<ProjectCategory, string> = {
  course: "border-accent/40 text-accent",
  whitehat: "border-violet-500/40 text-violet-600 dark:text-violet-300",
  personal: "",
};

// 개인 프로젝트는 배지 없이 표시
export function CategoryBadge({ category }: { category: ProjectCategory }) {
  if (category === "personal") return null;
  return (
    <span className={`rounded border px-1.5 py-0.5 text-[11px] font-medium ${styles[category]}`}>
      {PROJECT_CATEGORIES[category]}
    </span>
  );
}
