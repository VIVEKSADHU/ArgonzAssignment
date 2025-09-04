import { ChatList } from "@/components/chat-list";
import { ChatView } from "@/components/chat-view";
import { chats } from "@/lib/data";

export default function ChatPage({ params }: { params: { id: string } }) {
  const selectedChat = chats.find((chat) => chat.id === params.id) ?? chats[0];

  return (
    <>
      <ChatList chats={chats} selectedChatId={selectedChat.id} />
      <ChatView chat={selectedChat} />
    </>
  );
}
