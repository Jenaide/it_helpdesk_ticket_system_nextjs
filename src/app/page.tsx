import { Button } from "@/components/ui/button";
import { TicketIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center p-6">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <TicketIcon className="size-6" />
              <span className="font-bold">HelpDesk Pro</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
