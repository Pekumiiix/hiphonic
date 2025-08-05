import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function OverlappingPfps({
  className = 'size-8 lg:size-12',
  avatars,
  maxVisible,
  margin = '-ml-2 lg:-ml-5',
}: IOverlappingPfpsProps) {
  return (
    <div className='flex gap-0'>
      {avatars.slice(0, maxVisible).map((item, index) => (
        <Avatar
          key={item.username}
          title={item.username}
          className={cn('border-2 border-white', index !== 0 && margin, className)}
        >
          <AvatarImage
            src={item.src}
            className='size-10 rounded-full'
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}

      <div
        className={cn(
          'flex items-center justify-center bg-grey-100 border-2 border-white text-xs font-medium leading-[160%] text-grey-900 rounded-full z-50',
          className,
          margin,
        )}
      >
        +{avatars.length - maxVisible}
      </div>
    </div>
  );
}

interface IOverlappingPfpsProps {
  className?: string;
  avatars: { username: string; src: string }[];
  maxVisible: number;
  margin?: string;
}
