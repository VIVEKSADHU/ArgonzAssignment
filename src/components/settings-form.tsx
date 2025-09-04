"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Check,
  Languages,
  Clock,
  Hourglass,
  Palette,
  MessageSquare,
  ClipboardList,
  CalendarClock,
  UserCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { HelpCenterLink } from "@/components/help-center-link";
import { Switch } from "@/components/ui/switch";

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "ja", label: "日本語" },
];

const timezones = [
  { value: "Etc/GMT+12", label: "(GMT-12:00) International Date Line West" },
  { value: "Pacific/Midway", label: "(GMT-11:00) Midway Island, Samoa" },
  { value: "Pacific/Honolulu", label: "(GMT-10:00) Hawaii" },
  { value: "America/Anchorage", label: "(GMT-09:00) Alaska" },
  { value: "America/Los_Angeles", label: "(GMT-08:00) Pacific Time (US & Canada)" },
  { value: "America/New_York", label: "(GMT-05:00) Eastern Time (US & Canada)" },
  { value: "Europe/London", label: "(GMT+00:00) London, Dublin" },
  { value: "Europe/Berlin", label: "(GMT+01:00) Amsterdam, Berlin, Rome" },
  { value: "Asia/Tokyo", label: "(GMT+09:00) Osaka, Sapporo, Tokyo" },
  { value: "Australia/Sydney", label: "(GMT+10:00) Sydney" },
];

type Settings = {
  language: string;
  timezone: string;
  timeFormat: "12h" | "24h";
};

type NotificationSettings = {
  message: boolean;
  taskUpdate: boolean;
  taskDeadline: boolean;
  mentorHelp: boolean;
};


const defaultSettings: Settings & { notifications: NotificationSettings } = {
  language: "en",
  timezone: "America/New_York",
  timeFormat: "12h",
  notifications: {
    message: true,
    taskUpdate: false,
    taskDeadline: true,
    mentorHelp: false,
  }
};

export function SettingsForm() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [settings, setSettings] = useState<Settings & { notifications: NotificationSettings }>(defaultSettings);
  
  useEffect(() => {
    const storedSettings = localStorage.getItem("configureYouSettings");
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));
        document.documentElement.lang = parsedSettings.language || "en";
      } catch (error) {
        console.error("Failed to parse settings from localStorage", error);
      }
    }
    setIsMounted(true);
  }, []);
  
  const handleSave = () => {
    localStorage.setItem("configureYouSettings", JSON.stringify(settings));
    document.documentElement.lang = settings.language;
    toast({
      title: "✅ Preferences Saved",
      description: "Your new settings have been applied.",
    });
  };

  const handleSettingsChange = (key: keyof Settings, value: string) => {
     setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  if (!isMounted) {
    return <SettingsSkeleton />;
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg rounded-xl overflow-hidden">
      <Tabs defaultValue="general" className="w-full">
        <div className="p-4 border-b">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="general"><Palette className="mr-2" /> General</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2" /> Notifications</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="general">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">General Settings</CardTitle>
            <CardDescription className="font-body">
              Update your account details and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 font-body">
            <div className="space-y-2">
              <Label htmlFor="language" className="flex items-center">
                <Languages className="inline-block mr-2 h-4 w-4 text-primary" />
                Language
              </Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingsChange("language", value)}>
                <SelectTrigger id="language" className="w-full">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone" className="flex items-center">
                <Clock className="inline-block mr-2 h-4 w-4 text-primary" />
                Timezone
              </Label>
              <Select value={settings.timezone} onValueChange={(value) => handleSettingsChange("timezone", value)}>
                <SelectTrigger id="timezone" className="w-full">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center"><Hourglass className="inline-block mr-2 h-4 w-4 text-primary" /> Time Format</Label>
              <RadioGroup
                value={settings.timeFormat}
                onValueChange={(value) => handleSettingsChange("timeFormat", value as "12h" | "24h")}
                className="flex items-center space-x-4 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="12h" id="12h" />
                  <Label htmlFor="12h" className="font-body font-normal cursor-pointer">12-hour</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="24h" id="24h" />
                  <Label htmlFor="24h" className="font-body font-normal cursor-pointer">24-hour</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="notifications">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Notification Settings</CardTitle>
            <CardDescription className="font-body">
              Manage how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 font-body">
            <div className="flex items-center justify-between">
              <Label htmlFor="message-notifications" className="flex items-center cursor-pointer">
                <MessageSquare className="inline-block mr-3 h-5 w-5 text-primary" />
                Message
              </Label>
              <Switch
                id="message-notifications"
                checked={settings.notifications.message}
                onCheckedChange={(value) => handleNotificationChange("message", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="task-update-notifications" className="flex items-center cursor-pointer">
                <ClipboardList className="inline-block mr-3 h-5 w-5 text-primary" />
                Task Update
              </Label>
              <Switch
                id="task-update-notifications"
                checked={settings.notifications.taskUpdate}
                onCheckedChange={(value) => handleNotificationChange("taskUpdate", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="task-deadline-notifications" className="flex items-center cursor-pointer">
                <CalendarClock className="inline-block mr-3 h-5 w-5 text-primary" />
                Task Deadline
              </Label>
              <Switch
                id="task-deadline-notifications"
                checked={settings.notifications.taskDeadline}
                onCheckedChange={(value) => handleNotificationChange("taskDeadline", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="mentor-help-notifications" className="flex items-center cursor-pointer">
                <UserCheck className="inline-block mr-3 h-5 w-5 text-primary" />
                Mentor Help
              </Label>
              <Switch
                id="mentor-help-notifications"
                checked={settings.notifications.mentorHelp}
                onCheckedChange={(value) => handleNotificationChange("mentorHelp", value)}
              />
            </div>
          </CardContent>
        </TabsContent>
        <CardFooter className="flex justify-between items-center bg-muted/50 py-4 px-6">
          <HelpCenterLink />
          <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </Tabs>
    </Card>
  );
}

function SettingsSkeleton() {
  return (
    <Card className="w-full max-w-2xl shadow-lg rounded-xl overflow-hidden">
      <div className="p-4 border-b">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <CardHeader>
        <Skeleton className="h-8 w-48 rounded-md" />
        <Skeleton className="h-4 w-full max-w-sm mt-2 rounded-md" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <div className="flex space-x-4 pt-2">
            <Skeleton className="h-6 w-24 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-muted/50 py-4 px-6">
        <Skeleton className="h-6 w-32 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </CardFooter>
    </Card>
  );
}
