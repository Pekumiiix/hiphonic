"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BaseCheckbox } from "@/components/reuseable/base-checkbox";
import { FormBase, FormField } from "@/components/reuseable/base-form";
import { globalToasts } from "@/lib/toasts";
import { useAuth } from "@/provider/auth-provider";
import { AuthInput } from "../../components/auth-input";
import { ConfirmationButton } from "../../components/confirmation-button";
import { PasswordInput } from "../../components/password-input";
import { defaultSignInValue, signInSchema } from "../schema";

export default function SignInForm() {
  const { signIn } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: defaultSignInValue,
  });

  function setAuthTokenCookie(token: string, days = 30) {
    Cookies.set("auth_token", token, {
      expires: days,
      path: "/",
      sameSite: "lax",
    });
  }

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    signIn.mutate(data, {
      onSuccess: (data) => {
        setAuthTokenCookie(data.token);
        router.push("/dashboard");
      },
      onError: (data) => {
        if (data.message === "Something went wrong.") {
          globalToasts.globalError(data.message);
        } else {
          form.setError("email", { type: "server" });
          form.setError("password", { type: "server", message: data.message });
        }
      },
    });
  }

  return (
    <FormBase form={form} onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <AuthInput form={form} name="email" placeholder="Email" Icon={Mail} />

        <PasswordInput
          description="Your password must have at least 8 characters"
          form={form}
          name="password"
        />

        <div className="flex items-center justify-between">
          <FormField form={form} showError showMessage name="rememberMe">
            {(field) => (
              <BaseCheckbox id="yes" {...field} labelText="Remember me" />
            )}
          </FormField>

          <Link
            href="/reset-password"
            className="text-sm font-bold leading-[160%] text-primary-600"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <ConfirmationButton isLoading={signIn.isPending} name="Sign In" />
    </FormBase>
  );
}
