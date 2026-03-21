"use client";

import { AppSidebar } from "@/components/ui/sidebar-app";
import { SidebarProvider } from "@/components/ui/sidebar";

const sidebarItems = [
  { name: "Fire in the area", url: "#overview", icon: () => <span>icon </span> },
  { name: "Bank robbery", url: "#incidents", icon: () => <span>icon </span> },
  { name: "Building collapsed", url: "#response", icon: () => <span> icon</span> },
  { name: "Earthquake", url: "#settings", icon: () => <span>icon</span> },
];



export default function Home() {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar disasters={sidebarItems} />
        <section className="flex flex-1 p-4 md:p-6">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-md border-4 border-border bg-card p-6 shadow-[8px_8px_0_#111]">
            <header className="space-y-1">
              <h1 className="text-4xl text-primary">Dashboard</h1>
              <p className="text-base text-muted-foreground">
                 main content
              </p>
            </header>
            <div className="grid gap-4 md:grid-cols-2">

            </div>
          </div>
        </section>
    </SidebarProvider>
  );
}