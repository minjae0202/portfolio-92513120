import { PROJECT_CATEGORIES, type ProjectCategory } from "@/lib/projects";

const styles: Record<ProjectCategory, string> = {
  course: "bg-accent/10 text-accent",
  whitehat: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  personal: "",
};

// 개인 프로젝트는 배지 없이 표시
export function CategoryBadge({ category }: { category: ProjectCategory }) {
  if (category === "personal") return null;
  return (
    <span className={`rounded-full px-2 py-0.5 font-medium ${styles[category]}`}>
      {PROJECT_CATEGORIES[category]}
    </span>
  );
}
