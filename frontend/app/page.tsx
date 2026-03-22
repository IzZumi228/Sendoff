"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/ui/sidebar-app";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Footer } from "@/components/ui/footer";
import TownDisplay from "./town/town-display";
import type { HeroCard } from "./town/modal";
import { FireExtinguisher, HeartPlus, LucideBrain, Radiation, ReceiptIndianRupeeIcon, Users2 } from "lucide-react";
import { generateMissionEndMessage } from "@/lib/ai";
import MissionSummaryModal from "@/components/mission-summary-ui";

const sidebarItems = [
  { name: "Fire Disaster", positiveStats: ["Power", "Strength"], negativeStats: ["Evilness", "Corrupted"], personality: "Brave", weaknesses: ["Fire weakness", "Sound sensitive", "Fearful", "Short sighted", "Energy drain", "Hotheaded", "Reckless"], icon: () => <FireExtinguisher /> },
  { name: "Monster Attack", positiveStats: ["Magic", "Strength"], negativeStats: ["Evilness", "Corrupted"], personality: "Cold blooded", weaknesses: ["Soft hearted", "Fearful", "Impulsive", "Reckless", "Overconfident", "Silver weakness", "Prideful"], icon: () => <img src={"monster.png"} className="w-5 h-5" /> },
  { name: "Poison Leak", positiveStats: ["Poison", "Intelligence"], negativeStats: ["Evilness", "Corrupted"], personality: "Calculating", weaknesses: ["Poison susceptible", "Energy drain", "Short sighted", "Fearful", "Reckless", "Radition weak", "Water weakness"], icon: () => <span><Radiation /> </span> },
  { name: "Bandit Ambush", positiveStats: ["Defense", "Power"], negativeStats: ["Evilness", "Corrupted"], personality: "Cold blooded", weaknesses: ["Soft hearted", "Fearful", "Impulsive", "Reckless", "Overconfident", "Silver weakness", "Prideful"], icon: () => <span><Users2 /></span> },
  { name: "Dark Ritual", positiveStats: ["Intelligence", "Magic"], negativeStats: ["Strength", "Rage"], personality: "Power hungry", weaknesses: ["Magic vulnerable", "Light sensitive", "Darkness bound", "Obsessive", "Paranoid", "Hubris", "Power addicted"], icon: () => <span><ReceiptIndianRupeeIcon /></span> },
  { name: "Rescue Mission", positiveStats: ["Speed", "Intelligence"], negativeStats: ["Evilness", "Power"], personality: "Protective", weaknesses: ["Soft hearted", "Fearful", "Energy drain", "Short sighted", "Impulsive", "Guilt ridden", "Lonely"], icon: () => <span><HeartPlus /></span> },
  { name: "Intellegence Mission", positiveStats: ["Intelligence", "Corrupted"], negativeStats: ["Evilness", "Strength"], personality: "Clever", weaknesses: ["Naive", "Trusting", "Paranoid", "Short sighted", "Impulsive", "Manipulable", "Technology vulnerable"], icon: () => <span><LucideBrain /></span> },
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
  const [heroSent, setHeroSent] = useState(false);
  const [selectedHero, setSelectedHero] = useState<HeroCard | null>(null);
  const [isMissionSummaryOpen, setIsMissionSummaryOpen] = useState(false);
  const [missionSummary, setMissionSummary] = useState("")

  useEffect(() => {
    setFooterHeroes(heroDashboard);
  }, [heroDashboard]);

  const handleSendHero = async () => {
    let totalScore = selectedHero?.skillsArr["finalscore"] as number

    const missionSummary = await generateMissionEndMessage((totalScore / 2), selectedHero?.name!) || "";

    setMissionSummary(missionSummary)
    setIsMissionSummaryOpen(true);


  }

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

        {isMissionSummaryOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <MissionSummaryModal 
            setVisible={setIsMissionSummaryOpen}
            missionSummary={missionSummary} 
            
            heroSent={selectedHero?.name!} />
          </div>
        )}

        <section className="flex flex-1 p-4 md:p-6">
          <div className="mx-auto flex w-full max-w-7xl rounded-md border-4 border-border shadow-[8px_8px_0_#111]">
            <TownDisplay
              posStats={sidebarItems.find((item) => item.name === pickedMission?.name)?.positiveStats}
              negStats={sidebarItems.find((item) => item.name === pickedMission?.name)?.negativeStats}
              personality={sidebarItems.find((item) => item.name === pickedMission?.name)?.personality}
              weaknesses={sidebarItems.find((item) => item.name === pickedMission?.name)?.weaknesses}
              missionType={pickedMission?.name!}
              missionDescription={missionDescription}
              missionLocaion={missionLocation}
              onHeroesLoaded={setHeroDashboard}
              heroSent={heroSent}
              setHeroSent={setHeroSent}
            />


          </div>
        </section>
      </SidebarProvider>
      <Footer
        selectedHero={selectedHero}
        setSelectedHero={setSelectedHero}
        setHeroSent={setHeroSent}
        heroes={footerHeroes}
        handleHeroSent={handleSendHero}
      />
    </>
  );
}