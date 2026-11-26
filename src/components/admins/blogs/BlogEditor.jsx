"use client";

import dynamic from "next/dynamic";
import { Controller, useFormContext } from "react-hook-form";

import { AdminCard } from "@/components/admins/ui/AdminCard";

const Editor = dynamic(
  () =>
    import("@tinymce/tinymce-react").then(
      (module) => module.Editor
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[550px] items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5">
        <p className="text-sm text-foreground/50">
          Loading editor...
        </p>
      </div>
    ),
  }
);

const EDITOR_CONFIG = {
  height: 500,
  min_height: 500,
  max_height: 1000,

  width: "100%",

  menubar: false,
  branding: false,
  statusbar: true,

  skin: "oxide-dark",

  content_css: [
    "dark",
    "/styles/blog-content.css",
  ],

  body_class: "blog-content",

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
    "undo redo | blocks fontfamily fontsize | " +
    "bold italic underline strikethrough | " +
    "forecolor backcolor | " +
    "alignleft aligncenter alignright alignjustify | " +
    "bullist numlist outdent indent | " +
    "lineheight blockquote | " +
    "link image table | " +
    "pastetext removeformat | code fullscreen",

  toolbar_mode: "sliding",
  toolbar_location: "top",

  block_formats:
    "Paragraph=p;" +
    "Heading 2=h2;" +
    "Heading 3=h3;" +
    "Heading 4=h4;" +
    "Heading 5=h5;" +
    "Heading 6=h6",

  font_family_formats:
    "Arial=Arial,Helvetica,sans-serif;" +
    "Calibri=Calibri,Arial,sans-serif;" +
    "Georgia=Georgia,serif;" +
    "Helvetica=Helvetica,Arial,sans-serif;" +
    "Times New Roman=Times New Roman,serif;" +
    "Verdana=Verdana,sans-serif;" +
    "Tahoma=Tahoma,sans-serif;" +
    "Courier New=Courier New,monospace",

  font_size_formats:
    "12px 14px 16px 18px 20px 22px 24px 26px 28px 32px 36px 40px 48px 56px 64px",

  line_height_formats:
    "1 1.2 1.4 1.5 1.6 1.8 2 2.5 3",

  placeholder: "Start writing your blog content...",

  paste_as_text: false,
  paste_data_images: false,
  paste_merge_formats: true,

  automatic_uploads: false,
  image_dimensions: true,

  convert_urls: false,

  autoresize_bottom_margin: 24,

  content_style: `
    html {
      background-color: #0c0c12;
      color-scheme: dark;
    }

    body.blog-content {
      background-color: #0c0c12;
      color: #e4e4e7;
      caret-color: #ffffff;

      padding: 24px;
      margin: 0;

      box-sizing: border-box;

      --article-link-color: #60a5fa;
    }

    body.blog-content[data-mce-placeholder]:not(.mce-visualblocks)::before {
      color: #71717a;
      left: 24px;
      right: 24px;
    }

    ::selection {
      background-color: #52525b;
      color: #ffffff;
    }

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #0c0c12;
    }

    ::-webkit-scrollbar-thumb {
      background: #3f3f46;
      border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #52525b;
    }
  `,
};

export function BlogEditor() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <AdminCard className="min-w-0 space-y-4">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Blog Content
          <span className="ml-1 text-brand-primary">*</span>
        </h2>

        <p className="mt-2 text-sm text-foreground/50">
          Write or paste your article and format it using
          the editor below.
        </p>
      </div>

      <div className="min-w-0 overflow-hidden rounded-xl border border-foreground/10">
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Editor
              id="blog-content"
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              cloudChannel="8"
              value={field.value ?? ""}
              onEditorChange={field.onChange}
              onBlur={field.onBlur}
              init={EDITOR_CONFIG}
            />
          )}
        />
      </div>

      {errors.content && (
        <p role="alert" className="text-xs text-red-400">
          {errors.content.message}
        </p>
      )}
    </AdminCard>
  );
}