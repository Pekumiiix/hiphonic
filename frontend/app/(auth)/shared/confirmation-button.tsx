import { SubmitButton } from '@/components/shared/submit-button';

export function ConfirmationButton({
  name,
  action,
  type = 'submit',
  isLoading = false,
  disabled = false,
}: IConfirmationButtonProps) {
  return (
    <SubmitButton
      action={action}
      disabled={disabled}
      isLoading={isLoading}
      name={name}
      type={type}
      className='w-full h-12 xl:h-14 rounded-[12px] text-base font-bold leading-[140%] tracking-[0.2px]'
    />
  );
}

interface IConfirmationButtonProps {
  name: string;
  action?: () => void;
  type?: 'submit' | 'button';
  isLoading?: boolean;
  disabled?: boolean;
}
