import { DashboardHeader } from '@/components/dashboard-header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/50">
      <DashboardHeader userType="admin" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
