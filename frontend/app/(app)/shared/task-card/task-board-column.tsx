import { cn } from '@/lib/utils';
import { CreateTaskDialog } from '../task-dialog/create-task-dialog';

export function TaskBoardColumn({ name, children, display }: IProjectProps) {
  return (
    <div
      className={cn('flex flex-col', {
        'min-w-[246px] w-full md:w-[246px] gap-4 md:gap-6': display === 'board',
        'max-lg:hidden w-full gap-4': display === 'list',
      })}
    >
      <div
        className={cn('flex w-full items-center justify-between py-1', {
          'max-lg:hidden': display === 'list',
        })}
      >
        <p
          className='font-bold leading-[160%]'
          style={{ color: columnNameColor[name] }}
        >
          {name}
        </p>

        {name === 'To Do' && <CreateTaskDialog />}
        {/* <TaskDetailsDialog /> */}
      </div>

      <div className='w-full flex flex-col gap-4'>{children}</div>
    </div>
  );
}

const columnNameColor: Record<IProjectProps['name'], string> = {
  'To Do': '#0f172a',
  'In Progress': '#2563EB',
  'In Review': '#F6A723',
  Done: '#24d164',
};

interface IProjectProps {
  name: 'To Do' | 'In Progress' | 'In Review' | 'Done';
  children: React.ReactNode;
  display: 'list' | 'board';
}
