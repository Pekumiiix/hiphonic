"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/provider/auth-provider";
import AlternativeAuthMethod from "../components/alternative-auth-method";
import FormContainer from "../components/form-container";
import SignInForm from "./sections/sign-in-form";

export default function SignInPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

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
