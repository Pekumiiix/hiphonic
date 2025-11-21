import { cn } from '@/lib/utils';
import { BaseAvatar } from '../reuseable/base-avatar';
import { Button } from '../ui/button';

export function OverlappingPfps({
  className = 'size-8 lg:size-12',
  avatars,
  maxVisible,
  margin = '-ml-2 lg:-ml-5',
  onClick,
}: IOverlappingPfpsProps) {
  return (
    <Button
      onClick={onClick}
      className='flex gap-0 p-0 w-fit h-fit bg-transparent hover:bg-transparent shadow-none'
    >
      {avatars.slice(0, maxVisible).map((item, index) => (
        <BaseAvatar
          key={item.username}
          username={item.username}
          avatar={item.src}
          classNames={{
            avatar: `border-2 border-white ${className} ${index !== 0 ? margin : ''}`,
            image: 'size-full',
          }}
        />
      ))}

      {avatars.length > maxVisible && (
        <span
          className={cn(
            `flex items-center justify-center bg-grey-100 border-2 border-white text-xs font-medium leading-[160%] text-grey-900 rounded-full z-50 ${onClick ? 'hover:bg-grey-300' : ''}`,
            className,
            margin,
          )}
        >
          +{avatars.length - maxVisible}
        </span>
      )}
    </Button>
  );
}

interface IOverlappingPfpsProps {
  className?: string;
  avatars: { username: string; src: string }[];
  maxVisible: number;
  margin?: string;
  onClick?: () => void;
}
