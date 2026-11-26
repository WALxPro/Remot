"use client";

import { useEffect, useRef } from "react";
import { HiOutlineTrash, HiX } from "react-icons/hi";

export function DeleteBlogModal({
  blog,
  onClose,
  onConfirm,
  isDeleting = false,
  error = null,
}) {
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (blog && !dialog.open) {
      returnFocusRef.current = document.activeElement;
      dialog.showModal();
    }

    if (!blog && dialog.open) {
      dialog.close();
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
    }
  }, [blog]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="delete-blog-title"
      aria-describedby="delete-blog-description"
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
        disabled={isDeleting}
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

      <p id="delete-blog-description" className="mt-3 break-words text-sm leading-relaxed text-foreground/60">
        Are you sure you want to delete{" "}
        <span className="font-medium text-foreground">
          {blog?.title}
        </span>
        ? This action cannot be undone.
      </p>
      {error && <p role="alert" className="mt-3 text-sm text-red-400">{error.message}</p>}

      {/* MODAL ACTIONS */}
      <div className="mt-8 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
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
          disabled={isDeleting}
          className="
            cursor-pointer rounded-lg
            bg-red-600 px-5 py-2.5
            text-sm font-medium text-white
            transition-colors hover:bg-red-700
          "
        >
          {isDeleting ? "Deleting..." : "Delete Blog"}
        </button>
      </div>
    </dialog>
  );
}
