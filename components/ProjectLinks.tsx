type Props = { repoUrl: string; deployUrl: string; size?: "sm" | "md" };

// 저장소 / 배포 주소 버튼 — 값이 비어 있으면 해당 버튼은 숨김
export function ProjectLinks({ repoUrl, deployUrl, size = "sm" }: Props) {
  const pad = size === "md" ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-xs";
  if (!repoUrl && !deployUrl) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-md border border-line bg-card font-medium hover:border-accent hover:text-accent ${pad}`}
        >
          <GitHubIcon /> GitHub 저장소
        </a>
      )}
      {deployUrl && (
        <a
          href={deployUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-md bg-accent font-medium text-on-accent hover:bg-accent-strong ${pad}`}
        >
          <ExternalIcon /> 배포 사이트
        </a>
      )}
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}
