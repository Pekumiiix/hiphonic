import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormField } from "../../../components/reuseable/base-form";
import { Input } from "../../../components/ui/input";
import { cn } from "../../../lib/utils";
import { get } from "react-hook-form";

export function AuthInput<T extends FieldValues>({
  name,
  form,
  icon,
  placeholder,
}: InputProps<T>) {
  const error = get(form.formState.errors, name);
  const touched = get(form.formState.touchedFields, name);
  const value = form.watch(name);

  const isValid = touched && !error && value;

  return (
    <FormField form={form} name={name} showError showMessage>
      <div className="relative w-full h-fit">
        {icon}
        <Input
          className={cn(
            "h-14 rounded-[12px] py-2 pl-[52px] pr-4 text-base font-normal border-grey-200 leading-[160%] placeholder:text-grey-400 shadow-none focus-visible:ring-0 focus-visible:border-primary-600 transition-colors duration-200",
            { "border-grey-200 hover:border-primary-600": !error },
            { "border-glamour-pink-500": error },
            { "border-algal-500": isValid }
          )}
          placeholder={placeholder}
        />
      </div>
    </FormField>
  );
}

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  form: UseFormReturn<T>;
  icon: React.ReactNode;
  placeholder: string;
}
