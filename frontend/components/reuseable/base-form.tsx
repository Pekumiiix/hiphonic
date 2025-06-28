/**
 * A collection of form components built on top of react-hook-form and shadcn/ui Form.
 * Provides a consistent way to handle form validation, error states, and form layout.
 *
 * @example
 * ```tsx
 * const form = useForm<FormValues>()
 *
 * return (
 *   <FormBase form={form} onSubmit={handleSubmit}>
 *     <FormField
 *       form={form}
 *       name="email"
 *       label="Email"
 *       description="Enter your email address"
 *       showMessage
 *     >
 *       <Input type="email" />
 *     </FormField>
 *
 *     <FormFooter>
 *       <Button type="submit">Submit</Button>
 *     </FormFooter>
 *   </FormBase>
 * )
 * ```
 */
import React, { type ReactNode } from "react";
import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import type {
  FieldValues,
  Path,
  UseFormReturn,
  FieldErrors,
  ControllerRenderProps,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { get } from "react-hook-form";

export interface FormBaseProps<T extends FieldValues> {
  /** React Hook Form instance */
  form: UseFormReturn<T>;
  /** Form submission handler */
  onSubmit: (data: T) => void;
  /** Form content */
  children: ReactNode;
  /** Additional CSS classes for the form */
  className?: string;
}

/**
 * Base form component that wraps react-hook-form and shadcn/ui Form.
 * Handles form submission and provides form context to child components.
 */
export function FormBase<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormBaseProps<T>) {
  function onError(errors: FieldErrors<T>) {
    console.log("Form validation failed!");
    console.log("Validation errors:", errors);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className={cn(className)}
      >
        {children}
      </form>
    </Form>
  );
}

interface FormFieldProps<TFormValues extends FieldValues> {
  /** React Hook Form instance for form management and validation */
  form: UseFormReturn<TFormValues>;
  /** Field name/path within the form data structure */
  name: Path<TFormValues>;
  /** Render function that receives field props and metadata */
  children: (
    field: Partial<ControllerRenderProps>,
    meta: {
      /** Field validation error object */
      error: FieldErrors<TFormValues>[Path<TFormValues>];
      /** Whether the field is valid (touched, no errors, and has value) */
      isValid: boolean;
    }
  ) => React.ReactNode;
  /** Optional label text to display above the field */
  label?: string;
  /** Optional description text to display below the field */
  description?: string;
  /** Whether to show validation errors (default: true) */
  showError?: boolean;
  /** Whether to show the form message component (default: true) */
  showMessage?: boolean;
}

export function FormField<TFormValues extends FieldValues>({
  form,
  name,
  children,
  label,
  description,
  showError = true,
  showMessage = true,
}: FormFieldProps<TFormValues>) {
  const error = get(form.formState.errors, name);
  const touched = get(form.formState.touchedFields, name);
  const value = form.watch(name);
  const isValid = touched && !error && value;

  return (
    <ShadcnFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{children(field, { error, isValid })}</FormControl>
          {description && (
            <FormDescription className="text-xs text-grey-500 leading-[150%]">
              {description}
            </FormDescription>
          )}
          {showError && showMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
