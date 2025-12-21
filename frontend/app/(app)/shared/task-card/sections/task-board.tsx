'use client';

import { ListTodo } from 'lucide-react';
import { BoardTaskCard, BoardTaskCardSkeleton } from '@/app/(app)/shared/task-card/board-task-card';
import { ListTaskCard, ListTaskCardSkeleton } from '@/app/(app)/shared/task-card/list-task-card';
import { TaskContentWrapper } from '@/app/(app)/shared/task-card/sections/task-content-wrapper';
import { QueryStateHandler } from '@/components/shared/query-state-handler';
import type { Filter } from '@/components/ui/filters';
import { type TaskStatus, taskColumns, useTaskFiltering } from '@/hooks/use-task-filtering';
import { cn } from '@/lib/utils';
import type { ITaskCardProps, ITaskProps } from '@/types';
import { TaskBoardColumn } from './task-board-column';

export default function TaskBoard({ tasks, className }: ITaskBaord) {
  return (
    <TaskContentWrapper className={className}>
      {(display, activeTab, filters) => (
        <TaskBoardContent
          tasks={tasks}
          display={display}
          activeTab={activeTab}
          filters={filters}
        />
      )}
    </TaskContentWrapper>
  );
}

function TaskBoardContent({ tasks, display, activeTab, filters }: TaskBoardContentProps) {
  const isLoading = false;

  const taskMap = useTaskFiltering(tasks, filters);

  return (
    <>
      {taskColumns.map((col) => {
        const columnTasks = taskMap.get(col.id) || [];

        return (
          <TaskBoardColumn
            key={col.id}
            display={display}
            name={col.title as 'To Do' | 'In Progress' | 'In Review' | 'Done'}
          >
            <QueryStateHandler
              isLoading={isLoading}
              isEmpty={columnTasks.length === 0}
              isError={false}
              loading={display === 'list' ? <ListTaskCardSkeleton /> : <BoardTaskCardSkeleton />}
              error={<></>}
              empty={<EmptyState title={col.title} />}
            >
              {columnTasks.map((item) => (
                <TaskCard
                  key={item.title}
                  display={display}
                  item={item}
                />
              ))}
            </QueryStateHandler>
          </TaskBoardColumn>
        );
      })}

      {display === 'list' && (
        <QueryStateHandler
          isLoading={isLoading}
          isError={false}
          isEmpty={(taskMap.get(activeTab as TaskStatus)?.length || 0) === 0}
          loading={<ListTaskCardSkeleton />}
          error={<></>}
          empty={
            <EmptyState
              title={taskColumns.find((col) => col.id === activeTab)?.title || activeTab}
              className='lg:hidden'
            />
          }
        >
          <MobileListTaskView data={taskMap.get(activeTab as TaskStatus) || []} />
        </QueryStateHandler>
      )}
    </>
  );
}

function MobileListTaskView({ data }: { data: ITaskCardProps[] }) {
  return (
    <div className='w-full flex flex-col gap-4 lg:hidden'>
      {data.map((item) => (
        <ListTaskCard
          key={item.title}
          {...item}
        />
      ))}
    </div>
  );
}

function EmptyState({ title, className }: { title: string; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 h-fit border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200',
        className,
      )}
    >
      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4'>
        <ListTodo className='h-6 w-6 text-gray-400' />
      </div>

      <h3 className='text-sm font-semibold text-gray-900 mb-1'>{title}</h3>

      <p className='text-[13px] text-muted-foreground max-w-xs mx-auto'>
        No tasks available, check back later or create a new task
      </p>
    </div>
  );
}

function TaskCard({ item, display }: TaskCardProps) {
  return display === 'board' ? <BoardTaskCard {...item} /> : <ListTaskCard {...item} />;
}

interface ITaskBaord {
  tasks: ITaskProps[];
  className?: string;
}

interface TaskCardProps {
  item: ITaskCardProps;
  display: 'list' | 'board';
}

interface TaskBoardContentProps {
  tasks: ITaskProps[];
  display: 'list' | 'board';
  activeTab: string;
  filters: Filter[];
}
