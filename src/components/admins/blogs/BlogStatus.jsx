const BLOG_STATUS_CONFIG = {
  published: {
    label: "Published",
    className: "bg-emerald-500/10 text-emerald-400",
    dotClassName: "bg-emerald-400",
  },

  draft: {
    label: "Draft",
    className: "bg-foreground/10 text-foreground/60",
    dotClassName: "bg-foreground/40",
  },
};

export function BlogStatus({ status }) {
  const config =
    BLOG_STATUS_CONFIG[status] ??
    BLOG_STATUS_CONFIG.draft;

  return (
    <span
      className={`
        inline-flex items-center gap-2
        rounded-full px-3 py-1.5
        text-xs font-medium
        ${config.className}
      `}
    >
      <span
        aria-hidden="true"
        className={`
          size-1.5 rounded-full
          ${config.dotClassName}
        `}
      />

      {config.label}
    </span>
  );
}