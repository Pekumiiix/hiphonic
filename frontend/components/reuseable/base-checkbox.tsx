import type { ControllerRenderProps } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export function BaseCheckbox({
  value,
  onChange,
  id,
  label,
  labelText,
}: {
  id: string;
  label?: React.ReactNode;
  labelText?: string;
} & Partial<ControllerRenderProps>) {
  return (
    <div className="flex gap-3">
      <Checkbox
        id={id}
        checked={value === id}
        onCheckedChange={() => {
          onChange?.(id);
        }}
        className="size-6"
      />

      {!labelText && label && label}

      {!label && labelText && (
        <Label
          htmlFor={id}
          className="text-sm font-medium leading-[160%] tracking-[0.2px] text-grey-900"
        >
          {labelText}
        </Label>
      )}
    </div>
  );
}
