import { UserProvider } from '@/lib/context/UserContext';
import { FeedProvider } from '@/lib/context/FeedContext';
import { BookingProvider } from '@/lib/context/BookingContext';
import BottomNav from '@/components/layout/BottomNav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <FeedProvider>
        <BookingProvider>
          <div className="min-h-screen bg-frame-black">
            {children}
            <BottomNav />
          </div>
        </BookingProvider>
      </FeedProvider>
    </UserProvider>
  );
}
