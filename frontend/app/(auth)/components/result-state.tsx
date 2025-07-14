import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ResultState({
  image = '/assets/auth/check.gif',
  alt = 'Checkmark',
  name,
  isLoading = false,
  showButton = true,
}: {
  image?: string;
  alt?: string;
  name: string;
  isLoading?: boolean;
  showButton?: boolean;
}) {
  return (
    <div className='w-full h-full md:w-[404px] flex flex-col justify-center items-center gap-3'>
      <Image
        src={image}
        alt={alt}
        width={150}
        height={150}
        unoptimized
      />

      <div className='flex flex-col items-center gap-3'>
        <p className='font-medium'>{name}</p>

        {isLoading ? (
          <div className='w-5 h-5 border-4 border-primary-600 border-t-transparent rounded-full animate-spin' />
        ) : (
          showButton && (
            <Button
              asChild
              className='w-fit h-fit'
              disabled={isLoading}
            >
              <Link
                href='/sign-in'
                className='text-sm'
              >
                Sign In
              </Link>
            </Button>
          )
        )}
      </div>
    </div>
  );
}
