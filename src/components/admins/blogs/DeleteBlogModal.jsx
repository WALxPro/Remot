"use client";

import { useEffect, useRef } from "react";
import { HiOutlineTrash, HiX } from "react-icons/hi";

export function DeleteBlogModal({
  blog,
  onClose,
  onConfirm,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (blog && !dialog.open) {
      dialog.showModal();
    }

    if (!blog && dialog.open) {
      dialog.close();
    }
  }, [blog]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="delete-blog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="
        fixed inset-0 m-auto
        w-[calc(100%-2rem)] max-w-md
        rounded-2xl border border-foreground/10
        bg-background p-6 text-foreground
        shadow-2xl backdrop:bg-black/70
        backdrop:backdrop-blur-sm
      "
    >
      {/* CLOSE BUTTON */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close confirmation"
        className="
          absolute right-4 top-4 cursor-pointer
          rounded-lg p-2 text-foreground/50
          transition-colors hover:bg-foreground/10
          hover:text-foreground
        "
      >
        <HiX className="text-xl" />
      </button>

      {/* WARNING ICON */}
      <div
        className="
          mb-5 flex size-14 items-center
          justify-center rounded-full
          bg-red-500/10 text-red-400
        "
      >
        <HiOutlineTrash className="text-3xl" />
      </div>

      {/* CONFIRMATION MESSAGE */}
      <h2
        id="delete-blog-title"
        className="font-display text-xl font-bold"
      >
        Delete Blog?
      </h2>

      <p className="mt-3 break-words text-sm leading-relaxed text-foreground/60">
        Are you sure you want to delete{" "}
        <span className="font-medium text-foreground">
          {blog?.title}
        </span>
        ? This action cannot be undone.
      </p>

      {/* MODAL ACTIONS */}
      <div className="mt-8 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="
            cursor-pointer rounded-lg border
            border-foreground/15 px-5 py-2.5
            text-sm font-medium text-foreground/70
            transition-colors hover:bg-foreground/5
          "
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => blog && onConfirm(blog)}
          className="
            cursor-pointer rounded-lg
            bg-red-600 px-5 py-2.5
            text-sm font-medium text-white
            transition-colors hover:bg-red-700
          "
        >
          Delete Blog
        </button>
      </div>
    </dialog>
  );
}