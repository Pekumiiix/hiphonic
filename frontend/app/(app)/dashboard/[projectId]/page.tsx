import { notFound } from 'next/navigation';
import { projects } from '@/mock-data/projects';
import DashboardNav from '../sections/dashboard-nav';
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
      <ProjectNav />

      <DashboardNav variant='mobile' />

      <section className='w-full h-fit flex flex-col gap-6 max-md:mt-6'>
        <div className='px-4 md:hidden'>
          <ProjectNav variant='mobile' />
        </div>

        <ProjectContent />
      </section>
    </>
  );
}
