"use client";

import dynamic from "next/dynamic";
import { AdminCard } from "@/components/admins/ui/AdminCard";
import { Controller, useFormContext } from "react-hook-form";

const Editor = dynamic(
  () =>
    import("@tinymce/tinymce-react").then(
      (module) => module.Editor
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[450px] items-center justify-center rounded-lg border border-foreground/10 bg-foreground/5">
        <p className="text-sm text-foreground/50">
          Loading editor...
        </p>
      </div>
    ),
  }
);

const EDITOR_CONFIG = {
  height: 450,
  menubar: false,

  skin: "oxide-dark",
  content_css: "dark",

  plugins: [
    "lists",
    "link",
    "image",
    "table",
    "code",
    "wordcount",
    "fullscreen",
    "autoresize",
  ],

  toolbar:
    "undo redo | blocks | bold italic underline | " +
    "bullist numlist | link image table | " +
    "removeformat | code fullscreen",

  block_formats:
    "Paragraph=p; Heading 2=h2; Heading 3=h3; Heading 4=h4",

  placeholder: "Start writing your blog content...",

  min_height: 450,
  max_height: 800,

  automatic_uploads: false,
  paste_data_images: false,

  convert_urls: false,

  content_style: `
    body {
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.8;
      padding: 12px;
    }

    img {
      max-width: 100%;
      height: auto;
    }
  `,
};

export function BlogEditor() {
  const { control, formState: { errors } } = useFormContext();
  return (
    <AdminCard className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Blog Content
          <span className="ml-1 text-brand-primary">*</span>
        </h2>

        <p className="mt-2 text-sm text-foreground/50">
          Write and format your blog content.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg">
        <Controller name="content" control={control} render={({ field }) => (
          <Editor id="blog-content" apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY} cloudChannel="8" value={field.value} onEditorChange={field.onChange} init={EDITOR_CONFIG} />
        )} />
      </div>
      {errors.content && <p role="alert" className="text-xs text-red-400">{errors.content.message}</p>}
    </AdminCard>
  );
}
