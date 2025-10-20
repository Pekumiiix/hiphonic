import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/mock-data/projects';
import AppNav from '../../shared/app-nav';
import ProjectContent from './sections/project-content';
import ProjectNav from './sections/project-nav';

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  const project = projects.find((project) => project.id === projectId);

  if (!project) {
    return notFound();
  }

  return (
    <>
      <ProjectNav projectName='Hiphonic' />

      <AppNav variant='mobile' />

      <section className='w-full h-fit flex flex-col gap-6 max-md:mt-6'>
        <div className='px-4 md:hidden'>
          <ProjectNav
            variant='mobile'
            projectName='Hiphonic'
          />
        </div>

        <ProjectContent />
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'View your project activity, recent projects, tasks, and notifications in your Hiphonic dashboard. Stay organized and up-to-date with your team’s progress.',
  keywords: [
    'Dashboard',
    'Project Management',
    'Tasks',
    'Activity',
    'Notifications',
    'Hiphonic',
    'Team Collaboration',
    'Productivity',
  ],
  openGraph: {
    title: 'Dashboard | Hiphonic',
    description:
      'Your Hiphonic dashboard: track project activity, manage tasks, and stay updated with notifications.',
    url: 'https://hiphonic-blue.vercel.app/dashboard',
    siteName: 'Hiphonic',
    images: [
      {
        url: '/assets/logo.png',
        width: 512,
        height: 512,
        alt: 'Hiphonic Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Dashboard | Hiphonic',
    description:
      'Your Hiphonic dashboard: track project activity, manage tasks, and stay updated with notifications.',
    images: ['/assets/logo.png'],
  },
};
