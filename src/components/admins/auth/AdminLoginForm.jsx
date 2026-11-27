"use client";

import { useState } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

import { Button } from "@/components/ui/Button";

import {
  AdminField,
  AdminInput,
} from "@/components/admins/ui/AdminField";

import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/server/modules/auth/auth.schema";

export function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    if (login.isPending) return;

    login.mutate(data);
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-[420px] space-y-8">

        {/* LOGO */}
        <div className="flex justify-center">
          <Image
            src="/images/shared/logo-remot.png"
            alt="Studio Remot"
            width={419}
            height={135}
            className="h-auto w-full max-w-[220px]"
            priority
          />
        </div>

        {/* LOGIN CARD */}
        <div className="space-y-6 rounded-2xl border border-foreground/10 bg-foreground/5 p-6 sm:p-8">

          {/* HEADING */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Admin Login
            </h1>

            <p className="text-sm text-foreground/50">
              Sign in to manage your website.
            </p>
          </div>

          {/* LOGIN FORM */}
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            aria-busy={login.isPending}
          >
            {/* EMAIL */}
            <AdminField
              label="Email address"
              htmlFor="email"
              error={errors.email?.message}
            >
              <AdminInput
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="username"
                disabled={login.isPending}
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "email-error" : undefined
                }
              />
            </AdminField>

            {/* PASSWORD */}
            <AdminField
              label="Password"
              htmlFor="password"
              error={errors.password?.message}
            >
              <div className="relative">
                <AdminInput
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={login.isPending}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password
                      ? "password-error"
                      : undefined
                  }
                  className="pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-4 text-foreground/40 transition-colors hover:text-brand-primary"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="text-xl" />
                  ) : (
                    <HiOutlineEye className="text-xl" />
                  )}
                </button>
              </div>
            </AdminField>

            {/* API ERROR */}
            {login.isError && (
              <div
                role="alert"
                className="space-y-1 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
              >
                <p>{login.error.message}</p>

                {login.error.status === 429 &&
                  login.error.retryAfter && (
                    <p className="text-xs">
                      Please try again after{" "}
                      {login.error.retryAfter} seconds.
                    </p>
                  )}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              variant="primary"
              disabled={login.isPending}
              className="min-h-[48px] w-full min-w-0 text-sm"
            >
              {login.isPending
                ? "Signing in..."
                : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-foreground/40">
          Authorized access only.
        </p>
      </div>
    </main>
  );
}