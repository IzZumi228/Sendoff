"use client";
import { Dispatch, SetStateAction } from "react";

interface ModalProps {
    setVisible: Dispatch<SetStateAction<boolean>>;
    eventTitle: string;
    eventDescription: string;
    skillsRequired: string[];
    negativeSkills: string[];
}

type SkillKey =
    | "Power" | "Strength" | "Magic" | "Intelligence" | "Speed"
    | "Defense" | "Poison" | "Rage" | "Corrupted" | "Evilness" | "Age";

const SKILL_META: Record<SkillKey, { icon: string; bg: string; text: string; border: string; shadow: string }> = {
    Power:        { icon: "⚡", bg: "#FF4500", text: "#fff",    border: "#8B1A00", shadow: "#8B1A00" },
    Strength:     { icon: "💪", bg: "#E8A020", text: "#1a0a00", border: "#7a4a00", shadow: "#7a4a00" },
    Magic:        { icon: "✦",  bg: "#7B2FBE", text: "#f0d9ff", border: "#3a006e", shadow: "#3a006e" },
    Intelligence: { icon: "◈",  bg: "#1A8FE3", text: "#fff",    border: "#0a4070", shadow: "#0a4070" },
    Speed:        { icon: "»",  bg: "#00C2A0", text: "#001a16", border: "#005a49", shadow: "#005a49" },
    Defense:      { icon: "⬡",  bg: "#4A6FA5", text: "#fff",    border: "#1a2f52", shadow: "#1a2f52" },
    Poison:       { icon: "☠",  bg: "#5DB329", text: "#0a1a00", border: "#2a5a00", shadow: "#2a5a00" },
    Rage:         { icon: "🔥", bg: "#CC1100", text: "#ffe0d0", border: "#5a0000", shadow: "#5a0000" },
    Corrupted:    { icon: "Ψ",  bg: "#1a1a2e", text: "#c084fc", border: "#6d00b3", shadow: "#6d00b3" },
    Evilness:     { icon: "☾",  bg: "#0d0d0d", text: "#ff4444", border: "#3a0000", shadow: "#3a0000" },
    Age:          { icon: "⧗",  bg: "#C8B89A", text: "#2a1a00", border: "#6b4c1e", shadow: "#6b4c1e" },
};

function SkillBadge({ skill, dimmed = false }: { skill: string; dimmed?: boolean }) {
    const meta = SKILL_META[skill as SkillKey];
    if (!meta) return null;

    const useCustomFont = ["Magic", "Corrupted", "Age", "Defense", "Intelligence", "Speed"].includes(skill);

    return (
        <div
            title={skill}
            style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                opacity: dimmed ? 0.3 : 1,
                filter: dimmed ? "grayscale(0.7)" : "none",
                transition: "opacity 0.2s",
            }}
        >
            <div
                style={{
                    width: 52,
                    height: 52,
                    background: meta.bg,
                    border: `3px solid ${meta.border}`,
                    boxShadow: `3px 3px 0 ${meta.shadow}`,
                    clipPath: "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: useCustomFont ? 20 : 24,
                    color: meta.text,
                    fontFamily: useCustomFont ? "'Bangers', cursive" : "inherit",
                    fontWeight: 900,
                    lineHeight: 1,
                    userSelect: "none" as const,
                    position: "relative" as const,
                }}
            >
                {meta.icon}
                <div style={{
                    position: "absolute",
                    top: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 18,
                    height: 5,
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: 99,
                    filter: "blur(1px)",
                    pointerEvents: "none",
                }} />
            </div>
            <span style={{
                fontFamily: "'Bangers', cursive",
                fontSize: 10,
                letterSpacing: "0.06em",
                color: dimmed ? "#999" : "#111",
                textTransform: "uppercase" as const,
                lineHeight: 1,
                textAlign: "center" as const,
                maxWidth: 54,
            }}>
                {skill}
            </span>
        </div>
    );
}

export default function WarningModal({
    setVisible,
    eventTitle,
    eventDescription,
    skillsRequired,
    negativeSkills,
}: ModalProps) {
    const allSkills = Object.keys(SKILL_META) as SkillKey[];

    return (
        <div
            className="relative z-10 w-full max-w-md bg-white border-[5px] border-black shadow-[10px_10px_0_black] modal-pop"
            style={{ fontFamily: "'Bangers', cursive" }}
        >
            {/* ── Header ── */}
            <div className="flex items-center gap-4 p-5 border-b-[5px] border-black bg-black">
                <div className="w-14 h-14 bg-white border-4 border-white flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0_#f5e642]">
                    <span style={{ fontFamily: "'Permanent Marker', cursive", fontSize: 28, color: "black", lineHeight: 1 }}>!</span>
                </div>
                <h2
                    className="text-white uppercase tracking-[0.18em]"
                    style={{ fontSize: 36, lineHeight: 1, textShadow: "3px 3px 0 #f5e642" }}
                >
                    {eventTitle}
                </h2>
                <button
                    onClick={() => setVisible(false)}
                    className="ml-auto text-white hover:text-[#f5e642] transition-colors"
                    style={{ fontSize: 32, lineHeight: 1, fontFamily: "'Permanent Marker', cursive" }}
                >
                    ✕
                </button>
            </div>

            {/* ── Body ── */}
            <div className="px-6 pt-6 pb-8 border-b-[5px] border-black bg-white relative">
                {/* Ben-Day corner dots */}
                <div
                    className="absolute top-0 right-0 w-24 h-24 opacity-[0.07] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, #000 1.5px, transparent 1.5px)",
                        backgroundSize: "8px 8px",
                    }}
                />

                <p style={{ fontFamily: "'Permanent Marker', cursive", fontSize: 15, lineHeight: 1.7, color: "#111" }}>
                    {eventDescription}
                </p>

                {/* ── Skills grid ── */}
                <div className="mt-5">
                    {/* Section label */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-[3px] w-3 bg-black" />
                        <span style={{
                            fontFamily: "'Bangers', cursive",
                            fontSize: 14,
                            letterSpacing: "0.18em",
                            color: "#111",
                            textTransform: "uppercase",
                        }}>
                            Skills Required
                        </span>
                        <div className="h-[3px] flex-1 bg-black" />
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 8px" }}>
                        {allSkills.map((skill) => {
                            const isRequired = skillsRequired.includes(skill);
                            const isNegative = negativeSkills.includes(skill);
                            const dimmed = !isRequired && !isNegative;
                            return (
                                <div key={skill} style={{ position: "relative" }}>
                                    <SkillBadge skill={skill} dimmed={dimmed} />

                                    {/* ✓ required pip */}
                                    {isRequired && (
                                        <div style={{
                                            position: "absolute",
                                            bottom: 17,
                                            right: -3,
                                            width: 16,
                                            height: 16,
                                            background: "#16a34a",
                                            border: "2.5px solid #000",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 8,
                                            fontWeight: 900,
                                            color: "#fff",
                                            lineHeight: 1,
                                            zIndex: 2,
                                            boxShadow: "1px 1px 0 #000",
                                        }}>✓</div>
                                    )}

                                    {/* ✕ negative pip */}
                                    {isNegative && (
                                        <div style={{
                                            position: "absolute",
                                            bottom: 17,
                                            right: -3,
                                            width: 16,
                                            height: 16,
                                            background: "#dc2626",
                                            border: "2.5px solid #000",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 8,
                                            fontWeight: 900,
                                            color: "#fff",
                                            lineHeight: 1,
                                            zIndex: 2,
                                            boxShadow: "1px 1px 0 #000",
                                        }}>✕</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1.5">
                            <div style={{ width: 12, height: 12, background: "#16a34a", border: "2px solid #000", borderRadius: "50%", boxShadow: "1px 1px 0 #000" }} />
                            <span style={{ fontFamily: "'Bangers', cursive", fontSize: 12, letterSpacing: "0.06em", color: "#444", textTransform: "uppercase" }}>Required</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div style={{ width: 12, height: 12, background: "#dc2626", border: "2px solid #000", borderRadius: "50%", boxShadow: "1px 1px 0 #000" }} />
                            <span style={{ fontFamily: "'Bangers', cursive", fontSize: 12, letterSpacing: "0.06em", color: "#444", textTransform: "uppercase" }}>Disadvantage</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div style={{ width: 12, height: 12, background: "#ccc", border: "2px solid #000", borderRadius: "50%", boxShadow: "1px 1px 0 #000" }} />
                            <span style={{ fontFamily: "'Bangers', cursive", fontSize: 12, letterSpacing: "0.06em", color: "#444", textTransform: "uppercase" }}>N/A</span>
                        </div>
                    </div>
                </div>

                {/* Speech-bubble tail */}
                <div
                    className="absolute -bottom-[22px] left-10 w-0 h-0"
                    style={{
                        borderLeft: "12px solid transparent",
                        borderRight: "12px solid transparent",
                        borderTop: "22px solid black",
                    }}
                />
            </div>

            {/* ── Actions ── */}
            <div className="p-5 flex flex-col gap-3 bg-[#f5e642]">
                <button
                    className="w-full border-[4px] border-black bg-white py-4 uppercase tracking-[0.2em] text-black transition-all active:translate-x-[4px] active:translate-y-[4px] hover:bg-[#eee]"
                    style={{ fontSize: 22, boxShadow: "5px 5px 0 black" }}
                >
                    Send a Hero!
                </button>
            </div>

            {/* Bottom torn-paper edge */}
            <div className="h-3 bg-white border-t-0 overflow-hidden">
                <svg viewBox="0 0 400 12" preserveAspectRatio="none" className="w-full h-full">
                    <path
                        d="M0,0 L20,8 L40,2 L60,10 L80,3 L100,9 L120,1 L140,8 L160,4 L180,10 L200,2 L220,8 L240,3 L260,9 L280,1 L300,7 L320,3 L340,10 L360,2 L380,8 L400,0 L400,12 L0,12 Z"
                        fill="white"
                        stroke="black"
                        strokeWidth="1.5"
                    />
                </svg>
            </div>
        </div>
    );
}   