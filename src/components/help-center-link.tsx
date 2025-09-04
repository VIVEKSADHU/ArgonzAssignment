"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { getContextAwareHelpCenterLink } from "@/ai/flows/context-aware-help-center";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function HelpCenterLink() {
  const [helpLink, setHelpLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // navigator is a browser-only API, so we need to ensure this runs on the client.
    const fetchHelpLink = async () => {
      try {
        const userLocale = navigator.language || "en-US";
        const result = await getContextAwareHelpCenterLink({ locale: userLocale });
        setHelpLink(result.helpCenterLink);
      } catch (error) {
        console.error("Failed to fetch help center link:", error);
        // Fallback to a generic link in case of an error
        setHelpLink("https://example.com/help");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHelpLink();
  }, []);

  if (isLoading) {
    return <Skeleton className="h-10 w-32 rounded-md" />;
  }

  if (!helpLink) {
    return null;
  }

  return (
    <Button variant="link" asChild className="p-0 h-auto font-body text-muted-foreground hover:text-primary">
      <Link href={helpLink} target="_blank" rel="noopener noreferrer">
        <HelpCircle className="mr-2 h-4 w-4" />
        Help Center
      </Link>
    </Button>
  );
}
