import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import env from '@/config/env';

export default function AlternativeAuthMethod({ type = 'sign-up' }: IAlternativeMethod) {
  return (
    <div className='w-full flex flex-col items-center gap-8'>
      <div className='w-full flex items-center justify-center gap-4'>
        <Separator className='max-w-1/3' />
        <p className='min-w-fit text-xs leading-[160%] text-grey-500'>
          Or {type === 'sign-up' ? 'sign up' : 'sign in'} with
        </p>
        <Separator className='max-w-1/3' />
      </div>
      <div className='w-full grid xl:grid-cols-2 gap-4'>
        {[
          {
            name: 'Google',
            img: '/assets/auth/google.png',
            alt: 'google logo',
            onClick: () => handleGoogleSignIn(),
          },
          {
            name: 'Facebook',
            img: '/assets/auth/facebook.png',
            alt: 'facebook logo',
            onClick: () => handleFacebookSignIn(),
          },
        ].map((item) => (
          <Button
            key={item.name}
            onClick={item.onClick}
            variant='outline'
            className='h-14 flex items-center gap-3 rounded-[12px] text-base font-semibold text-grey-900'
          >
            <Image
              src={item.img}
              alt={item.alt}
              width={20}
              height={20}
            />
            <span>{item.name}</span>
          </Button>
        ))}
      </div>
      <div className='w-fit flex gap-1'>
        <p className='text-black text-sm leading-[160%]'>
          {type === 'sign-up' ? 'Already have an account?' : 'Dont have an account?'}
        </p>
        <Link
          href={type === 'sign-up' ? '/sign-in' : '/sign-up'}
          className='text-sm font-bold text-primary-600 hover:text-primary-400 transition-colors duration-200'
        >
          {type === 'sign-up' ? 'Sign In' : 'Sign Up'}
        </Link>
      </div>
    </div>
  );
}

function handleGoogleSignIn() {
  window.location.href = `${env.apiUrl}/auth/google/redirect`;
}

function handleFacebookSignIn() {
  window.location.href = `${env.apiUrl}/auth/facebook/redirect`;
}

interface IAlternativeMethod {
  type?: 'sign-in' | 'sign-up';
}
