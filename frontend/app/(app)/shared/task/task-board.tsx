'use client';

import { useMemo } from 'react';
import { BoardTaskCard, BoardTaskCardSkeleton } from '@/app/(app)/shared/task/board-task-card';
import { ListTaskCard, ListTaskCardSkeleton } from '@/app/(app)/shared/task/list-task-card';
import { TaskContentWrapper } from '@/app/(app)/shared/task/task-content-wrapper';
import { QueryStateHandler } from '@/components/shared/query-state-handler';
import type { ITaskCardProps, ITaskProps } from '@/types';
import { TaskBoardColumn } from './task-board-column';

export default function TaskBoard({ tasks, className }: ITaskBaord) {
  const isLoading = false;

  const taskMap = useMemo(() => {
    const map = new Map<TaskStatus, ITaskCardProps[]>(taskColumns.map((col) => [col.id, []]));

    for (const task of tasks) {
      const status = task.status as TaskStatus;
      const columnTasks = map.get(status);

      if (columnTasks) {
        columnTasks.push(task);
      }
    }
    return map;
  }, [tasks]);

  return (
    <TaskContentWrapper className={className}>
      {(display, activeTab) => (
        <>
          {taskColumns.map((item) => {
            const columnTasks = taskMap.get(item.id) || [];

            return (
              <TaskBoardColumn
                key={item.id}
                display={display}
                name={item.title as 'To Do' | 'In Progress' | 'In Review' | 'Done'}
              >
                <QueryStateHandler
                  isLoading={isLoading}
                  isError={false}
                  loading={
                    display === 'list' ? <ListTaskCardSkeleton /> : <BoardTaskCardSkeleton />
                  }
                  error={<></>}
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
              loading={<ListTaskCardSkeleton />}
              error={<></>}
            >
              <MobileListTaskView data={taskMap.get(activeTab as TaskStatus) || []} />
            </QueryStateHandler>
          )}
        </>
      )}
    </TaskContentWrapper>
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

function TaskCard({ item, display }: TaskCardProps) {
  return display === 'board' ? <BoardTaskCard {...item} /> : <ListTaskCard {...item} />;
}

const taskColumns = [
  { id: 'to-do', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'in-review', title: 'In Review' },
  { id: 'done', title: 'Done' },
];

type TaskStatus = (typeof taskColumns)[number]['id'];

interface ITaskBaord {
  tasks: ITaskProps[];
  className?: string;
}

interface TaskCardProps {
  item: ITaskCardProps;
  display: 'list' | 'board';
}
