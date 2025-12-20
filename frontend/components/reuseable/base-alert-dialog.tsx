import type { LucideIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function BaseAlertDialog({
  open,
  setOpen,
  icon,
  title,
  trigger,
  description,
  children,
  actionText,
  cancelText,
  onAction,
  classNames,
}: IBaseAlertDialogProps) {
  const Icon = icon;

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className={classNames?.content}>
        <AlertDialogHeader className={classNames?.header}>
          <div className='flex items-center gap-2'>
            {Icon && (
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10'>
                <Icon className='h-5 w-5 text-destructive' />
              </div>
            )}

            <AlertDialogTitle className={classNames?.title}>{title}</AlertDialogTitle>
          </div>

          <AlertDialogDescription className={classNames?.description}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {children}

        <AlertDialogFooter className={classNames?.footer}>
          <AlertDialogCancel className={classNames?.cancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            className={classNames?.action}
            onClick={onAction}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface IBaseAlertDialogProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  trigger?: React.ReactNode;
  icon?: LucideIcon;
  title: string;
  description: React.ReactNode;
  children?: React.ReactNode;
  actionText: React.ReactNode;
  cancelText: string;
  onAction: () => void;
  classNames?: {
    content?: string;
    header?: string;
    title?: string;
    description?: string;
    footer?: string;
    action?: string;
    cancel?: string;
  };
}
