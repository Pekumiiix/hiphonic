import { LoaderCircle } from 'lucide-react';
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
        <LoaderCircle
          size={20}
          color='#ffffff'
          className='animate-spin'
        />
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
