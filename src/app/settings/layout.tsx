import { MessageSidebar } from '@/components/message-sidebar';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background">
      <MessageSidebar />
      {children}
    </div>
  );
}
