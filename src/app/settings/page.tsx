'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex-1 bg-gray-50/50">
      <header className="p-4 border-b flex justify-between items-center bg-white">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://i.pravatar.cc/150?u=a042581f4e29026704e"
              alt="User"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="p-6">
        <Tabs defaultValue="general">
          <TabsList className="bg-transparent p-0 border-b-0 rounded-none">
            <TabsTrigger
              value="general"
              className="data-[state=active]:shadow-none data-[state=active]:border-b-2 border-b-primary rounded-none"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="notification"
              className="data-[state=active]:shadow-none data-[state=active]:border-b-2 border-b-primary rounded-none"
            >
              Notification
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Update your account settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-full md:w-1/2">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English (Default)</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="gmt-5">
                    <SelectTrigger className="w-full md:w-1/2">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmt-5">
                        (GMT-05:00) Eastern Time
                      </SelectItem>
                      <SelectItem value="gmt-8">
                        (GMT-08:00) Pacific Time
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time Format</Label>
                  <RadioGroup defaultValue="24h" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="24h" id="r1" />
                      <Label htmlFor="r1">24 Hours</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="12h" id="r2" />
                      <Label htmlFor="r2">12 Hours</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notification">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage your notification preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Notification settings will be here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
