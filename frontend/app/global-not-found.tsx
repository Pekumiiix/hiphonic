import { AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
};

export default function GlobalNotFound() {
  return (
    <html
      lang='en'
      className={inter.className}
    >
      <body className='w-full min-h-screen flex flex-col items-center justify-center bg-white px-4'>
        <div className='flex flex-col items-center gap-6 max-w-md w-full'>
          <span className='bg-grey-100 p-3 rounded-full mb-1'>
            <AlertTriangle
              className='text-grey-500'
              size={38}
              strokeWidth={1.5}
            />
          </span>
          <h1 className='text-2xl font-semibold text-grey-900 text-center'>404 – Page Not Found</h1>
          <p className='text-base text-grey-500 text-center'>
            Sorry, the page you’re looking for doesn’t exist or has been moved.
          </p>
          <Button
            asChild
            variant='default'
            className='w-full max-w-xs mt-2 text-base font-medium rounded-md'
          >
            <Link href='/dashboard'>Back to Dashboard</Link>
          </Button>
        </div>
      </body>
    </html>
  );
}
