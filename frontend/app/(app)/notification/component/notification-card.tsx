import { cn } from '@/lib/utils';

export function NotificationCard({
  icon,
  title,
  description,
  timestamp,
  unread = false,
  action,
}: NotificationCardProps) {
  return (
    <div
      className={cn('flex items-start gap-4 p-4 rounded-lg border transition-all', {
        'bg-blue-50 border-blue-200 shadow-sm': unread,
        'bg-white border-gray-200 hover:border-gray-300': !unread,
      })}
    >
      <div
        className={cn('flex h-10 w-10 items-center justify-center rounded-lg shrink-0', {
          'bg-blue-100 text-blue-600': unread,
          'bg-gray-100 text-gray-500': !unread,
        })}
      >
        {icon}
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex-1'>
            <p
              className={cn('text-sm font-semibold leading-snug', {
                'text-gray-900': unread,
                'text-gray-800': !unread,
              })}
            >
              {title}
            </p>
            <p className='text-sm text-gray-600 mt-1 leading-relaxed'>{description}</p>
          </div>
          {unread && <div className='w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0' />}
        </div>

        <div className='flex items-center justify-between mt-3 gap-3'>
          <span className='text-xs text-gray-500'>{timestamp}</span>
          {action && <div className='flex gap-2'>{action}</div>}
        </div>
      </div>
    </div>
  );
}

interface NotificationCardProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  timestamp: string;
  unread?: boolean;
  action?: React.ReactNode;
}
