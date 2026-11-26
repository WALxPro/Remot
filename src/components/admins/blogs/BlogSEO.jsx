import { AdminCard } from "@/components/admins/ui/AdminCard";
import { AdminField, AdminInput, AdminTextarea, CharacterCounter } from "@/components/admins/ui/AdminField";
import { useFormContext, useWatch } from "react-hook-form";

export function BlogSEO() {
  const { register, control, formState: { errors } } = useFormContext();
  const metaTitle = useWatch({ control, name: "metaTitle" }) ?? "";
  const metaDescription = useWatch({ control, name: "metaDescription" }) ?? "";
  return (
    <AdminCard className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          SEO Settings
        </h2>

        <p className="mt-2 text-sm text-foreground/50">
          Optimize your blog for search engines.
        </p>
      </div>

      <AdminField htmlFor="meta-title" error={errors.metaTitle?.message}>
        <div className="flex items-center justify-between">
          <label
            htmlFor="meta-title"
            className="text-sm font-medium text-foreground"
          >
            Meta Title
          </label>

          <CharacterCounter value={metaTitle} recommendedLength={60} />
        </div>

        <AdminInput
          id="meta-title"
          type="text"
          {...register("metaTitle")}
          placeholder="Enter SEO title"
          maxLength={255}
          aria-describedby={errors.metaTitle ? "meta-title-error" : undefined}
          aria-invalid={Boolean(errors.metaTitle)}
        />

        <p className="text-xs text-foreground/40">
          Recommended length: 50–60 characters.
        </p>
      </AdminField>
      <AdminField htmlFor="meta-description" error={errors.metaDescription?.message}>
        <div className="flex items-center justify-between">
          <label
            htmlFor="meta-description"
            className="text-sm font-medium text-foreground"
          >
            Meta Description
          </label>

          <CharacterCounter value={metaDescription} recommendedLength={160} />
        </div>

        <AdminTextarea
          id="meta-description"
          {...register("metaDescription")}
          placeholder="Enter SEO description"
          rows={4}
          className="resize-y"
          aria-describedby={errors.metaDescription ? "meta-description-error" : undefined}
          aria-invalid={Boolean(errors.metaDescription)}
        />

        <p className="text-xs text-foreground/40">
          Recommended length: 150–160 characters.
        </p>
      </AdminField>
    </AdminCard>
  );
}
