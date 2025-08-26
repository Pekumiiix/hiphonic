"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from "@/hooks/use-search-params";
import { globalToasts } from "@/lib/toasts";
import { useAuth } from "@/provider/auth-provider";
import AlternativeAuthMethod from "../components/alternative-auth-method";
import FormContainer from "../components/form-container";
import SignInForm from "./sections/sign-in-form";

export default function SignInPage() {
  const { get, set } = useSearchParams();
  const { isAuthenticated } = useAuth();

  const router = useRouter();
  const error = get("error");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }

    if (error === "access_denied") {
      globalToasts.globalError("You have denied the access your account.");
      set({ error: undefined });
    } else if (error === "oauth_failed") {
      globalToasts.globalError(
        "There was an error during the authentication process. Please try again."
      );
      set({ error: undefined });
    }
  }, [isAuthenticated, router, set]);

  return (
    <FormContainer
      headline="Sign In to your Account"
      description="Welcome back! please enter your detail"
    >
      <SignInForm />

      <AlternativeAuthMethod type="sign-in" />
    </FormContainer>
  );
}
