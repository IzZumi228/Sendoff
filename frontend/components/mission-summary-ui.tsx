"use client";
import { Dispatch, SetStateAction } from "react";

interface MissionSummaryModalProps {
    setVisible: Dispatch<SetStateAction<boolean>>;
    missionSummary: string;
    heroSent: string;
}

function parseSummary(raw: string): { body: string; stats: { label: string; value: string }[] } {
    const lines = raw.trim().split("\n");

    const statsLines: string[] = [];
    const bodyLines: string[] = [];

    // Collect stats from the end — lines matching "Word(s): value"
    const statPattern = /^([A-Za-z\s]+):\s*(.+)$/;
    let statsCollected = 0;

    for (let i = lines.length - 1; i >= 0; i--) {
        const trimmed = lines[i].trim();
        if (statsCollected < 2 && statPattern.test(trimmed)) {
            statsLines.unshift(trimmed);
            statsCollected++;
        } else {
            bodyLines.unshift(...lines.slice(0, i + 1 - statsCollected));
            break;
        }
    }

    const stats = statsLines.map((line) => {
        const match = line.match(statPattern)!;
        return { label: match[1].trim(), value: match[2].trim() };
    });

    // Re-derive body as everything except the last statsCollected lines
    const bodyText = lines
        .slice(0, lines.length - statsCollected)
        .join("\n")
        .trim();

    return { body: bodyText, stats };
}

export default function MissionSummaryModal({
    setVisible,
    missionSummary,
    heroSent,
}: MissionSummaryModalProps) {
    const { body, stats } = parseSummary(missionSummary);


    return (
        <div
            className="relative z-10 w-full max-w-md bg-white border-[5px] border-black shadow-[10px_10px_0_black]"
            style={{ fontFamily: "'Bangers', cursive" }}
        >
            {/* Header */}
            <div className="flex items-center gap-4 px-5 py-4 border-b-[5px] border-black bg-[#f5e642]">
                <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center shrink-0 shadow-[3px_3px_0_white]">
                    <span
                        style={{
                            fontFamily: "'Permanent Marker', cursive",
                            fontSize: 22,
                            color: "#f5e642",
                        }}
                    >
                        RPT
                    </span>
                </div>
                <div className="flex flex-col">
                    <h2
                        className="text-black uppercase tracking-[0.18em] leading-none"
                        style={{
                            fontSize: 30,
                            textShadow: "3px 3px 0 rgba(0,0,0,0.18)",
                        }}
                    >
                        Mission Report
                    </h2>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-black text-xs uppercase tracking-widest">Hero:</span>
                        <span
                            className="text-black uppercase tracking-widest text-[13px]"
                            style={{ fontFamily: "'Permanent Marker', cursive" }}
                        >
                            {heroSent}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => setVisible(false)}
                    className="ml-auto text-black hover:text-white transition-colors text-3xl leading-none"
                    style={{ fontFamily: "'Permanent Marker', cursive" }}
                >
                    x
                </button>
            </div>

            {/* Body */}
            <div className="px-6 pt-5 pb-8 border-b-[5px] border-black bg-white relative overflow-hidden">
                {/* Ben-Day dots top-right */}
                <div
                    className="absolute top-0 right-0 w-28 h-28 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, #000 1.5px, transparent 1.5px)",
                        backgroundSize: "8px 8px",
                    }}
                />

                {/* Summary text */}
                <p
                    style={{
                        fontFamily: "'Permanent Marker', cursive",
                        fontSize: 14,
                        lineHeight: 1.8,
                        color: "#111",
                    }}
                >
                    {body}
                </p>

                {/* Divider */}
                <div className="flex items-center gap-2 mt-5">
                    <div className="h-[3px] w-3 bg-black" />
                    <span
                        className="text-[14px] uppercase tracking-[0.18em] text-black"
                        style={{ fontFamily: "'Bangers', cursive" }}
                    >
                        After-Action Stats
                    </span>
                    <div className="h-[3px] flex-1 bg-black" />
                </div>

                {/* Stats */}
                <div className="mt-4 flex gap-3">
                    {stats.map(({ label, value }) => (
                        <div
                            key={label}
                            className="flex-1 border-[3px] border-black bg-[#f5e642] px-4 py-3 shadow-[4px_4px_0_black] flex flex-col items-center"
                        >
                            <span
                                className="text-[11px] uppercase tracking-widest text-black mb-1"
                                style={{ fontFamily: "'Bangers', cursive" }}
                            >
                                {label}
                            </span>
                            <span
                                className="text-black leading-none"
                                style={{
                                    fontFamily: "'Permanent Marker', cursive",
                                    fontSize: 26,
                                    textShadow: "2px 2px 0 rgba(0,0,0,0.15)",
                                }}
                            >
                                {value}
                            </span>
                        </div>
                    ))}
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

            {/* Actions */}
            <div className="p-5 flex flex-col gap-3 bg-black">
                <button
                    onClick={() => setVisible(false)}
                    className="w-full border-4 border-[#f5e642] bg-black py-4 uppercase tracking-[0.2em] text-[#f5e642] transition-all active:translate-x-[4px] active:translate-y-[4px] hover:bg-[#1a1a1a]"
                    style={{ fontSize: 22, boxShadow: "5px 5px 0 #f5e642" }}
                >
                    Close Report
                </button>
            </div>

            {/* Torn bottom edge */}
            <div className="h-3 bg-black overflow-hidden">
                <svg
                    viewBox="0 0 400 12"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                >
                    <path
                        d="M0,0 L20,8 L40,2 L60,10 L80,3 L100,9 L120,1 L140,8 L160,4 L180,10 L200,2 L220,8 L240,3 L260,9 L280,1 L300,7 L320,3 L340,10 L360,2 L380,8 L400,0 L400,12 L0,12 Z"
                        fill="black"
                        stroke="#f5e642"
                        strokeWidth="1.5"
                    />
                </svg>
            </div>
        </div>
    );
}