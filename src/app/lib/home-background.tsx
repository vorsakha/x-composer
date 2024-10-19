"use client";

import React from "react";
import Link from "next/link";
import { BackgroundLines } from "@/components/ui/lines-background";

export function HomeBackground() {
  return (
    <BackgroundLines>
      <div className="flex flex-col justify-between items-center min-h-screen">
        <div />
        <main className="flex flex-col gap-8 items-center justify-center">
          <div className="mx-auto text-3xl md:text-7xl font-bold font-mono dark:text-white text-center">
            x-composer
          </div>
          <Link
            className="inline-flex mx-auto items-center p-2.5 justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 z-10"
            href="/app"
          >
            Start Composing
          </Link>
        </main>

        <footer className="z-10 p-2">
          <a
            className="flex items-center hover:underline hover:underline-offset-4 font-mono"
            href="https://andreitf.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            author
          </a>
        </footer>
      </div>
    </BackgroundLines>
  );
}
