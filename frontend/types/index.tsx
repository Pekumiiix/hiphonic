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
