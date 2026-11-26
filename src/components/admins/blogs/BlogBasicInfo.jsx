const inputClassName = `
  w-full rounded-lg border border-foreground/10
  bg-foreground/5 px-4 py-3 text-sm
  text-foreground outline-none
  placeholder:text-foreground/40
  transition-colors
  focus:border-brand-primary/50
`;

export function BlogBasicInfo({
  title,
  slug,
  description,
  onChange,
}) {
  return (
    <section className="space-y-6 rounded-xl border border-foreground/10 p-5 sm:p-6">

      <h2 className="font-display text-xl font-bold text-foreground">
        Blog Information
      </h2>

      {/* BLOG TITLE */}
      <div className="space-y-2">
        <label
          htmlFor="blog-title"
          className="text-sm font-medium text-foreground"
        >
          Blog Title *
        </label>

        <input
          id="blog-title"
          type="text"
          value={title}
          onChange={(event) =>
            onChange("title", event.target.value)
          }
          placeholder="Enter blog title"
          maxLength={255}
          required
          className={inputClassName}
        />
      </div>

      {/* BLOG SLUG */}
      <div className="space-y-2">
        <label
          htmlFor="blog-slug"
          className="text-sm font-medium text-foreground"
        >
          Slug
        </label>

        <input
          id="blog-slug"
          type="text"
          value={slug}
          placeholder="Automatically generated from title"
          readOnly
          className={`${inputClassName} cursor-default opacity-60`}
        />

        <p className="text-xs text-foreground/40">
          The final slug is automatically generated when
          the blog is saved.
        </p>
      </div>

      {/* BLOG DESCRIPTION */}
      <div className="space-y-2">
        <label
          htmlFor="blog-description"
          className="text-sm font-medium text-foreground"
        >
          Short Description *
        </label>

        <textarea
          id="blog-description"
          value={description}
          onChange={(event) =>
            onChange("description", event.target.value)
          }
          placeholder="Write a short description of your blog..."
          rows={4}
          required
          className={`${inputClassName} resize-y`}
        />
      </div>

    </section>
  );
}