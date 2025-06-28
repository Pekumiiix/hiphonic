"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormBase, FormField } from "@/components/reuseable/base-form";
import { AuthInput } from "../../components/auth-input";
import { Mail } from "lucide-react";
import { PasswordInput } from "../../components/password-input";
import { signInSchema, defaultSignInValue } from "../schema";
import { BaseCheckbox } from "@/components/reuseable/base-checkbox";
import Link from "next/link";
import { ConfirmationButton } from "../../components/confirmation-button";

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: defaultSignInValue,
  });

  function onSubmit(data: z.infer<typeof signInSchema>) {
    console.log(data);
  }

  return (
    <FormBase form={form} onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <AuthInput
          form={form}
          name="email"
          placeholder="Email"
          icon={
            <Mail
              size={24}
              className="size-[18px] xl:size-6 text-grey-400 absolute top-4 left-4"
            />
          }
        />

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

      <ConfirmationButton name="Sign In" />
    </FormBase>
  );
}
