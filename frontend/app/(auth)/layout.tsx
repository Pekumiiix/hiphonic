import Image from 'next/image';
import { Ripple } from '@/components/magicui/ripple';
import { AuthLogo } from './components/auth-logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='container min-w-full min-h-screen h-fit flex bg-red-800'>
      <HiphonicDescriptionSection />

      <div className='w-full md:w-1/2 min-h-screen px-10 xl:pl-[164px] py-10 md:pt-[160px] md:pb-[104px] bg-background'>
        {children}
      </div>
    </section>
  );
}

function HiphonicDescriptionSection() {
  return (
    <div className='relative w-1/2 min-h-full bg-primary-600 hidden md:flex flex-col gap-[60px] p-12 px-10 xl:pr-[92px]'>
      <AuthLogo
        image='/assets/auth/white-logo.png'
        type='layout'
      />

      <div className='w-full h-full flex flex-col items-end justify-center gap-12'>
        <div className='relative overflow-hidden h-[524px] w-full xl:w-[500px] flex items-center justify-center'>
          <Ripple
            numCircles={7}
            mainCircleSize={100}
          />
          <Image
            src='/assets/auth/Illustration.png'
            alt='Logo'
            width={343}
            height={409}
            className='z-10 w-[256px] h-[306px] xl:w-[343px] xl:h-[409px]'
          />
        </div>

        <div className='flex flex-col gap-3 items-center'>
          <p className='text-[22px] xl:text-2xl font-bold leading-[125%] tracking-[0.2px] text-center text-primary-foreground'>
            Customizable Multipurpose Dashboard
          </p>
          <p className='text-sm text-center text-grey-50 leading-[160%]'>
            Everything you need in an easily customizable dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
