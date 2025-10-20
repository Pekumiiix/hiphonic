import { OverlappingPfps } from '@/components/shared/overlapping-pfps';
import { cn } from '@/lib/utils';
import { ShareButton } from '../component/share-button';

export default function ProjectNav({ variant = 'desktop', projectName }: IProjectNav) {
  return (
    <>
      {variant === 'desktop' ? (
        <header className='w-full hidden md:flex justify-center'>
          <nav className='container w-full h-20 flex items-center justify-between bg-white px-8 border-b border-grey-100 md:border-l-2'>
            <ProjectDetails />

            <div className='flex items-center gap-6'>
              <ShareButton projectName={projectName} />

              <Team />
            </div>
          </nav>
        </header>
      ) : (
        <div className='w-full flex md:hidden justify-between bg-white px-4 py-[18px] rounded-xl'>
          <div className='flex flex-col gap-4'>
            <ProjectDetails />
            <Team variant='mobile' />
          </div>

          <ShareButton projectName={projectName} />
        </div>
      )}
    </>
  );
}

function ProjectDetails() {
  return (
    <div className='flex gap-4'>
      <div className='size-12 rounded-xl bg-algal-50 flex items-center justify-center'>
        <div className='size-4 bg-algal-500 rounded-full' />
      </div>

      <div className='flex flex-col gap-1'>
        <p className='md:text-lg font-bold md:leading-[140%] tracking-[0.2px] text-grey-900'>
          Hiphonic App
        </p>
        <p className='text-xs text-grey-500 leading-[160%]'>Add Details</p>
      </div>
    </div>
  );
}

function Team({ variant }: IVariant) {
  return (
    <div
      className={cn({
        'md:hidden': variant === 'mobile',
        'max-md:hidden': variant === 'desktop',
      })}
    >
      <OverlappingPfps
        maxVisible={4}
        avatars={[
          { username: 'OU', src: 'https://github.com/shadcn.png' },
          { username: 'TU', src: 'https://github.com/shadcn.png' },
          { username: 'RU', src: 'https://github.com/shadcn.png' },
          { username: 'YU', src: 'https://github.com/shadcn.png' },
          { username: 'UU', src: 'https://github.com/shadcn.png' },
          { username: 'PU', src: 'https://github.com/shadcn.png' },
        ]}
      />
    </div>
  );
}

interface IVariant {
  variant?: 'mobile' | 'desktop';
}

interface IProjectNav {
  projectName: string;
  variant?: IVariant['variant'];
}
