import { AlertTriangle, LogOut } from 'lucide-react';
import { BaseAlertDialog } from '@/components/reuseable/base-alert-dialog';
import { BaseAvatar } from '@/components/reuseable/base-avatar';
import { Button } from '@/components/ui/button';

export function RemoveMemberDialog({ onConfirm }: IRemoveMemberDialog) {
  return (
    <BaseAlertDialog
      trigger={
        <Button className='size-6 rounded-[5px] text-grey-500 bg-transparent hover:text-black/80 hover:bg-red-300 shadow-none'>
          <LogOut className='text-inherit' />
        </Button>
      }
      icon={AlertTriangle}
      title='Remove Team Member'
      description='Are you sure you want to remove this member from the team?'
      cancelText='Cancel'
      actionText="Yes, I'm sure"
      onAction={onConfirm}
      classNames={{ content: 'w-[90%] md:w-[400px] gap-6' }}
    >
      <div className='flex items-center gap-3 p-4 rounded-lg border border-border bg-muted/50'>
        <BaseAvatar
          username='Pelumi Amao'
          avatar='https://github.com/shadcn.png'
        />
        <div className='flex-1 min-w-0'>
          <p className='font-semibold text-foreground'>Pelumi Amao</p>
          <p className='text-sm text-muted-foreground truncate'>Amaopelumi96@gmail.com</p>
          <p className='text-xs text-muted-foreground mt-0.5 capitalize'>Admin</p>
        </div>
      </div>

      <div className='text-sm text-muted-foreground space-y-1'>
        <p>This member will:</p>
        <ul className='list-disc list-inside space-y-1 ml-2'>
          <li>Lose access to all team resources</li>
          <li>Be removed from all team projects</li>
          <li>No longer receive team notifications</li>
        </ul>
      </div>
    </BaseAlertDialog>
  );
}

interface IRemoveMemberDialog {
  onConfirm: () => void;
}
