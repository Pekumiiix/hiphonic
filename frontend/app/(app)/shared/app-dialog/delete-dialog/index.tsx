import { AlertTriangle, LoaderCircle, Trash } from 'lucide-react';
import { BaseAlertDialog } from '@/components/reuseable/base-alert-dialog';
import { Button } from '@/components/ui/button';

export function DeleteConfirmationDialog({
  onConfirm,
  isDeleting,
  isTask,
  name,
}: IDeleteDialogProps) {
  return (
    <BaseAlertDialog
      trigger={
        <Button
          className='size-6 rounded-[5px] bg-transparent hover:bg-red-200 shadow-none'
          aria-label='Delete'
        >
          <Trash className='text-grey-500' />
        </Button>
      }
      icon={AlertTriangle}
      title={`Delete ${isTask ? 'Task' : 'Goals'}?`}
      description={
        <p>
          Are you sure you want to delete <strong className='text-black'>"{name}"</strong> This
          action cannot be undone and all {isTask ? 'task' : 'goals'} data will be permanently
          removed.
        </p>
      }
      actionText={isDeleting ? <LoadingSpinner /> : 'Delete'}
      cancelText='Cancel'
      onAction={onConfirm}
      classNames={{
        content: 'w-[90%] md:!w-[400px] gap-6',
        header: 'gap-1.5',
        action: 'bg-red-600 hover:bg-red-700 text-white',
        cancel: 'bg-transparent',
      }}
    >
      <></>
    </BaseAlertDialog>
  );
}

function LoadingSpinner() {
  return (
    <LoaderCircle
      size={20}
      className='text-white animate-spin'
    />
  );
}

interface IDeleteDialogProps {
  onConfirm: () => void;
  isDeleting: boolean;
  isTask?: boolean;
  name: string;
}
