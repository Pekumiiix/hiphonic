'use client';

import { LogOut, Users } from 'lucide-react';
import { BaseAlertDialog } from '@/components/reuseable/base-alert-dialog';
import { Button } from '@/components/ui/button';
import { ProfileSectionWrapper } from '../components/section-wrapper';

export function TeamSection() {
  const teams = [
    { id: 1, name: 'Design Team', role: 'Member' },
    { id: 2, name: 'Development Team', role: 'Admin' },
    { id: 3, name: 'Marketing Team', role: 'Member' },
  ];

  return (
    <ProfileSectionWrapper
      icon={Users}
      title='Team'
    >
      <div className='space-y-3'>
        {teams.map((team) => (
          <div
            key={team.id}
            className='flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-accent/50 transition-colors'
          >
            <div className='space-y-1'>
              <p className='font-medium text-foreground'>{team.name}</p>
              <p className='text-sm text-muted-foreground'>{team.role}</p>
            </div>

            <LeaveTeamDialog />
          </div>
        ))}
      </div>
    </ProfileSectionWrapper>
  );
}

function LeaveTeamDialog() {
  return (
    <BaseAlertDialog
      trigger={
        <Button
          variant='ghost'
          size='sm'
          className='flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10'
        >
          <LogOut className='h-4 w-4' />
          Leave
        </Button>
      }
      title='Leave Team'
      description='Are you sure you want to leave this team? You will lose access to all team resources and projects.'
      actionText='Leave Team'
      cancelText='Cancel'
      onAction={() => {}}
      classNames={{
        content: 'w-[90%] md:!w-[400px] flex flex-col items-center',
        action: 'bg-destructive text-white hover:bg-destructive/90',
        header: 'flex flex-col items-center',
      }}
    />
  );
}
