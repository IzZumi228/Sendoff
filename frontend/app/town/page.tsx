"use client";
import { useState } from "react";
import PathFinder from "./pathfinder";
import WarningModal from "./modal";



export default function Page() {

    const [showDescription, setShowDescription] = useState(false);

    const barPath = "M 1010 702 L 890 670 L 1170 280 L 1170 280 L 1270 300"

    const restaurantPath = ""




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
                className="absolute left-320 top-[-30] "
                src={"/event-mark.png"} />
            <PathFinder d={barPath} />
        </div>
    );
}

