'use client';

import { QueryStateHandler } from '@/components/shared/query-state-handler';
import { tasks } from '@/mock-data/tasks';
import DashboardNav from '../shared/dashboard-nav';
import TaskBoard from '../shared/task/task-board';
import { ErrorState } from './component/error-state';

export default function TasksPage() {
  const isError = true;

  return (
    <>
      <DashboardNav title='Tasks' />

      <QueryStateHandler
        isLoading={false}
        isError={isError}
        loading={<></>}
        error={<ErrorState onRetry={() => console.log('Retry')} />}
      >
        <section className='w-full h-fit flex flex-col gap-6 border-t border-grey-100 max-md:mt-6'>
          <TaskBoard
            tasks={tasks}
            className='md:border-l'
          />
        </section>
      </QueryStateHandler>
    </>
  );
}
