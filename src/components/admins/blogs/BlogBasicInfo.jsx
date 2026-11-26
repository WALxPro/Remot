import { AdminCard } from "@/components/admins/ui/AdminCard";
import { AdminField, AdminInput, AdminTextarea } from "@/components/admins/ui/AdminField";
import { useFormContext } from "react-hook-form";

export function BlogBasicInfo({ slug }) {
  const { register, formState: { errors } } = useFormContext();
  return (
    <AdminCard className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">
        Blog Information
      </h2>
      <AdminField label="Blog Title *" htmlFor="blog-title" error={errors.title?.message}>
        <AdminInput
          id="blog-title"
          type="text"
          {...register("title")}
          placeholder="Enter blog title"
          maxLength={255}
          required
          aria-describedby={errors.title ? "blog-title-error" : undefined}
          aria-invalid={Boolean(errors.title)}
        />
      </AdminField>
      <AdminField label="Slug" htmlFor="blog-slug" hint="The final slug is automatically generated when the blog is saved.">
        <AdminInput
          id="blog-slug"
          type="text"
          value={slug}
          placeholder="Automatically generated from title"
          readOnly
          className="cursor-default opacity-60"
        />
      </AdminField>
      <AdminField label="Short Description *" htmlFor="blog-description" error={errors.description?.message}>
        <AdminTextarea
          id="blog-description"
          {...register("description")}
          placeholder="Write a short description of your blog..."
          rows={4}
          required
          aria-describedby={errors.description ? "blog-description-error" : undefined}
          aria-invalid={Boolean(errors.description)}
          className="resize-y"
        />
      </AdminField>
    </AdminCard>
  );
}
