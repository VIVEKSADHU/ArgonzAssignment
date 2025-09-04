import { MessageSidebar } from "@/components/message-sidebar";

export default function MessagesLayout({
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
