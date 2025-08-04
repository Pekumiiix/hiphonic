export interface INotifications {
  type: 'success' | 'user' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const notifications: INotifications[] = [
  {
    type: 'success',
    title: 'Task Completed',
    message: 'Website Design project has been marked as complete',
    timestamp: '2 minutes ago',
    isRead: false,
  },
  {
    type: 'user',
    title: 'New Team Member',
    message: 'Sarah Johnson has joined the SEO Analytics project',
    timestamp: '1 hour ago',
    isRead: false,
  },
  {
    type: 'warning',
    title: 'Deadline Approaching',
    message: 'Hiphonic project deadline is in 2 days',
    timestamp: '3 hours ago',
    isRead: true,
  },
  {
    type: 'info',
    title: 'System Update',
    message: 'Dashboard has been updated with new features',
    timestamp: '1 day ago',
    isRead: true,
  },
];
