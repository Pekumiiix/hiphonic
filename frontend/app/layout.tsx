import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GlobalLayout } from '@/components/custom/global-layout';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  variable: '--inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hiphonic',
  description: 'Project Manager',
  icons: '/assets/logo.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased flex justify-center`}>
        <GlobalLayout>{children}</GlobalLayout>
        <Toaster />
      </body>
    </html>
  );
}
