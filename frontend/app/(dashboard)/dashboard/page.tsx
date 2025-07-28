import { Calendar } from '@/components/ui/calendar';
import { ActivitySummary } from './sections/activity-summary';
import DashboardNav from './sections/dashboard-nav';
import RecentProjects from './sections/recents-projects';
import TaskSummary from './sections/task-summary';
import TodaysTasks from './sections/todays-tasks';

export default function DashboardPage() {
  return (
    <>
      <DashboardNav />

      <section className='w-full grid grid-cols-3 gap-6 px-8 py-6'>
        <RecentProjects />
        <Calendar
          mode='single'
          className='w-full rounded-xl'
        />
        <ActivitySummary />
        <TaskSummary />
        <TodaysTasks />
      </section>
    </>
  );
}
