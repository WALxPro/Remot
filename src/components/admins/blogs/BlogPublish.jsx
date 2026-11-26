import {
  HiOutlineSave,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

import { BlogStatus } from "./BlogStatus";
import { AdminCard } from "@/components/admins/ui/AdminCard";
import { AdminField, AdminInput } from "@/components/admins/ui/AdminField";
import { useFormContext, useWatch } from "react-hook-form";

export function BlogPublish({ onSave, isSaving = false }) {
  const { register, control, formState: { errors } } = useFormContext();
  const status = useWatch({ control, name: "status" }) ?? "draft";
  return (
    <AdminCard className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Publishing
        </h2>

        <p className="mt-2 text-sm text-foreground/50">
          Manage your blog publishing settings.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          Current Status
        </span>

        <BlogStatus status={status} />
      </div>

      <AdminField label="Category *" htmlFor="blog-category" error={errors.category?.message}>
        <AdminInput
          id="blog-category"
          type="text"
          {...register("category")}
          placeholder="Enter blog category"
          maxLength={100}
          required
          aria-describedby={errors.category ? "blog-category-error" : undefined}
          aria-invalid={Boolean(errors.category)}
        />
      </AdminField>
      <div className="space-y-3 border-t border-foreground/10 pt-5">
        <button
          type="button"
          onClick={() => onSave("draft")}
          disabled={isSaving}
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

          {isSaving ? "Saving..." : "Save as Draft"}
        </button>

        <button
          type="button"
          onClick={() => onSave("published")}
          disabled={isSaving}
          className="
            flex w-full cursor-pointer items-center
            justify-center gap-2 rounded-lg
            bg-brand-primary px-4 py-3
            text-sm font-semibold text-background
            transition-colors hover:bg-brand-primary/80
          "
        >
          <HiOutlineGlobeAlt className="text-xl" />

          {isSaving ? "Saving..." : status === "published"
            ? "Update Blog"
            : "Publish Blog"}
        </button>
      </div>
    </AdminCard>
  );
}
