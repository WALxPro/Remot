"use client";

import { useRouter } from "next/navigation";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  loginAdmin,
  logoutAdmin,
} from "@/lib/api/auth";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // LOGIN MUTATION
  const login = useMutation({
    mutationFn: loginAdmin,
    retry: false,

    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();

      router.replace("/admin");
      router.refresh();
    },
  });

  // LOGOUT MUTATION
  const logout = useMutation({
    mutationFn: logoutAdmin,
    retry: false,

    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();

      router.replace("/admin/login");
      router.refresh();
    },
  });

  return {
    login,
    logout,
  };
}