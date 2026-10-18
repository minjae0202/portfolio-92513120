export default function ProjectsLoading() {
  return (
    <div className="grid animate-pulse gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-48 rounded-2xl bg-subtle" />
      ))}
    </div>
  );
}
