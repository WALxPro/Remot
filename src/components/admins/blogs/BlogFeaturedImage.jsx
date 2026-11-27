"use client";

import { useEffect, useRef, useState } from "react";

import {
  HiOutlineCloudUpload,
  HiOutlinePhotograph,
  HiOutlineTrash,
} from "react-icons/hi";
import Image from "next/image";
import { AdminCard } from "@/components/admins/ui/AdminCard";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const isBrowserFile = (value) => typeof File !== "undefined" && value instanceof File;

export function BlogFeaturedImage() {
  const { control, formState: { errors } } = useFormContext();
  const value = useWatch({ control, name: "featuredImage" });
  const inputRef = useRef(null);

  const [localPreview, setLocalPreview] = useState(null);
  const localPreviewRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localPreviewRef.current && localPreviewRef.current.file !== value) {
      URL.revokeObjectURL(localPreviewRef.current.url);
      localPreviewRef.current = null;
    }
  }, [value]);

  useEffect(() => () => {
    if (localPreviewRef.current) {
      URL.revokeObjectURL(localPreviewRef.current.url);
    }
  }, []);

  const preview = isBrowserFile(value)
    ? localPreview?.file === value
      ? localPreview.url
      : null
    : value || null;

  function releaseLocalPreview() {
    if (localPreviewRef.current) {
      URL.revokeObjectURL(localPreviewRef.current.url);
      localPreviewRef.current = null;
    }
  }

  function handleFile(file, onChange) {
    if (!file) return;

    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    if (file.size === 0) {
      setError("The selected image is empty.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must not exceed 4 MB.");
      return;
    }

    releaseLocalPreview();
    const nextPreview = { file, url: URL.createObjectURL(file) };
    localPreviewRef.current = nextPreview;
    setLocalPreview(nextPreview);
    onChange(file);
  }

  function handleDrop(event, onChange) {
    event.preventDefault();
    setIsDragging(false);

    handleFile(event.dataTransfer.files[0], onChange);
  }

  function handleRemove(onChange) {
    releaseLocalPreview();
    setLocalPreview(null);
    onChange(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <AdminCard className="space-y-4">
      {/* SECTION HEADER */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Featured Image
        </h2>

        <p className="mt-2 text-sm text-foreground/50">
          Add a cover image for your blog.
        </p>
      </div>

      <Controller name="featuredImage" control={control} render={({ field }) => <>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => { handleFile(event.target.files?.[0], field.onChange); event.target.value = ""; }} />
      {preview ? (
        <div className="space-y-3">
          <div className="relative aspect-video overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5">
            <Image
              src={preview}
              alt="Featured image preview"
              fill
              sizes="(max-width: 1280px) 100vw, 340px"
              unoptimized={isBrowserFile(value)}
              className="size-full object-cover"
            />
          </div>

          {isBrowserFile(value) && (
            <p className="truncate text-xs text-foreground/50">
              {value.name}
            </p>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-foreground/10 px-3 py-2.5 text-xs text-foreground/70 transition-colors hover:border-brand-primary/30 hover:text-brand-primary"
            >
              <HiOutlinePhotograph className="text-lg" />
              Replace
            </button>

            <button
              type="button"
              onClick={() => handleRemove(field.onChange)}
              aria-label="Remove featured image"
              className="cursor-pointer rounded-lg border border-red-500/20 bg-red-500/5 p-2.5 text-red-400 transition-colors hover:bg-red-500/10"
            >
              <HiOutlineTrash className="text-lg" />
            </button>
          </div>
        </div>
      ) : (
        /* UPLOAD AREA */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => handleDrop(event, field.onChange)}
          className={`
            flex min-h-[200px] w-full cursor-pointer
            flex-col items-center justify-center gap-3
            rounded-lg border-2 border-dashed p-5
            text-center transition-colors
            ${
              isDragging
                ? "border-brand-primary bg-brand-primary/10"
                : "border-foreground/15 bg-foreground/5 hover:border-brand-primary/50"
            }
          `}
        >
          <HiOutlineCloudUpload className="text-4xl text-brand-primary" />

          <span className="text-sm font-medium text-foreground">
            Click to select an image
          </span>

          <span className="text-xs text-foreground/50">
            or drag and drop
          </span>

          <span className="text-xs text-foreground/40">
            JPG, PNG, WEBP • Maximum 5 MB
          </span>
        </button>
      )}</>} />

      {/* VALIDATION ERROR */}
      {error && (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
      {errors.featuredImage && <p role="alert" className="text-xs text-red-400">{errors.featuredImage.message}</p>}

      <p className="text-xs text-foreground/40">
        Recommended image ratio: 16:9.
      </p>
    </AdminCard>
  );
}
