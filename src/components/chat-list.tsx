import { Input } from "@/components/ui/input";
import { Search, CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Chat } from "@/lib/data";
import Link from "next/link";

type ChatListProps = {
  chats: Chat[];
  selectedChatId: string;
};

export function ChatList({ chats, selectedChatId }: ChatListProps) {
  return (
    <div className="w-96 flex-shrink-0 border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">Message</h2>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search Name" className="pl-10" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <Link href={`/messages/${chat.id}`} key={chat.id}>
            <div
              className={cn(
                "flex items-start gap-4 p-4 border-b cursor-pointer hover:bg-secondary",
                chat.id === selectedChatId && "bg-secondary"
              )}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{chat.user.name}</h3>
                  <p className="text-xs text-muted-foreground">{chat.lastMessage.time}</p>
                </div>
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage.text}</p>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                {chat.lastMessage.unread && (
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full mt-1"></div>
                )}
                 {!chat.lastMessage.unread && chat.lastMessage.isSender && (
                  <CheckCheck className="h-4 w-4 text-blue-500 mt-1" />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
