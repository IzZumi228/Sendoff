"use client";
import { useState } from "react";
import PathFinder from "./pathfinder";
import WarningModal from "./modal";



export default function Page() {

    const [showDescription, setShowDescription] = useState(false);

    const barPath = "M 1010 702 L 890 670 L 1170 280 L 1170 280 L 1270 300"
    const barPinLocation = "left-320 top-[-30]"

    const restaurantPath = "M 1010 702 L 890 670 L 1170 280 L 1170 280 L 1570 360"
    const restaurantPinLocation = "left-390 top-[10]"
    

    const shoppingMallPath = "M 1010 702 L 890 670 L 990 530  L 1520 660 L 1570 540"
    const shoppingMallPinLocation = "left-400 top-[200]"

    const schoolPath = "M 1010 702 L 700 600 "
    const schoolPinLocation = "left-190 top-[350]"

    const homesPath = "M 1010 702 L 700 600 "
    const homesPinLocation = "left-190 top-[350]"




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
                className={`absolute  ${shoppingMallPinLocation}`}
                src={"/event-mark.png"} />
            <PathFinder d={shoppingMallPath} />
        </div>
    );
}

