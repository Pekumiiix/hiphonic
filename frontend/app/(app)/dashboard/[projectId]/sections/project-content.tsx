'use client';

import { tasks } from '@/mock-data/tasks';
import type { ITaskCardProps } from '@/types';
import ProjectColumn from './project-column';
import ProjectContentWrapper from './project-content-wrapper';
import { GridTaskCard, ListTaskCard } from './task-card';

const toDoTasks = tasks.filter((task) => task.status === 'to-do');
const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
const inReviewTasks = tasks.filter((task) => task.status === 'in-review');
const finishedTasks = tasks.filter((task) => task.status === 'done');

const sections = ['To Do', 'In Progress', 'In Review', 'Done'] as const;
const data = [toDoTasks, inProgressTasks, inReviewTasks, finishedTasks];

export default function ProjectContent() {
  return (
    <ProjectContentWrapper>
      {(display, activeTab) => (
        <>
          {sections.map((item, index) => (
            <ProjectColumn
              key={item}
              display={display}
              name={item}
            >
              {data[index].map((item) => (
                <TaskCard
                  key={item.title}
                  display={display}
                  item={item}
                />
              ))}
            </ProjectColumn>
          ))}

          {display === 'list' && <MobileListTaskView activeTab={activeTab} />}
        </>
      )}
    </ProjectContentWrapper>
  );
}

function MobileListTaskView({ activeTab }: { activeTab: Triggers }) {
  const taskMap: Record<string, ITaskCardProps[]> = {
    'to-do': toDoTasks,
    'in-progress': inProgressTasks,
    'in-review': inReviewTasks,
    done: finishedTasks,
  };

  const data: ITaskCardProps[] = taskMap[activeTab] ?? [];

  return (
    <div className='w-full flex flex-col gap-4 lg:hidden'>
      {data.map((item) => (
        <ListTaskCard
          key={item.title}
          {...item}
        />
      ))}
    </div>
  );
}

function TaskCard({ item, display }: TaskCardProps) {
  return display === 'board' ? <GridTaskCard {...item} /> : <ListTaskCard {...item} />;
}

type Triggers = 'to-do' | 'in-progress' | 'in-review' | 'done';

interface TaskCardProps {
  item: ITaskCardProps;
  display: 'list' | 'board';
}
