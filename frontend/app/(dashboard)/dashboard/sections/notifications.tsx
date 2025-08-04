import { AlertCircle, CheckCircle, Info, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { notifications } from '@/mock-data/notification';

export default function NotificationsCard() {
  return (
    <div className='flex flex-col gap-4 p-4 md:py-5 md:px-6 rounded-xl bg-white'>
      <p className='font-bold text-grey-900 leading-[150%] tracking-[0.2px]'>Notifications</p>

      <Separator className='w-full border-grey-100' />

      <div className='flex flex-col gap-2'>
        {notifications.slice(0, 2).map((notification) => (
          <NotificationItem
            key={notification.title}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            timestamp={notification.timestamp}
            isRead={notification.isRead}
          />
        ))}
      </div>

      <Button
        variant='ghost'
        className='w-full h-12 text-sm font-bold leading-[160%] text-grey-900 hover:bg-grey-100'
      >
        See all
      </Button>
    </div>
  );
}

function NotificationItem({ isRead, title, type, message }: INotificationItemProps) {
  const Icon = notificationIcons[type];

  return (
    <div
      className={cn(
        'w-full flex items-start gap-3 p-4 rounded-[8px] hover:bg-gray-50 transition-colors cursor-pointer',
        !isRead && 'bg-grey-50',
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          notificationColors[type],
        )}
      >
        <Icon className='w-4 h-4' />
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex items-center justify-between gap-2'>
          <p
            className={cn('text-xs font-medium text-gray-900 truncate', !isRead && 'font-semibold')}
          >
            {title}
          </p>
          {!isRead && <div className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0' />}
        </div>
        <p className='text-xs text-gray-600 mt-1 line-clamp-2'>{message}</p>
      </div>
    </div>
  );
}

const notificationIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  user: User,
};

const notificationColors = {
  info: 'text-blue-500 bg-blue-100',
  success: 'text-green-500 bg-green-100',
  warning: 'text-amber-500 bg-amber-100',
  user: 'text-gray-500 bg-gray-100',
};

interface INotificationItemProps {
  type: 'info' | 'success' | 'warning' | 'user';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}
