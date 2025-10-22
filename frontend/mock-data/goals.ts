import type { IGoalCardProps } from '@/types';

export const goals: IGoalCardProps[] = [
  {
    status: 'completed',
    category: 'sales',
    title: 'Grow Revenue in American',
    description:
      'Quis augue enim a magna feugiat massa, ligula. Proin libero vel in at hac. In ipsum, tempor velit, metus. Nibh dolor tortor quam volutpat sit.',
    createdAt: new Date('2021-10-01'),
    dueDate: new Date('2021-12-31'),
    team: [{ username: 'User 1', src: '/avatars/avatar-1.png' }],
  },
  {
    status: 'active',
    category: 'seo',
    title: 'Increase Website Traffic',
    description:
      'Quis augue enim a magna feugiat massa, ligula. Proin libero vel in at hac. In ipsum, tempor velit, metus. Nibh dolor tortor quam volutpat sit.',
    createdAt: new Date('2021-10-01'),
    dueDate: new Date('2021-12-31'),
    team: [
      { username: 'User 2', src: '/avatars/avatar-2.png' },
      { username: 'User 3', src: '/avatars/avatar-3.png' },
    ],
  },
  {
    status: 'active',
    category: 'marketing',
    title: 'Establish a solid Lead Gen Engine',
    description:
      'Quis augue enim a magna feugiat massa, ligula. Proin libero vel in at hac. In ipsum, tempor velit, metus. Nibh dolor tortor quam volutpat sit.',
    createdAt: new Date('2021-10-01'),
    dueDate: new Date('2021-12-31'),
    team: [{ username: 'User 1', src: '/avatars/avatar-1.png' }],
  },
  {
    status: 'active',
    category: 'engineering',
    title: 'Increase efficiency of QA process',
    description:
      'Quis augue enim a magna feugiat massa, ligula. Proin libero vel in at hac. In ipsum, tempor velit, metus. Nibh dolor tortor quam volutpat sit.',
    createdAt: new Date('2021-10-01'),
    dueDate: new Date('2021-12-31'),
    team: [
      { username: 'User 2', src: '/avatars/avatar-2.png' },
      { username: 'User 3', src: '/avatars/avatar-3.png' },
    ],
  },
  {
    status: 'active',
    category: 'marketing',
    title: 'Enhance Digital Marketing',
    description:
      'Quis augue enim a magna feugiat massa, ligula. Proin libero vel in at hac. In ipsum, tempor velit, metus. Nibh dolor tortor quam volutpat sit.',
    createdAt: new Date('2021-10-01'),
    dueDate: new Date('2021-12-31'),
    team: [
      { username: 'User 2', src: '/avatars/avatar-2.png' },
      { username: 'User 3', src: '/avatars/avatar-3.png' },
    ],
  },
  {
    status: 'completed',
    category: 'sales',
    title: 'Increase User Base',
    description:
      'Quis augue enim a magna feugiat massa, ligula. Proin libero vel in at hac. In ipsum, tempor velit, metus. Nibh dolor tortor quam volutpat sit.',
    createdAt: new Date('2021-10-01'),
    dueDate: new Date('2021-12-31'),
    team: [{ username: 'User 1', src: '/avatars/avatar-1.png' }],
  },
];
