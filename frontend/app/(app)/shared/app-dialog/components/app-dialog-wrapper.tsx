import { X } from 'lucide-react';
import { BaseDialog } from '@/components/reuseable/base-dialog';
import { DialogClose } from '@/components/ui/dialog';
import { DeleteConfirmationDialog } from '../delete-dialog';

export function AppDialogWrapper({
  trigger,
  title,
  description,
  children,
  space = 'Personal',
  open,
  setOpen,
  mode = 'create',
  onDelete,
  isDeleting = false,
  name,
  isTask = false,
}: IAppDialogWrapper) {
  return (
    <BaseDialog
      open={open}
      onClose={setOpen}
      trigger={trigger}
      title={title}
      description={description}
      className='w-full max-h-[90vh] md:w-[688px] lg:w-[700px] flex flex-col gap-8 overflow-y-scroll scrollbar-none'
    >
      <div className='flex items-center justify-between p-4 border-b border-grey-100'>
        <p className='h-10 flex items-center rounded-[8px] py-2 px-3 bg-grey-50 text-xs text-grey-500 leading-[160%] font-semibold'>
          Space &gt; {space}
        </p>

        <div className='flex items-center gap-2'>
          {mode === 'view' && (
            <DeleteConfirmationDialog
              onConfirm={onDelete}
              isDeleting={isDeleting}
              name={name || ''}
              isTask={isTask}
            />
          )}

          <DialogClose className='size-6 flex items-center justify-center hover:bg-grey-200 rounded-[5px]'>
            <X
              size={15}
              className='text-grey-500'
            />
          </DialogClose>
        </div>
      </div>

      {children}
    </BaseDialog>
  );
}

interface IAppDialogWrapper {
  trigger?: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  space?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  mode: 'view' | 'create';
  onDelete: () => Promise<void> | void;
  isDeleting?: boolean;
  isTask?: boolean;
  name?: string;
}
