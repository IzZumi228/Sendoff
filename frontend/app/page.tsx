"use client";

import { AppSidebar } from "@/components/ui/sidebar-app";
import { SidebarProvider } from "@/components/ui/sidebar";

const sidebarItems = [
  { name: "Fire in the area", url: "#overview", icon: () => <span>icon </span> },
  { name: "Bank robbery", url: "#incidents", icon: () => <span>icon </span> },
  { name: "Building collapsed", url: "#response", icon: () => <span>🏗️</span> },
  { name: "Earthquake", url: "#settings", icon: () => <span>icon</span> },
];

export default function Home() {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar disasters={sidebarItems} />
        <section className="flex flex-1 p-4 md:p-6">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-xl border border-border/70 bg-card p-6 shadow-xs">
            <header className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Sidebar, main content, and footer are now structured as a single
                page without route groups.
              </p>
            </header>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border/70 p-4">
                <h2 className="mb-1 text-sm font-medium">Main Content Slot A</h2>
                <p className="text-sm text-muted-foreground">
                  Drop your dashboard components here.
                </p>
              </div>
              <div className="rounded-lg border border-border/70 p-4">
                <h2 className="mb-1 text-sm font-medium">Main Content Slot B</h2>
                <p className="text-sm text-muted-foreground">
                  Add charts, cards, tables, or map widgets.
                </p>
              </div>
            </div>
          </div>
        </section>
    </SidebarProvider>
  );
}