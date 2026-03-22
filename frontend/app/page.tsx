"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/ui/sidebar-app";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Footer } from "@/components/ui/footer";
import TownDisplay from "./town/town-display";
import type { HeroCard } from "./town/modal";
import { FireExtinguisher, HeartPlus, LucideBrain, Radiation, ReceiptIndianRupeeIcon, Users2 } from "lucide-react";

const sidebarItems = [
  { name: "Fire Disaster",  icon: () => <FireExtinguisher /> },
  { name: "Monster Attack", icon: () => <span className="text-base">👾</span> },
  { name: "Poison Leak",  icon: () => <span><Radiation /> </span> },
  { name: "Bandint Ambush",  icon: () => <span><Users2 /></span> },
  { name: "Dark Ritual",  icon: () => <span><ReceiptIndianRupeeIcon /></span> },
  { name: "Rescue Mission",  icon: () => <span><HeartPlus /></span> },
  { name: "Intellegence Mission",  icon: () => <span><LucideBrain /></span> },
];


type DisasterItem = {
  name: string
  icon: React.ComponentType
}


export default function Home() {
  const [pickedMission, setPickedMission] = useState<DisasterItem | null>();
  const [missionLocation, setMissionLocation] = useState("")
  const [missionDescription, setMissionDescription] = useState("")
  const [heroDashboard, setHeroDashboard] = useState<HeroCard[]>([]);
  const [footerHeroes, setFooterHeroes] = useState<HeroCard[]>([]);

  useEffect(() => {
    setFooterHeroes(heroDashboard);
  }, [heroDashboard]);

  return (
    <>
      <SidebarProvider defaultOpen>
        <AppSidebar 
        pickedMission={pickedMission}
        setPickedMission={setPickedMission}
        missionLocation={missionLocation}
        setMissionLocation={setMissionLocation}
        disasters={sidebarItems}
        missionDescription={missionDescription}
        setmissionDescription={setMissionDescription}
         />
        <section className="flex flex-1 p-4 md:p-6">
          <div className="mx-auto flex w-full max-w-7xl rounded-md border-4 border-border shadow-[8px_8px_0_#111]">
            <TownDisplay onHeroesLoaded={setHeroDashboard} missionType={pickedMission?.name!} missionDescription={missionDescription} missionLocaion={missionLocation} />
          </div>
        </section>
      </SidebarProvider>
      <Footer heroes={footerHeroes} />
    </>
  );
}