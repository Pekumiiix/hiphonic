import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from './sections/dashboard-sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className='bg-grey-50 flex justify-center'>
      <DashboardSidebar />

      <main className='relative container w-full min-h-screen'>{children}</main>
    </SidebarProvider>
  );
}
