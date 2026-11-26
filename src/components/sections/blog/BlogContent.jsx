import React from "react";

export function BlogContent({ content }) {
  if (!content) {
    return null;
  }

  return (
    <section
      aria-label="Article content"
      className="w-full px-5 pb-16 sm:pb-20 lg:pb-24"
    >
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div
          className="blog-content text-foreground"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}