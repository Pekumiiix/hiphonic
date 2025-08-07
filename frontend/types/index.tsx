export interface INotifications {
  type: 'success' | 'user' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface IProjects {
  id: string;
  name: string;
}

export type TCategory = 'development' | 'design' | 'planning';

export interface ITaskCardProps {
  image?: string;
  category: TCategory;
  title: string;
  description: string;
  comment: number;
  due_date: string;
}

export interface ITaskProps {
  title: string;
  category: TCategory;
  description: string;
  comment: number;
  due_date: string;
  status: 'to-do' | 'in-progress' | 'in-review' | 'done';
}
