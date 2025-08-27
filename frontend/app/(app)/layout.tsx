import { SidebarProvider } from '@/components/ui/sidebar';
import { AuthHeaderProvider } from '@/provider/auth-header-provider';
import DashboardSidebar from './_sections/dashboard-sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthHeaderProvider>
      <SidebarProvider className='bg-grey-50 flex justify-center'>
        <DashboardSidebar />

        <main className='relative container w-full min-h-screen overflow-x-hidden'>{children}</main>
      </SidebarProvider>
    </AuthHeaderProvider>
  );
}
