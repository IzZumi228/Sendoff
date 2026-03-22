"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface ModalProps {
    setVisible: Dispatch<SetStateAction<boolean>>;
    setShowPath: Dispatch<SetStateAction<boolean>>;
    eventTitle: string;
    eventDescription: string;
    eventLocation: string;
    skillsRequired: string[];
    negativeSkills: string[];
    bonusPersonality: string;
    penaltyWeaknesses: string[];
    missionKey: string;
    onHeroesLoaded: (heroes: HeroCard[]) => void;
}

export type HeroSkills = Record<string, string | number | boolean>;

export type HeroCard = {
    name: string;
    imgUrl: string;
    skillsArr: HeroSkills;
};

type SkillKey =
    | "Power" | "Strength" | "Magic" | "Intelligence" | "Speed"
    | "Defense" | "Poison" | "Rage" | "Corrupted" | "Evilness";

const SKILL_BG: Record<SkillKey, { bg: string; border: string; shadow: string }> = {
    Power:        { bg: "#FF4500", border: "#8B1A00", shadow: "#8B1A00" },
    Strength:     { bg: "#E8A020", border: "#7a4a00", shadow: "#7a4a00" },
    Magic:        { bg: "#7B2FBE", border: "#3a006e", shadow: "#3a006e" },
    Intelligence: { bg: "#1A8FE3", border: "#0a4070", shadow: "#0a4070" },
    Speed:        { bg: "#00C2A0", border: "#005a49", shadow: "#005a49" },
    Defense:      { bg: "#4A6FA5", border: "#1a2f52", shadow: "#1a2f52" },
    Poison:       { bg: "#5DB329", border: "#2a5a00", shadow: "#2a5a00" },
    Rage:         { bg: "#CC1100", border: "#5a0000", shadow: "#5a0000" },
    Corrupted:    { bg: "#1a1a2e", border: "#6d00b3", shadow: "#6d00b3" },
    Evilness:     { bg: "#0d0d0d", border: "#3a0000", shadow: "#3a0000" },
};

const ALL_SKILLS: SkillKey[] = [
    "Power", "Strength", "Magic", "Intelligence", "Speed",
    "Defense", "Poison", "Rage", "Corrupted", "Evilness",
];

function SkillBadge({ skill, state }: { skill: SkillKey; state: "required" | "negative" | "dimmed" }) {
    const { bg, border, shadow } = SKILL_BG[skill];
    return (
        <div className="flex flex-col items-center gap-1" title={skill}>
            <div
                className={[
                    "relative w-13 h-13 flex items-center justify-center transition-opacity",
                    state === "dimmed" ? "opacity-25 grayscale" : "opacity-100",
                ].join(" ")}
                style={{
                    background: bg,
                    border: `3px solid ${border}`,
                    boxShadow: `3px 3px 0 ${shadow}`,
                    clipPath: "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)",
                }}
            >
                <img
                    src={`/badges/${skill.toLowerCase()}.png`}
                    alt={skill}
                    className="w-8 h-8 object-contain"
                />
                {/* pip */}
                {state === "required" && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-600 border-2 border-black rounded-full flex items-center justify-center text-white text-[8px] font-black shadow-[1px_1px_0_black] z-10">✓</span>
                )}
                {state === "negative" && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 border-2 border-black rounded-full flex items-center justify-center text-white text-[8px] font-black shadow-[1px_1px_0_black] z-10">✕</span>
                )}
            </div>
            <span className="font-['Bangers',cursive] text-[10px] uppercase tracking-wide text-center leading-none max-w-[52px] truncate"
                style={{ color: state === "dimmed" ? "#aaa" : "#111" }}>
                {skill}
            </span>
        </div>
    );
}

export default function WarningModal({
    setVisible,
    setShowPath,
    eventTitle,
    eventDescription,
    eventLocation,
    skillsRequired,
    negativeSkills,
    bonusPersonality,
    penaltyWeaknesses,
    missionKey,
    onHeroesLoaded,
}: ModalProps) {
    const allSkills = Object.keys(SKILL_META) as SkillKey[];
    const [isSending, setIsSending] = useState(false);

    const sendChosenDisaster = async () => {
        try {
            setIsSending(true);
            const response = await fetch("http://localhost:8000/mission", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mission: missionKey }),
            });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = (await response.json()) as Array<Record<string, string | number | boolean>>;
            const mappedHeroes: HeroCard[] = data.map((hero, index) => {
                const heroName =
                    String(
                        hero["Name"] ??
                        hero["name"] ??
                        hero["Hero"] ??
                        hero["hero"] ??
                        `Hero ${index + 1}`
                    );

                const imageUrl =
                    String(
                        hero["Image url"] ??
                        hero["ImageURL"] ??
                        hero["image_url"] ??
                        hero["imgUrl"] ??
                        "/event-mark.png"
                    );

                return {
                    name: heroName,
                    imgUrl: imageUrl,
                    skillsArr: hero,
                };
            });

            onHeroesLoaded(mappedHeroes);
            setVisible(false);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div
            className="relative z-10 w-full max-w-md bg-white border-[5px] border-black shadow-[10px_10px_0_black]"
            style={{ fontFamily: "'Bangers', cursive" }}
        >
            {/* Header */}
            <div className="flex items-center gap-4 px-5 py-4 border-b-[5px] border-black bg-black">
                <div className="w-12 h-12 bg-white border-4 border-white flex items-center justify-center shrink-0 shadow-[3px_3px_0_#f5e642]">
                    <span style={{ fontFamily: "'Permanent Marker', cursive", fontSize: 26, color: "black" }}>!</span>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-white uppercase tracking-[0.18em] leading-none" style={{ fontSize: 32, textShadow: "3px 3px 0 #f5e642" }}>
                        {eventTitle}
                    </h2>
                    {/* Location badge */}
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[#f5e642] text-xs">📍</span>
                        <span className="text-[#f5e642] uppercase tracking-widest text-[12px]">
                            {eventLocation}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => setVisible(false)}
                    className="ml-auto text-white hover:text-[#f5e642] transition-colors text-3xl leading-none"
                    style={{ fontFamily: "'Permanent Marker', cursive" }}
                >
                    ✕
                </button>
            </div>

            {/* Body */}
            <div className="px-6 pt-5 pb-7 border-b-[5px] border-black bg-white relative overflow-hidden">
                {/* Ben-Day dots */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.07] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle, #000 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }} />

                <p style={{ fontFamily: "'Permanent Marker', cursive", fontSize: 14, lineHeight: 1.75, color: "#111" }}>
                    {eventDescription}
                </p>

                {/* Skills */}
                <div className="mt-5">
                    <SectionDivider label="Skills" />
                    <div className="flex flex-wrap gap-x-2 gap-y-3 mt-3">
                        {ALL_SKILLS.map((skill) => {
                            const state = skillsRequired.includes(skill)
                                ? "required"
                                : negativeSkills.includes(skill)
                                    ? "negative"
                                    : "dimmed";
                            return <SkillBadge key={skill} skill={skill} state={state} />;
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 mt-4">
                        <Legend color="bg-green-600" label="Required" />
                        <Legend color="bg-red-600" label="Disadvantage" />
                        <Legend color="bg-gray-300" label="N/A" />
                    </div>
                </div>

                {/* Bonus / Penalty row */}
                {(bonusPersonality || penaltyWeaknesses?.length > 0) && (
                    <div className="mt-5 flex gap-3">
                        {bonusPersonality && (
                            <div className="flex-1 border-2 border-black bg-green-50 px-3 py-2 shadow-[3px_3px_0_black]">
                                <p className="text-[11px] uppercase tracking-widest text-green-800 mb-1">✦ Bonus Personality</p>
                                <p className="text-[15px] text-green-900">{bonusPersonality}</p>
                            </div>
                        )}
                        {penaltyWeaknesses?.length > 0 && (
                            <div className="flex-1 border-2 border-black bg-red-50 px-3 py-2 shadow-[3px_3px_0_black]">
                                <p className="text-[11px] uppercase tracking-widest text-red-800 mb-1">✕ Penalty Weakness</p>
                                <p className="text-[15px] text-red-900">{penaltyWeaknesses.join(", ")}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Speech-bubble tail */}
                <div className="absolute -bottom-[22px] left-10 w-0 h-0"
                    style={{ borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: "22px solid black" }} />
            </div>

            {/* Actions */}
            <div className="p-5 flex flex-col gap-3 bg-[#f5e642]">
                <button
                    onClick={() => { setShowPath(true); setVisible(false); sendChosenDisaster(); }}
                    disabled={isSending}
                    className="w-full border-4 border-black bg-white py-4 uppercase tracking-[0.2em] text-black transition-all active:translate-x-[4px] active:translate-y-[4px] hover:bg-[#eee]"
                    style={{ fontSize: 22, boxShadow: "5px 5px 0 black" }}
                >
                    {isSending ? "Sending..." : "Send a Hero!"}
                </button>
            </div>

            {/* Torn bottom edge */}
            <div className="h-3 bg-white overflow-hidden">
                <svg viewBox="0 0 400 12" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,0 L20,8 L40,2 L60,10 L80,3 L100,9 L120,1 L140,8 L160,4 L180,10 L200,2 L220,8 L240,3 L260,9 L280,1 L300,7 L320,3 L340,10 L360,2 L380,8 L400,0 L400,12 L0,12 Z"
                        fill="white" stroke="black" strokeWidth="1.5" />
                </svg>
            </div>
        </div>
    );
}

function SectionDivider({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="h-[3px] w-3 bg-black" />
            <span className="text-[14px] uppercase tracking-[0.18em] text-black" style={{ fontFamily: "'Bangers', cursive" }}>
                {label}
            </span>
            <div className="h-[3px] flex-1 bg-black" />
        </div>
    );
}

function Legend({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center gap-1.5">
            <div className={`w-3 h-3 ${color} border-2 border-black rounded-full shadow-[1px_1px_0_black]`} />
            <span className="text-[12px] uppercase tracking-wide text-[#444]" style={{ fontFamily: "'Bangers', cursive" }}>
                {label}
            </span>
        </div>
    );
}