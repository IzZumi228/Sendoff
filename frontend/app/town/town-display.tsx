"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PathFinder from "./pathfinder";
import WarningModal from "./modal";
import type { HeroCard } from "./modal";




interface TownDisplayProps {
    missionLocaion: string;
    missionType: string;
    missionDescription: string
    posStats?: string[];
    negStats?: string[];
    personality?: string;
    weaknesses?: string[];
    onHeroesLoaded: (heroes: HeroCard[]) => void;
    heroSent: boolean;
    setHeroSent: Dispatch<SetStateAction<boolean>>
}

type Coordinates = {
    name: string,
    path: string,
    pinLocation: string
}

export default function TownDisplay({
    missionType,
    missionLocaion,
    missionDescription,
    posStats,
    negStats,
    personality,
    weaknesses,
    onHeroesLoaded,
    heroSent,
    setHeroSent,

}: TownDisplayProps) {

    const [showDescription, setShowDescription] = useState(false);
    


    const coordinates: Coordinates[] = [
        {
            name: "Bar",
            path: "M 670 470 L 600 450 L 790 190 L 850 205",
            pinLocation: "left-220 top-[20]"
        },
        {
            name: "Restaurant",
            path: "M 670 470 L 600 450 L 790 190 L 1050 245",
            pinLocation: "left-270 top-[70]"
        },
        {
            name: "Shopping Mall",
            path: "M 670 470 L 590 450 L 650 355 L 1020 450 L 1050 370",
            pinLocation: "left-280 top-[170]"
        },
        {
            name: "School",
            path: "M 670 470 L 470 400 ",
            pinLocation: "left-130 top-[250]"
        },
        {
            name: "Residential Homes",
            path: "M 670 470 L 590 450 L 550 508 L 180 402",
            pinLocation: "left-50 top-[250]"
        },
        {
            name: "Downtown",
            path: "M 670 470 L 590 450  L 770 195 L 740 190",
            pinLocation: "left-120 top-[30]"
        },
    ]

    const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null)

    useEffect(() => {
        if (missionDescription && missionLocaion) {
            const match = coordinates.find((cord) => cord.name === missionLocaion);
            setCurrentLocation(match ?? null);
        }
    }, [missionDescription, missionLocaion]);




    return (

        <div className="relative w-full h-full">
            {showDescription && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <WarningModal
                        eventLocation={missionLocaion}
                        eventTitle={missionType}
                        eventDescription={missionDescription}
                        setVisible={setShowDescription}
                        skillsRequired={posStats!}
                        negativeSkills={negStats!}
                        bonusPersonality={personality!}
                        penaltyWeaknesses={weaknesses!}
                        onHeroesLoaded={onHeroesLoaded}
                    />
                </div>
            )}
            <img
                src="/Town Map.jpg"
                className="w-full h-full object-cover"
            />
            {currentLocation && (
                <img
                    onClick={() => {
                        setShowDescription(true)
                    }}
                    className={`absolute  ${currentLocation?.pinLocation} w-30 h-40`}
                    src={"/event-mark.png"} />
            )}


            {heroSent && currentLocation && (
                <PathFinder d={currentLocation?.path} />
            )}
        </div>
    );
}

