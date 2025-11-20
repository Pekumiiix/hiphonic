import { BaseAccordion } from '@/components/reuseable/base-accordion';
import { TaskDialogWrapper } from '../components/task-dialog-wrapper';
import { AccordionContent } from './components/accordion-content';
import { CommentInput } from './components/comment-input';
import { SelectStatus } from './components/select-status';
import { TaskComment } from './components/task-comment';

export function TaskDetailsDialog({ open = false, setOpen, mode = 'create' }: ITaskDetailsDialog) {
  return (
    <TaskDialogWrapper
      open={open}
      setOpen={setOpen}
      title='View Task Details'
      description='View and manage all details related to this task.'
      space='Hiphonic'
      mode={mode}
    >
      <div className='w-full flex flex-col gap-8 px-6 pb-10'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-[22px] text-grey-900 font-bold leading-[125%]'>Automated Goals</p>

          <SelectStatus />
        </div>

        <BaseAccordion
          collapsible
          type='single'
          defaultValue='details'
          items={[{ value: 'details', trigger: 'Details', content: <AccordionContent /> }]}
          classNames={{
            item: 'rounded-xl border border-grey-100',
            trigger:
              'text-xs font-bold text-grey-900 px-4 py-2.5 border-grey-100 data-[state=open]:border-b',
            content: 'min-h-fit p-2',
          }}
        />

        <div className='flex flex-col gap-[7px]'>
          <p className='text-grey-900 text-sm font-semibold leading-[160%]'>Description</p>
          <p className='text-xs leading-[160%] text-grey-500'>
            Analytics delivers actionable, industry-ready initiatives each time a business complete
            their full account. Phasellus vitae amet amet, mauris faucibus at sit. Pellentesque
            rhoncus adipiscing a enim, quis tortor, non etiam. Eget faucibus mattis consequat dui
            imperdiet scelerisque. Lorem placerat blandit ut lobortis volutpat convallis libero. Sed
            imperdiet dignissim ipsum quam.
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          <p className='text-sm font-semibold leading-[160%] text-grey-900'>Activity</p>

          <div className='flex flex-col gap-6'>
            <CommentInput />
            <TaskComment />
          </div>
        </div>
      </div>
    </TaskDialogWrapper>
  );
}

interface ITaskDetailsDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode?: 'view' | 'create';
}
