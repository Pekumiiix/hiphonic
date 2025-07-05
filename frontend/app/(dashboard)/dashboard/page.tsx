export default function DashboardPage() {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-grey-900 font-bold text-[32px] leading-[125%] -tracking-[0.4px]'>
        Dashboard
      </h1>
      <p className='text-grey-600 font-normal text-base leading-[150%] -tracking-[0.2px]'>
        Welcome to your dashboard! Here you can manage your account, view statistics, and more.
      </p>
      {/* Add more dashboard components here */}
    </div>
  );
}
