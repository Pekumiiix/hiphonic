import { FileX2, Plus } from 'lucide-react';
import { BaseUITabs } from '@/components/reuseable/base-ui-tabs';
import { Button } from '@/components/ui/button';
import { goals } from '@/mock-data/goals';
import type { IGoalCardProps } from '@/types';
import { CreateDialog } from '../shared/app-dialog/create-dialog';
import DashboardNav from '../shared/dashboard-nav';
import { GoalsCard } from './components/goals-card';

export default function GoalsPage() {
  const activeGoals = goals.filter((goal) => goal.status === 'active');
  const archivedGoals = goals.filter((goal) => goal.status === 'archived');
  const completedGoals = goals.filter((goal) => goal.status === 'completed');

  const tabs = [
    { value: 'active', label: 'Active', content: <TabContent data={activeGoals} /> },
    { value: 'completed', label: 'Completed', content: <TabContent data={archivedGoals} /> },
    { value: 'archived', label: 'Archived', content: <TabContent data={completedGoals} /> },
  ];

  return (
    <>
      <DashboardNav title='Goals' />

      <section className='w-full flex flex-col'>
        <BaseUITabs
          defaultValue='active'
          variant='button'
          tabs={tabs}
          classNames={{
            container: 'pl-0.5',
            wrapper: 'py-5 px-4 md:px-8 bg-white border-t border-grey-100',
            list: 'gap-2',
            trigger:
              'h-8 py-2 px-3 rounded-[8px] text-xs leading-[160%] text-grey-500 bg-transparent data-[selected]:bg-primary-50 data-[selected]:font-bold data-[selected]:text-primary-600',
            content: 'p-4 md:p-8',
          }}
        >
          <CreateDialog type='goal'>
            <Button className='flex items-center gap-2 py-2 px-6 rounded-[6px] text-xs text-white font-bold leading-[140%] bg-primary-600 shadow-[0px_8px_24px_0px_#1E40AF14] cursor-pointer'>
              <Plus size={16} /> New Goal
            </Button>
          </CreateDialog>
        </BaseUITabs>
      </section>
    </>
  );
}

function TabContent({ data }: { data: IGoalCardProps[] }) {
  if (data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 text-center'>
        <div className='mb-4 flex items-center justify-center'>
          <FileX2
            size={64}
            strokeWidth={1.5}
            className='text-grey-300 bg-grey-100 rounded-full p-4'
          />
        </div>
        <h2 className='text-lg font-bold mb-1 text-grey-800'>No goals found</h2>
        <p className='text-sm text-grey-500 mb-4'>
          You haven&lsquo;t created any goals in this section.
          <br />
          Click &ldquo;New Goal&ldquo; to get started!
        </p>
      </div>
    );
  }

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {data.map((goal) => (
        <GoalsCard
          key={goal.title}
          {...goal}
        />
      ))}
    </div>
  );
}
