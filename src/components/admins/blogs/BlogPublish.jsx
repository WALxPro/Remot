import {
  HiOutlineSave,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

import { BlogStatus } from "./BlogStatus";

export function BlogPublish({
  category = "",
  status = "draft",
  onChange,
  onSave,
}) {
  return (
    <section className="space-y-6 rounded-xl border border-foreground/10 p-5 sm:p-6">
      {/* SECTION HEADER */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Publishing
        </h2>

        <p className="mt-2 text-sm text-foreground/50">
          Manage your blog publishing settings.
        </p>
      </div>

      {/* CURRENT STATUS */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          Current Status
        </span>

        <BlogStatus status={status} />
      </div>

      {/* BLOG CATEGORY */}
      <div className="space-y-2">
        <label
          htmlFor="blog-category"
          className="text-sm font-medium text-foreground"
        >
          Category *
        </label>

        <input
          id="blog-category"
          type="text"
          value={category}
          onChange={(event) =>
            onChange("category", event.target.value)
          }
          placeholder="Enter blog category"
          maxLength={100}
          required
          className="
            w-full rounded-lg border border-foreground/10
            bg-foreground/5 px-4 py-3 text-sm
            text-foreground outline-none
            placeholder:text-foreground/40
            transition-colors
            focus:border-brand-primary/50
          "
        />
      </div>

      {/* PUBLISHING ACTIONS */}
      <div className="space-y-3 border-t border-foreground/10 pt-5">
        <button
          type="button"
          onClick={() => onSave("draft")}
          className="
            flex w-full cursor-pointer items-center
            justify-center gap-2 rounded-lg
            border border-foreground/15 px-4 py-3
            text-sm font-medium text-foreground/70
            transition-colors
            hover:border-brand-primary/50
            hover:text-brand-primary
          "
        >
          <HiOutlineSave className="text-xl" />

          Save as Draft
        </button>

        <button
          type="button"
          onClick={() => onSave("published")}
          className="
            flex w-full cursor-pointer items-center
            justify-center gap-2 rounded-lg
            bg-brand-primary px-4 py-3
            text-sm font-semibold text-background
            transition-colors hover:bg-brand-primary/80
          "
        >
          <HiOutlineGlobeAlt className="text-xl" />

          {status === "published"
            ? "Update Blog"
            : "Publish Blog"}
        </button>
      </div>
    </section>
  );
}