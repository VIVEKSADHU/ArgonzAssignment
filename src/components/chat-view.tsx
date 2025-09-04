'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Phone, Send, Video } from "lucide-react";
import Image from "next/image";
import type { Chat } from "@/lib/data";
import { cn } from "@/lib/utils";

type ChatViewProps = {
    chat: Chat;
};

export function ChatView({ chat }: ChatViewProps) {
    return (
        <div className="flex-1 flex flex-col">
            <header className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                        <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="font-semibold">{chat.user.name}</h2>
                        <div className="flex items-center gap-1.5">
                            <div className={cn("w-2 h-2 rounded-full", chat.user.online ? 'bg-green-500' : 'bg-gray-400')}></div>
                            <p className="text-xs text-muted-foreground">{chat.user.online ? 'Online' : 'Offline'}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
                     <Avatar className="h-10 w-10">
                        <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704e" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="text-center text-xs text-muted-foreground my-4">Today</div>
                {chat.messages.map((message) => (
                    <div key={message.id} className={cn("flex items-end gap-3", message.isSender ? "justify-end" : "justify-start")}>
                        {!message.isSender && (
                             <Avatar className="h-8 w-8">
                                <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div className="max-w-md">
                            <div className={cn("p-3 rounded-lg", message.isSender ? "bg-primary text-primary-foreground" : "bg-secondary")}>
                                <p className="text-sm">{message.text}</p>
                                {message.image && (
                                     <Image src={message.image} alt="Sent image" width={300} height={200} className="mt-2 rounded-lg" data-ai-hint="dashboard screen" />
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 text-right">{message.timestamp}</p>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="p-4 border-t">
                <div className="relative">
                    <Input placeholder="Send your message..." className="pr-20" />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                        <Button variant="ghost" size="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg></Button>
                        <Button variant="ghost" size="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l.79-.79"></path></svg></Button>
                        <Button size="icon" className="w-8 h-8"><Send className="h-4 w-4" /></Button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
