"use client";

import { createContext, type ReactNode, useContext, useMemo } from "react";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useRefreshToken } from "@/hooks/auth/use-refresh-token";
import { useSignIn } from "@/hooks/auth/use-sign-in";
import { useSignout } from "@/hooks/auth/use-sign-out";
import type { AuthContextType } from "@/lib/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const signIn = useSignIn();
  const signout = useSignout();
  const refreshToken = useRefreshToken();
  const { data: user, isLoading } = useCurrentUser();

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token")
      : null;

  const value: AuthContextType = useMemo(
    () => ({
      user: user?.user ?? null,
      token,
      isLoading:
        isLoading ||
        signIn.isPending ||
        signout.isPending ||
        refreshToken.isPending,
      signIn, // Expose the mutation object directly
      signOut: async () => signout.mutateAsync(),
      refreshToken: async (extendRememberMe = false) =>
        refreshToken.mutateAsync(extendRememberMe),
      isAuthenticated: !!user?.user && !!token,
    }),
    [user, token, isLoading, signIn, signout, refreshToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
