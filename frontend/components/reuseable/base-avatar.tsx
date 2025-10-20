import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

export function BaseAvatar({ username, avatar, classNames }: IBaseAvatar) {
  return (
    <Avatar
      title={username}
      className={classNames?.avatar}
    >
      <AvatarImage
        src={avatar || undefined}
        className={cn('object-center object-contain', classNames?.image)}
      />
      <AvatarFallback className='uppercase'>{username?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}

export function BaseAvatarSkeleton() {
  return <Skeleton className='rounded-full size-4 md:size-6 xl:size-8' />;
}

interface IBaseAvatar {
  username?: string;
  avatar?: string | null;
  classNames?: { avatar?: string; image?: string };
}
