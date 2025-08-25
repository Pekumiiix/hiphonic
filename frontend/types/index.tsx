import type { UrlObject } from "node:url";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Route } from "next";

export interface User {
  id: number;
  email: string;
  username: string | null;
}

export interface AuthToken {
  name?: string;
  expiresAt?: string;
  lastUsedAt?: string;
  isExpired?: boolean;
}

export interface SignInResponse {
  type: string;
  token: string;
  expiresAt?: string;
  rememberMe: boolean;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: UseMutationResult<
    SignInResponse,
    Error,
    { email: string; password: string; rememberMe?: boolean }
  >;
  signOut: () => Promise<void>;
  refreshToken: (extendRememberMe?: boolean) => Promise<void>;
  isAuthenticated: boolean;
}

export type TRoute = Route | UrlObject;

export interface INotifications {
  type: "success" | "user" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface IProjects {
  id: string;
  name: string;
}

export type TCategory = "development" | "design" | "planning";

export interface ITaskCardProps {
  image?: string;
  category: TCategory;
  title: string;
  description: string;
  comment: number;
  due_date: string;
}

export interface ITaskProps {
  title: string;
  category: TCategory;
  description: string;
  comment: number;
  due_date: string;
  status: "to-do" | "in-progress" | "in-review" | "done";
}
