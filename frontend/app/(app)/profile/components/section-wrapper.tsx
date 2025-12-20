import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ProfileSectionWrapper({ icon: Icon, title, children }: IProfileSectionWrapper) {
  return (
    <Card className='flex flex-col gap-6 border border-primary-200 bg-card p-3 pb-8'>
      <CardHeader className='flex items-center gap-2 border-b border-primary-200 p-4'>
        <Icon className='h-5 w-5 text-foreground' />
        <CardTitle className='text-foreground'>{title}</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-6 px-3'>{children}</CardContent>
    </Card>
  );
}

interface IProfileSectionWrapper {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}
