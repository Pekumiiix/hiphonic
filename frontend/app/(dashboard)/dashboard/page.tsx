import type { Metadata } from 'next';
import { Calendar } from '@/components/ui/calendar';
import ActivitySummary from './sections/activity-summary';
import DashboardNav from './sections/dashboard-nav';
import NotificationsCard from './sections/notifications';
import RecentProjects from './sections/recents-projects';
import TaskSummary from './sections/task-summary';
import TodaysTasks from './sections/todays-tasks';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'View your project activity, recent projects, tasks, and notifications in your Hiphonic dashboard. Stay organized and up-to-date with your team’s progress.',
  keywords: [
    'Dashboard',
    'Project Management',
    'Tasks',
    'Activity',
    'Notifications',
    'Hiphonic',
    'Team Collaboration',
    'Productivity',
  ],
  openGraph: {
    title: 'Dashboard | Hiphonic',
    description:
      'Your Hiphonic dashboard: track project activity, manage tasks, and stay updated with notifications.',
    url: 'https://hiphonic-blue.vercel.app/dashboard',
    siteName: 'Hiphonic',
    images: [
      {
        url: '/assets/logo.png',
        width: 512,
        height: 512,
        alt: 'Hiphonic Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Dashboard | Hiphonic',
    description:
      'Your Hiphonic dashboard: track project activity, manage tasks, and stay updated with notifications.',
    images: ['/assets/logo.png'],
  },
};

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
