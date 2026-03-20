import SidebarNav from '@/components/layout/SidebarNav';

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-frame-black">
      <SidebarNav />
      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
