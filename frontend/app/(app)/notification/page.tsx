import {
  AlertCircle,
  CheckCircle,
  MessageCircle,
  PlusCircle,
  Target,
  UserPlus,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DashboardNav from '../shared/dashboard-nav';
import { NotificationCard } from './component/notification-card';

export default function NotificationPage() {
  return (
    <>
      <DashboardNav title='Notification' />

      <section className='w-full h-fit flex flex-col gap-6 border-t border-grey-100 py-6 max-md:px-4 md:py-10'>
        <ExampleNotificationCards />
      </section>
    </>
  );
}

function ExampleNotificationCards() {
  return (
    <div className='flex flex-col gap-3 max-w-2xl mx-auto'>
      {/* 1. Team invite */}
      <NotificationCard
        icon={<UserPlus size={20} />}
        title='Team Invitation'
        description={
          <>
            You have been invited to join{' '}
            <span className='font-semibold text-gray-900'>Acme Project</span> team by{' '}
            <span className='font-semibold text-gray-900'>Jane Doe</span>.
          </>
        }
        timestamp='5 min ago'
        unread
        action={
          <div className='flex gap-2'>
            <Button className='text-xs px-3 py-1.5 font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors'>
              Accept
            </Button>
            <Button className='text-xs px-3 py-1.5 font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors'>
              Decline
            </Button>
          </div>
        }
      />

      {/* 2. Task almost due */}
      <NotificationCard
        icon={<AlertCircle size={20} />}
        title='Task Deadline Approaching'
        description={
          <>
            The task{' '}
            <span className='font-semibold text-gray-900'>&quot;Design Homepage&quot;</span> is
            almost due. Please complete it by{' '}
            <span className='font-semibold text-gray-900'>today, 5:00 PM</span>.
          </>
        }
        timestamp='30 min ago'
        unread
      />

      {/* 3. New comment on project */}
      <NotificationCard
        icon={<MessageCircle size={20} />}
        title='New Comment on Project'
        description={
          <>
            <span className='font-semibold text-gray-900'>Alex Johnson</span> commented on{' '}
            <span className='font-semibold text-gray-900'>Acme Project</span>:{' '}
            <span className='italic text-gray-600'>
              &quot;Let&apos;s update the wireframes by Tuesday.&quot;
            </span>
          </>
        }
        timestamp='1 hr ago'
        unread
        action={
          <Link
            href='#'
            className='text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors'
          >
            View
          </Link>
        }
      />

      {/* 4. User joined team */}
      <NotificationCard
        icon={<Users size={20} />}
        title='New Team Member'
        description={
          <>
            <span className='font-semibold text-gray-900'>Samuel Lee</span> has joined your team{' '}
            <span className='font-semibold text-gray-900'>Acme Project</span>.
          </>
        }
        timestamp='2 hrs ago'
      />

      {/* 5. New task in project */}
      <NotificationCard
        icon={<PlusCircle size={20} />}
        title='New Task Created'
        description={
          <>
            A new task{' '}
            <span className='font-semibold text-gray-900'>&quot;Setup Google Analytics&quot;</span>{' '}
            has been created in <span className='font-semibold text-gray-900'>Acme Project</span>.
          </>
        }
        timestamp='3 hrs ago'
        unread
        action={
          <Link
            href='#'
            className='text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors'
          >
            View
          </Link>
        }
      />

      {/* 6. Task assigned to user */}
      <NotificationCard
        icon={<CheckCircle size={20} />}
        title='Task Assigned to You'
        description={
          <>
            You have been assigned to the task{' '}
            <span className='font-semibold text-gray-900'>&quot;Prepare Release Notes&quot;</span>{' '}
            in <span className='font-semibold text-gray-900'>Acme Project</span>.
          </>
        }
        timestamp='Yesterday'
        unread
      />

      {/* 7. Goal almost due */}
      <NotificationCard
        icon={<Target size={20} />}
        title='Goal Deadline Approaching'
        description={
          <>
            The goal <span className='font-semibold text-gray-900'>&quot;Launch Beta&quot;</span> is
            almost due. Finalize remaining tasks to meet the deadline.
          </>
        }
        timestamp='2 days ago'
      />
    </div>
  );
}
