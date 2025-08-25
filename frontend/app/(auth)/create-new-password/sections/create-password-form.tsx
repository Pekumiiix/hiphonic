"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { FormBase } from "@/components/reuseable/base-form";
import { authService } from "@/services/auth.service";
import { AuthLogo } from "../../components/auth-logo";
import { ConfirmationButton } from "../../components/confirmation-button";
import FormContainer from "../../components/form-container";
import { PasswordInput } from "../../components/password-input";
import { ResultState } from "../../components/result-state";
import { createPasswordSchema } from "../schema";

export default function CreateNewPasswordForm() {
  const [success, setSuccess] = useState<boolean>(false);

  return success ? (
    <div className="w-full h-full flex flex-col">
      <AuthLogo />
      <ResultState name="Successfully changed password." />
    </div>
  ) : (
    <CreatePasswordForm setSuccess={setSuccess} />
  );
}

function CreatePasswordForm({ setSuccess }: ICreatePasswordForm) {
  const router = useRouter();
  const searchParam = useSearchParams();

  const form = useForm<z.infer<typeof createPasswordSchema>>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { token: string; newPassword: string }) =>
      authService.createNewPassword(payload),
    onSuccess: (data) => {
      setSuccess(true);
      toast.success(data.message);
      router.push("/sign-in");
    },
    onError: () => {
      setSuccess(false);
      toast.error("Failed to update password. Try again.");
    },
  });

  const token = searchParam.get("token");

  if (!token || token === undefined) {
    router.push("/sign-in");
  }

  async function onSubmit(data: z.infer<typeof createPasswordSchema>) {
    const newPassword = data.password;
    mutate({ newPassword, token: token ?? "" });
  }

  return (
    <FormContainer headline="Create a new password">
      <FormBase form={form} onSubmit={onSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {["password" as const, "confirmPassword" as const].map((item) => (
            <PasswordInput key={item} form={form} name={item} />
          ))}
        </div>

        <ConfirmationButton isLoading={isPending} name="Continue" />
      </FormBase>
    </FormContainer>
  );
}

interface ICreatePasswordForm {
  setSuccess: (success: boolean) => void;
}
