"use client";

import { Sun, Moon, Info } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
      <h1 className="text-xl font-bold">AI Customer Support</h1>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* FIX: Use the 'asChild' prop on the Button to correctly wrap the Link */}
        <Button variant="outline" size="icon" asChild>
          <Link href="/about">
            <Info className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">About page</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
