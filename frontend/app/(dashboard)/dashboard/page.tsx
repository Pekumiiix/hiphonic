import { Calendar } from '@/components/ui/calendar';
import ActivitySummary from './sections/activity-summary';
import DashboardNav from './sections/dashboard-nav';
import NotificationsCard from './sections/notifications';
import RecentProjects from './sections/recents-projects';
import TaskSummary from './sections/task-summary';
import TodaysTasks from './sections/todays-tasks';

export default function DashboardPage() {
  return (
    <>
      <DashboardNav />

      <section className='w-full grid grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-8 py-6'>
        <div className='w-full h-fit col-span-2 flex flex-col md:grid grid-col-2 justify-center gap-6'>
          <RecentProjects />
          <ActivitySummary />
          <TaskSummary />
          <div className='col-span-2 xl:hidden grid md:grid-cols-2 gap-6'>
            <Calendar
              mode='single'
              className='w-full rounded-xl'
            />
            <NotificationsCard />
          </div>
          <TodaysTasks />
        </div>

        <div className='hidden xl:flex flex-col gap-6'>
          <Calendar
            mode='single'
            className='w-full rounded-xl'
          />
          <NotificationsCard />
        </div>
      </section>
    </>
  );
}
