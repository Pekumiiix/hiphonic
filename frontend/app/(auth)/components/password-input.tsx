"use client";

import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormField } from "../../../components/reuseable/base-form";
import { Input } from "../../../components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { get } from "react-hook-form";

export function PasswordInput<T extends FieldValues>({
  name,
  form,
  description,
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const error = get(form.formState.errors, name);
  const touched = get(form.formState.touchedFields, name);
  const value = form.watch(name);

  const isValid = touched && !error && value;

  return (
    <FormField
      form={form}
      name={name}
      description={description}
      showError
      showMessage
    >
      <div className="relative w-full h-fit">
        <Lock size={24} className="absolute text-grey-400 left-4 top-4" />
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "h-14 rounded-[12px] py-2 pl-[52px] pr-4 text-base font-normal border-grey-200 leading-[160%] placeholder:text-grey-400 shadow-none focus-visible:ring-0 focus-visible:border-primary-600 transition-colors duration-200",
            { "border-grey-200 hover:border-primary-600": !error },
            { "border-glamour-pink-500": error },
            { "border-algal-500": isValid }
          )}
          placeholder="Password"
        />
        <Button
          onClick={() => setShowPassword(!showPassword)}
          variant="ghost"
          className="absolute p-1 w-fit h-fit hover:bg-transparent top-4 right-4"
        >
          {showPassword ? (
            <Eye size={24} className="text-grey-400" />
          ) : (
            <EyeOff size={24} className="text-grey-400" />
          )}
        </Button>
      </div>
    </FormField>
  );
}

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  form: UseFormReturn<T>;
  description?: string;
}
