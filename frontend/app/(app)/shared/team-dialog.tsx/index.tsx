import { X } from 'lucide-react';
import type React from 'react';
import { BaseDialog } from '@/components/reuseable/base-dialog';
import { DialogClose } from '@/components/ui/dialog';
import { TeamListItem } from './components/team-list-item';

export function TeamDialog({ open, setOpen, children }: ITeamDialog) {
  return (
    <BaseDialog
      open={open}
      onClose={setOpen}
      title=''
      description=''
      className='w-full max-h-[90vh] md:w-[400px] flex flex-col overflow-y-scroll scrollbar-none'
    >
      <div className='w-full flex justify-end border-b p-4 border-grey-100'>
        <DialogClose className='size-6 flex items-center justify-center hover:bg-grey-200 rounded-[5px]'>
          <X
            size={15}
            className='text-grey-500'
          />
        </DialogClose>
      </div>

      <div className='w-full flex flex-col gap-1.5 p-4'>
        <div className='w-full flex items-center gap-1.5 border-b pb-4 border-grey-100 overflow-x-scroll scrollbar-none'>
          {children}
        </div>

        <div className='flex flex-col gap-1.5 pt-4'>
          <TeamListItem />
          <TeamListItem />
          <TeamListItem />
        </div>
      </div>
    </BaseDialog>
  );
}

interface ITeamDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}
