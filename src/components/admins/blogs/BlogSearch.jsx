import {
  HiOutlineSearch,
  HiX,
} from "react-icons/hi";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export function BlogSearch({
  search,
  limit,
  onSearchChange,
  onLimitChange,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* SEARCH INPUT */}
      <div
        className="
          flex w-full items-center gap-3
          rounded-lg border border-foreground/10
          bg-foreground/5 px-4 py-3
          transition-colors
          focus-within:border-brand-primary/50
          sm:max-w-md
        "
      >
        <HiOutlineSearch
          aria-hidden="true"
          className="shrink-0 text-xl text-foreground/40"
        />

        <input
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search blogs..."
          aria-label="Search blogs"
          maxLength={255}
          className="
            w-full bg-transparent text-sm
            text-foreground outline-none
            placeholder:text-foreground/40
            [&::-webkit-search-cancel-button]:appearance-none
          "
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="
              cursor-pointer text-lg text-foreground/40
              transition-colors hover:text-foreground
            "
          >
            <HiX />
          </button>
        )}
      </div>

      {/* PAGE SIZE */}
      <div className="flex items-center gap-3">
        <label
          htmlFor="blog-page-size"
          className="text-sm text-foreground/50"
        >
          Show:
        </label>

        <select
          id="blog-page-size"
          value={limit}
          onChange={(event) =>
            onLimitChange(Number(event.target.value))
          }
          className="
            cursor-pointer rounded-lg border
            border-foreground/10 bg-background
            px-4 py-3 text-sm text-foreground
            outline-none focus:border-brand-primary/50
          "
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}