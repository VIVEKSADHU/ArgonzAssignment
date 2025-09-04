import { ChatList } from "@/components/chat-list";
import { ChatView } from "@/components/chat-view";
import { chats } from "@/lib/data";

export default function MessagesPage() {
  const selectedChat = chats[0];
  return (
    <>
      <ChatList chats={chats} selectedChatId={selectedChat.id} />
      <ChatView chat={selectedChat} />
    </>
  );
}
