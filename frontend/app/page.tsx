"use client";

import { AppSidebar } from "@/components/ui/sidebar-app";
import { SidebarProvider } from "@/components/ui/sidebar";
import TownDisplay from "./town/town-display";

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
        <div className="mx-auto flex w-full max-w-7xl rounded-md border-4 border-border shadow-[8px_8px_0_#111]">
          <TownDisplay />


        </div>
      </section>
    </SidebarProvider>
  );
}