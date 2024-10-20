import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "x-composer app",
  description: "App section of x-composer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex mx-auto w-full flex-col p-3 pb-6 min-h-screen">
        <SidebarTrigger />
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
