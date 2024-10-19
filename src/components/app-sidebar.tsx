import { ExitIcon } from "@radix-ui/react-icons";
import { Layers, Pen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Routes from "@/routes/routes";

// Menu items.
const items = [
  {
    title: "Thread Composer",
    url: Routes.App,
    icon: Pen,
  },
  {
    title: "All Saved Threads",
    url: Routes.Threads,
    icon: Layers,
  },
  {
    title: "Quit",
    url: Routes.Home,
    icon: ExitIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <h1 className="text-center text-2xl font-bold font-mono py-2 text-primary">
          x-composer
        </h1>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
