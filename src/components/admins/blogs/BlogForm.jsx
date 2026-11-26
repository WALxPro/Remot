"use client";

import { useRef, useState } from "react";

import { BlogBasicInfo } from "./BlogBasicInfo";
import { BlogEditor } from "./BlogEditor";
import { BlogSEO } from "./BlogSEO";
import { BlogFeaturedImage } from "./BlogFeaturedImage";
import { BlogPublish } from "./BlogPublish";

const INITIAL_FORM_DATA = {
  title: "",
  description: "",
  content: "",
  category: "",
  featuredImage: null,
  status: "draft",
  metaTitle: "",
  metaDescription: "",
};

function generateSlugPreview(title) {
  if (!title.trim()) return "";

  return (
    title
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s-]+/g, "-")
      .slice(0, 255)
      .replace(/^-+|-+$/g, "") || "blog"
  );
}

export function BlogForm({ initialData = null }) {
  const formRef = useRef(null);

  const [formData, setFormData] = useState(() => ({
    ...INITIAL_FORM_DATA,
    ...initialData,
    metaTitle: initialData?.metaTitle ?? "",
    metaDescription: initialData?.metaDescription ?? "",
  }));

  const [feedback, setFeedback] = useState(null);

  const slug = generateSlugPreview(formData.title);

  function handleChange(field, value) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setFeedback(null);
  }

  function handleSave(status) {
    if (!formRef.current?.reportValidity()) return;

    const contentDocument = new DOMParser().parseFromString(
      formData.content,
      "text/html"
    );

    const hasText = Boolean(
      contentDocument.body.textContent?.trim()
    );

    const hasImage = Boolean(
      contentDocument.querySelector("img[src]")
    );

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category.trim()
    ) {
      setFeedback({
        type: "error",
        message: "Please complete all required fields.",
      });

      return;
    }

    if (!hasText && !hasImage) {
      setFeedback({
        type: "error",
        message: "Please enter your blog content.",
      });

      return;
    }

    // Temporary UI demonstration.
    // API integration will be added later.

    setFeedback({
      type: "success",
      message:
        status === "draft"
          ? "Draft validation successful. Saving is not connected yet."
          : "Blog validation successful. Publishing is not connected yet.",
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={(event) => event.preventDefault()}
      className="space-y-6"
    >
      {/* FORM FEEDBACK */}
      {feedback && (
        <div
          role="alert"
          className={`
            rounded-lg border px-4 py-3 text-sm
            ${
              feedback.type === "error"
                ? "border-red-500/20 bg-red-500/10 text-red-400"
                : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
            }
          `}
        >
          {feedback.message}
        </div>
      )}

      {/* FORM LAYOUT */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">

        {/* LEFT COLUMN */}
        <div className="min-w-0 space-y-6">
          <BlogBasicInfo
            title={formData.title}
            slug={slug}
            description={formData.description}
            onChange={handleChange}
          />

          <BlogEditor
            value={formData.content}
            onChange={(content) =>
              handleChange("content", content)
            }
          />

          <BlogSEO
            metaTitle={formData.metaTitle}
            metaDescription={formData.metaDescription}
            onChange={handleChange}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="min-w-0 space-y-6">
          <BlogPublish
            category={formData.category}
            status={formData.status}
            onChange={handleChange}
            onSave={handleSave}
          />

          <BlogFeaturedImage
            value={formData.featuredImage}
            onChange={(image) =>
              handleChange("featuredImage", image)
            }
          />
        </div>

      </div>
    </form>
  );
}