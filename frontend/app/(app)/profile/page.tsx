import DashboardNav from '../shared/dashboard-nav';
import { ProfileSection } from './sections/profile-section';
import { SecuritySection } from './sections/security-section';
import { TeamSection } from './sections/team-section';

export default function ProfilePage() {
  return (
    <>
      <DashboardNav title='Profile' />

      <div className='max-w-5xl mx-auto p-6 md:p-8 space-y-8'>
        {/* Profile Section */}
        <ProfileSection />

        {/* Security Section */}
        <SecuritySection />

        {/* Teams Section */}
        <TeamSection />
      </div>
    </>
  );
}
