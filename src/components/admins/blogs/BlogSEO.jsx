const inputClassName = `
  w-full rounded-lg border border-foreground/10
  bg-foreground/5 px-4 py-3 text-sm
  text-foreground outline-none
  placeholder:text-foreground/40
  transition-colors
  focus:border-brand-primary/50
`;

export function BlogSEO({
  metaTitle = "",
  metaDescription = "",
  onChange,
}) {
  return (
    <section className="space-y-6 rounded-xl border border-foreground/10 p-5 sm:p-6">
      {/* SECTION HEADER */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          SEO Settings
        </h2>

        <p className="mt-2 text-sm text-foreground/50">
          Optimize your blog for search engines.
        </p>
      </div>

      {/* META TITLE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="meta-title"
            className="text-sm font-medium text-foreground"
          >
            Meta Title
          </label>

          <span
            className={`text-xs ${
              metaTitle.length > 60
                ? "text-amber-400"
                : "text-foreground/40"
            }`}
          >
            {metaTitle.length}/60
          </span>
        </div>

        <input
          id="meta-title"
          type="text"
          value={metaTitle}
          onChange={(event) =>
            onChange("metaTitle", event.target.value)
          }
          placeholder="Enter SEO title"
          maxLength={255}
          className={inputClassName}
        />

        <p className="text-xs text-foreground/40">
          Recommended length: 50–60 characters.
        </p>
      </div>

      {/* META DESCRIPTION */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="meta-description"
            className="text-sm font-medium text-foreground"
          >
            Meta Description
          </label>

          <span
            className={`text-xs ${
              metaDescription.length > 160
                ? "text-amber-400"
                : "text-foreground/40"
            }`}
          >
            {metaDescription.length}/160
          </span>
        </div>

        <textarea
          id="meta-description"
          value={metaDescription}
          onChange={(event) =>
            onChange("metaDescription", event.target.value)
          }
          placeholder="Enter SEO description"
          rows={4}
          className={`${inputClassName} resize-y`}
        />

        <p className="text-xs text-foreground/40">
          Recommended length: 150–160 characters.
        </p>
      </div>
    </section>
  );
}