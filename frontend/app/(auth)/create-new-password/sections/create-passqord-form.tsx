"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormBase } from "@/components/reuseable/base-form";
import { PasswordInput } from "../../components/password-input";
import { ConfirmationButton } from "../../components/confirmation-button";

const createPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Provide a valid password." })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string({
      required_error: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function CreateNewPasswordForm() {
  const form = useForm<z.infer<typeof createPasswordSchema>>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof createPasswordSchema>) {
    console.log(data);
  }

  return (
    <FormBase form={form} onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <PasswordInput form={form} name="password" />
        <PasswordInput
          form={form}
          name="confirmPassword"
          placeholder="Confirm password"
        />
      </div>

      <ConfirmationButton name="Continue" />
    </FormBase>
  );
}
