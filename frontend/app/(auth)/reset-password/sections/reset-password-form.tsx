"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormBase } from "@/components/reuseable/base-form";
import { Button } from "@/components/ui/button";
import { AuthInput } from "../../components/auth-input";
import { Mail } from "lucide-react";
import Link from "next/link";
import { ConfirmationButton } from "../../components/confirmation-button";

const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: "Provide a valid email address." })
    .email({ message: "Please enter a valid email address." }),
});

export default function ResetPasswordForm() {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    console.log(data);
  }

  return (
    <FormBase form={form} onSubmit={onSubmit} className="flex flex-col gap-8">
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

      <ConfirmationButton name="Continue" />

      <Button
        type="button"
        variant="ghost"
        className="w-full h-14 rounded-[12px] text-sm font-bold leading-[140%] tracking-[0.2px] text-primary-600 hover:text-primary-800"
        asChild
      >
        <Link href="/sign-in">Back to Sign In</Link>
      </Button>
    </FormBase>
  );
}
