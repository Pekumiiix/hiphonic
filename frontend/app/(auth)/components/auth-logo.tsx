import Image from 'next/image';
import { cn } from '@/lib/utils';

export function AuthLogo({
  image = '/assets/logo.png',
  type = 'pages',
}: {
  image?: string;
  type?: 'layout' | 'pages';
}) {
  return (
    <div
      className={cn('w-full items-center gap-2 xl:gap-[11px]', {
        'flex md:hidden': type === 'pages',
        flex: type === 'layout',
      })}
    >
      <Image
        src={image}
        alt='Logo'
        width={23}
        height={23}
        className='size-[23px] xl:size-[33px]'
      />
      <p className='text-[19px] xl:text-[22px] font-bold leading-[125%] xl:-tracking-[0.35px] text-grey-900 md:text-primary-foreground'>
        Hiphonic
      </p>
    </div>
  );
}
