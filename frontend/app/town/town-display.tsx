"use client";
import { useState } from "react";
import PathFinder from "./pathfinder";
import WarningModal from "./modal";



export default function TownDisplay() {

    const [showDescription, setShowDescription] = useState(false);

    const barPath = "M 670 470 L 600 450 L 790 190 L 850 205"
    const barPinLocation = "left-220 top-[20]"

    const restaurantPath = "M 670 470 L 600 450 L 790 190 L 1050 245"
    const restaurantPinLocation = "left-270 top-[70]"


    const shoppingMallPath = "M 670 470 L 590 450 L 650 355 L 1020 450 L 1050 370"
    const shoppingMallPinLocation = "left-280 top-[170]"

    const schoolPath = "M 670 470 L 470 400 "
    const schoolPinLocation = "left-130 top-[250]"

    const homesPath = "M 670 470 L 590 450 L 550 508 L 180 402"
    const homesPinLocation = "left-50 top-[250]"

    const downTownPath = "M 670 470 L 590 450  L 770 195 L 740 190"
    const downTownPinLocation = "left-120 top-[30]"




    return (

        <div className="relative w-full h-full">
            {showDescription && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <WarningModal
                        eventTitle="Fire Disaster!"
                        eventDescription="A crowded bar has caught fire, and flames are spreading quickly. Patrons may still be trapped inside, and nearby buildings are at risk."
                        setVisible={setShowDescription}
                        skillsRequired={["Strength", "Speed"]}
                        negativeSkills={["Rage"]}

                    />
                </div>
            )}
            <img
                src="/Town Map.jpg"
                className="w-full h-full object-cover"
            />
            <img
                onClick={() => {
                    setShowDescription(true)
                }}
                className={`absolute  ${downTownPinLocation} w-30 h-40`}
                src={"/event-mark.png"} />
            <PathFinder d={downTownPath} />
        </div>
    );
}

