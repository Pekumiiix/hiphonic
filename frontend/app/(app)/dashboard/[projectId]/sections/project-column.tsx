import { cn } from '@/lib/utils';
import { CreateTaskButton } from '../component/create-task-button';

export default function ProjectColumn({ name, children, display }: IProjectProps) {
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
          style={{ color: RenderColumnNameColor(name) }}
        >
          {name}
        </p>

        {name === 'To Do' && <CreateTaskButton />}
      </div>

      <div className='w-full flex flex-col gap-4'>{children}</div>
    </div>
  );
}

function RenderColumnNameColor(name: IProjectProps['name']) {
  if (name === 'In Progress') {
    return '#2563EB';
  }
  if (name === 'In Review') {
    return '#F6A723';
  }
  if (name === 'Done') {
    return '#24d164';
  }
  return '#0f172a';
}

interface IProjectProps {
  name: 'To Do' | 'In Progress' | 'In Review' | 'Done';
  children: React.ReactNode;
  display: 'list' | 'board';
}
