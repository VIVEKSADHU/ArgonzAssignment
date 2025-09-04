export type User = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
};

export type Message = {
  id: string;
  sender: User;
  text: string;
  timestamp: string;
  read: boolean;
  isSender: boolean;
  image?: string;
};

export type Chat = {
  id: string;
  user: User;
  messages: Message[];
  lastMessage: {
    text: string;
    time: string;
    unread?: boolean;
    isSender?: boolean;
  };
};

const users: User[] = [
  { id: '1', name: 'Angelie Crison', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', online: true },
  { id: '2', name: 'Jakob Saris', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', online: false },
  { id: '3', name: 'Emery Korsgard', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d', online: true },
  { id: '4', name: 'Jeremy Zucker', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d', online: false },
  { id: '5', name: 'Nadia Lauren', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d', online: true },
  { id: '6', name: 'Jason Statham', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d', online: false },
  { id: '7', name: 'Angel Kimberly', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026711d', online: true },
  { id: '8', name: 'Jason Momoa', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026712d', online: false },
];

export const chats: Chat[] = [
  {
    id: '1',
    user: users[0],
    lastMessage: { text: "Thank you very much. I'm glad...", time: '1m Ago', unread: true },
    messages: [
      { id: '1', sender: users[0], text: 'Yes sure. Any problem with your assignment?', timestamp: 'Today 11:53', read: true, isSender: false },
      { id: '2', sender: { id: '0', name: 'You', avatar: '', online: true }, text: 'Morning Angelie, I have question about My Task', timestamp: 'Today 11:52', read: true, isSender: true },
      { id: '3', sender: { id: '0', name: 'You', avatar: '', online: true }, text: 'How to make a responsive display from the dashboard?', timestamp: 'Today 11:52', read: true, isSender: true, image: 'https://picsum.photos/600/400' },
      { id: '4', sender: { id: '0', name: 'You', avatar: '', online: true }, text: 'Is there a plugin to do this task?', timestamp: 'Today 11:52', read: true, isSender: true },
      { id: '5', sender: users[0], text: 'No plugins. You just have to make it smaller according to the size of the phone.', timestamp: 'Today 11:53', read: true, isSender: false },
      { id: '6', sender: users[0], text: "Thank you very much. I'm glad you asked about the assignment", timestamp: 'Today 11:53', read: true, isSender: false },
    ],
  },
  {
    id: '2',
    user: users[1],
    lastMessage: { text: "You: Sure! let me tell you about w...", time: '2m Ago', isSender: true },
    messages: [],
  },
  {
    id: '3',
    user: users[2],
    lastMessage: { text: "Thank's. You are very helpful...", time: '3m Ago', unread: true },
    messages: [],
  },
  {
    id: '4',
    user: users[3],
    lastMessage: { text: 'You: Sure! let me teach you about...', time: '4m Ago', isSender: true },
    messages: [],
  },
  {
    id: '5',
    user: users[4],
    lastMessage: { text: 'Is there anything I can help? Just...', time: '5m Ago' },
    messages: [],
  },
  {
    id: '6',
    user: users[5],
    lastMessage: { text: 'You: Sure! let me share about...', time: '6m Ago', isSender: true },
    messages: [],
  },
  {
    id: '7',
    user: users[6],
    lastMessage: { text: 'Okay. I know very well about t...', time: '7m Ago', unread: true },
    messages: [],
  },
  {
    id: '8',
    user: users[7],
    lastMessage: { text: 'You: Sure! let me tell you about...', time: '7m Ago', isSender: true },
    messages: [],
  },
];
