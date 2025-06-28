import { Button } from "@/components/ui/button";

export function ConfirmationButton({
  name,
  action,
  type = "submit",
}: IConfirmationButtonProps) {
  return (
    <Button
      onClick={action}
      type={type}
      className="w-full h-12 xl:h-14 rounded-[12px] text-base font-bold leading-[140%] tracking-[0.2px]"
    >
      {name}
    </Button>
  );
}

interface IConfirmationButtonProps {
  name: string;
  action?: () => void;
  type?: "submit" | "button";
}
