import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

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

interface IBaseAvatar {
  username?: string;
  avatar?: string | null;
  classNames?: { avatar?: string; image?: string };
}
