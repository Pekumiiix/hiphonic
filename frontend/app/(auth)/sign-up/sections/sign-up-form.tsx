"use client";

import { useForm } from "react-hook-form";
import { signUpSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormBase, FormField } from "@/components/reuseable/base-form";
import { AuthInput } from "../../components/auth-input";
import { Mail, User } from "lucide-react";
import { PasswordInput } from "../../components/password-input";
import { BaseCheckbox } from "@/components/reuseable/base-checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ConfirmationButton } from "../../components/confirmation-button";

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    console.log(data);
  }

  return (
    <FormBase form={form} onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <AuthInput
          form={form}
          name="username"
          placeholder="Username"
          icon={
            <User
              size={24}
              className="size-[18px] xl:size-6 text-grey-400 absolute top-4 left-4"
            />
          }
        />

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
      </div>

      <FormField form={form} showError showMessage name="termsAccepted">
        {(field) => (
          <BaseCheckbox id="yes" {...field} label={<CheckboxLabel />} />
        )}
      </FormField>

      <ConfirmationButton name="Sign Up" />
    </FormBase>
  );
}

function CheckboxLabel() {
  return (
    <Label htmlFor="yes" className="text-xs leading-[160%] text-grey-500 ">
      <p>
        By creating an account means you agree to the{" "}
        <Link href="/" className="text-black font-semibold">
          Terms & Conditions
        </Link>{" "}
        and our{" "}
        <Link href="/" className="text-black font-semibold">
          Privacy Policy
        </Link>
      </p>
    </Label>
  );
}
