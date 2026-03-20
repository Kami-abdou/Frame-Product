export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-frame-black overflow-hidden">
      {children}
    </div>
  );
}
