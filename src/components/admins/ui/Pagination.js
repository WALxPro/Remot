import {
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

export function Pagination({
  page = 1,
  limit = 10,
  total = 0,
  totalPages = 0,
  onPageChange,
}) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  const buttonClassName = `
    flex size-9 cursor-pointer items-center
    justify-center rounded-lg border
    border-foreground/10 text-foreground/60
    transition-colors
    hover:border-brand-primary/30
    hover:text-brand-primary
    disabled:cursor-not-allowed
    disabled:opacity-30
    disabled:hover:border-foreground/10
    disabled:hover:text-foreground/60
  `;

  return (
    <div
      className="
        flex flex-col items-center justify-between
        gap-4 sm:flex-row
      "
    >
      {/* RECORD INFORMATION */}
      <p className="text-sm text-foreground/50">
        Showing{" "}
        <span className="font-medium text-foreground">
          {start}–{end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-foreground">
          {total}
        </span>{" "}
        records
      </p>

      {/* PAGINATION CONTROLS */}
      <nav
        aria-label="Pagination"
        className="flex items-center gap-2"
      >
        <button
          type="button"
          disabled={!hasPrevious}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
          className={buttonClassName}
        >
          <HiChevronLeft className="text-xl" />
        </button>

        <span
          aria-live="polite"
          className="
            rounded-lg border border-brand-primary/20
            bg-brand-primary/10 px-4 py-2
            text-sm font-medium text-brand-primary
          "
        >
          {totalPages === 0 ? 0 : page} / {totalPages}
        </span>

        <button
          type="button"
          disabled={!hasNext}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
          className={buttonClassName}
        >
          <HiChevronRight className="text-xl" />
        </button>
      </nav>
    </div>
  );
}