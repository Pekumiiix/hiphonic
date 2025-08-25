import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <LoaderCircle
        size={100}
        className='text-primary-600 animate-spin'
      />
    </div>
  );
}
