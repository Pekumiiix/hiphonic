import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface CustomModalProps {
  /** Trigger element that opens the modal (usually a button) */
  trigger?: ReactNode;
  /** Modal title (visually hidden by default) */
  title: string;
  /** Modal description (visually hidden by default) */
  description: string;
  /** Modal content */
  children: ReactNode;
  /** Additional CSS classes for the modal */
  className?: string;
  /** Controlled open state */
  open?: boolean;
  /** Callback when modal closes */
  onClose?: (open: boolean) => void;
}

export function BaseDialog({
  trigger,
  title,
  description,
  children,
  open,
  onClose,
  className,
}: CustomModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.(open);
        }
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className='!max-w-[700px] w-[95%] md:w-fit [&>button]:hidden !p-0 rounded-[16px] border border-grey-50'>
        <VisuallyHidden>
          <DialogHeader className='w-full flex flex-col items-center justify-center font-input-mono'>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>

        <div className={className}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
