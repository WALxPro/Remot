"use client";

import { useRef, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { BlogBasicInfo } from "./BlogBasicInfo";
import { BlogEditor } from "./BlogEditor";
import { BlogSEO } from "./BlogSEO";
import { BlogFeaturedImage } from "./BlogFeaturedImage";
import { BlogPublish } from "./BlogPublish";
import { generateBlogSlug } from "@/utils/blogs";
import { blogFormSchema } from "@/lib/validation/blog";
import { uploadBlogImage } from "@/lib/api/upload";
import { applyApiFieldErrors } from "@/lib/api/form-errors";
import { useBlogMutations } from "@/hooks/useBlogQueries";

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

export function BlogForm({ initialData = null }) {
  const router = useRouter();
  const uploadedImages = useRef(new WeakMap());
  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
    ...INITIAL_FORM_DATA,
    ...initialData,
    metaTitle: initialData?.metaTitle ?? "",
    metaDescription: initialData?.metaDescription ?? "",
    },
  });

  const [feedback, setFeedback] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { create, update } = useBlogMutations();

  const title = useWatch({ control: form.control, name: "title" }) ?? "";
  const slug = generateBlogSlug(title);

  async function persist(values, status) {
    setFeedback(null);
    try {
      let featuredImage = values.featuredImage;
      if (typeof File !== "undefined" && featuredImage instanceof File) {
        featuredImage = uploadedImages.current.get(featuredImage);
        if (!featuredImage) {
          setFeedback({ type: "info", message: "Uploading featured image..." });
          setIsUploading(true);
          try {
            const image = await uploadBlogImage(values.featuredImage);
            featuredImage = image.url;
            uploadedImages.current.set(values.featuredImage, featuredImage);
          } finally {
            setIsUploading(false);
          }
        }
      }

      const payload = {
        title: values.title.trim(), description: values.description.trim(), content: values.content,
        featuredImage: featuredImage || null, category: values.category.trim(), status,
        metaTitle: values.metaTitle.trim() || null, metaDescription: values.metaDescription.trim() || null,
      };
      const blog = initialData ? await update.mutateAsync({ slug: initialData.slug, data: payload }) : await create.mutateAsync(payload);
      form.reset({ ...payload, featuredImage: blog.featuredImage });
      setFeedback({ type: "success", message: initialData ? "Blog updated successfully." : "Blog created successfully." });
      if (!initialData || blog.slug !== initialData.slug) router.replace(`/admin/blogs/${blog.slug}/edit`);
    } catch (error) {
      applyApiFieldErrors(form.setError, error);
      setFeedback({ type: "error", message: error.message || "Unable to save the blog." });
    }
  }

  function handleSave(status) {
    form.setValue("status", status, { shouldValidate: true });
    form.handleSubmit((values) => persist(values, status), () => setFeedback({ type: "error", message: "Please correct the highlighted fields." }))();
  }

  return (
    <FormProvider {...form}><form onSubmit={(event) => event.preventDefault()} className="space-y-6">
      {/* FORM FEEDBACK */}
      {feedback && (
        <div
          role="alert"
          className={`
            rounded-lg border px-4 py-3 text-sm
            ${
              feedback.type === "error"
                ? "border-red-500/20 bg-red-500/10 text-red-400"
                : feedback.type === "info" ? "border-brand-primary/20 bg-brand-primary/10 text-brand-primary" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
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
          <BlogBasicInfo slug={slug} />
          <BlogEditor />
          <BlogSEO />
        </div>

        {/* RIGHT COLUMN */}
        <div className="min-w-0 space-y-6">
          <BlogPublish onSave={handleSave} isSaving={isUploading || create.isPending || update.isPending} />
          <BlogFeaturedImage />
        </div>

      </div>
    </form></FormProvider>
  );
}
