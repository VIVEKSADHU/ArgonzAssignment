'use client';
import Link from 'next/link';
import {
  LayoutGrid,
  ClipboardCheck,
  Users,
  MessageSquare,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Overview', icon: LayoutGrid, href: '#' },
  { name: 'Task', icon: ClipboardCheck, href: '#' },
  { name: 'Mentors', icon: Users, href: '#' },
  { name: 'Message', icon: MessageSquare, href: '/messages' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export function MessageSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-white p-4 flex flex-col justify-between border-r">
      <div>
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-md"></div>
          <span className="font-bold text-xl">DNX</span>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
        <div className="w-10 h-10 bg-gray-600 rounded-full mx-auto mb-3 flex items-center justify-center">
          <HelpCircle className="h-6 w-6" />
        </div>
        <h3 className="font-bold">Help Center</h3>
        <p className="text-sm text-gray-300 mt-1 mb-3">
          Having Trouble in Learning. Please contact us for more questions.
        </p>
        <Button
          variant="secondary"
          className="bg-gray-700 hover:bg-gray-600 text-white w-full"
        >
          Go To Help Center
        </Button>
      </div>
    </aside>
  );
}
