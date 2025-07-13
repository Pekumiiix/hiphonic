import { Button } from '@/components/ui/button';

export function ConfirmationButton({
  name,
  action,
  type = 'submit',
  isLoading = false,
  disabled = false,
}: IConfirmationButtonProps) {
  return (
    <Button
      onClick={action}
      disabled={isLoading || disabled}
      type={type}
      className='w-full h-12 xl:h-14 rounded-[12px] text-base font-bold leading-[140%] tracking-[0.2px]'
    >
      {isLoading ? (
        <div className='w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin' />
      ) : (
        name
      )}
    </Button>
  );
}

interface IConfirmationButtonProps {
  name: string;
  action?: () => void;
  type?: 'submit' | 'button';
  isLoading?: boolean;
  disabled?: boolean;
}
