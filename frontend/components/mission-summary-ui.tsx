"use client";
import { Dispatch, SetStateAction } from "react";

interface MissionSummaryModalProps {
    setVisible: Dispatch<SetStateAction<boolean>>;
    missionSummary: string;
    heroSent: string;
    missionStatus: "Success!" | "Fail";
    sabotage?: boolean;
}

function parseSummary(raw: string): { body: string; stats: { label: string; value: string }[] } {
    const lines = raw.trim().split("\n");
    const statPattern = /^([A-Za-z\s]+):\s*(.+)$/;
    let statsCollected = 0;
    const statsLines: string[] = [];

    for (let i = lines.length - 1; i >= 0; i--) {
        const trimmed = lines[i].trim();
        if (statsCollected < 2 && statPattern.test(trimmed)) {
            statsLines.unshift(trimmed);
            statsCollected++;
        } else {
            break;
        }
    }

    const stats = statsLines.map((line) => {
        const match = line.match(statPattern)!;
        return { label: match[1].trim(), value: match[2].trim() };
    });

    const bodyText = lines
        .slice(0, lines.length - statsCollected)
        .join("\n")
        .trim();

    return { body: bodyText, stats };
}

// Theme tokens
const THEME = {
    success: {
        headerBg: "#f5e642",
        headerText: "#111",
        accentBg: "#111",
        accentText: "#f5e642",
        statsBg: "#f5e642",
        statsText: "#111",
        footerBg: "#111",
        footerBorder: "#f5e642",
        footerText: "#f5e642",
        footerShadow: "#f5e642",
        tornFill: "#111",
        tornStroke: "#f5e642",
        statusLabel: "Mission Success",
        statusBg: "#16a34a",
        statusBorder: "#052e16",
        statusText: "#fff",
        statusShadow: "#052e16",
    },
    fail: {
        headerBg: "#CC1100",
        headerText: "#fff",
        accentBg: "#fff",
        accentText: "#CC1100",
        statsBg: "#CC1100",
        statsText: "#fff",
        footerBg: "#CC1100",
        footerBorder: "#fff",
        footerText: "#fff",
        footerShadow: "#5a0000",
        tornFill: "#CC1100",
        tornStroke: "#fff",
        statusLabel: "Mission Failed",
        statusBg: "#111",
        statusBorder: "#5a0000",
        statusText: "#CC1100",
        statusShadow: "#5a0000",
    },
};

export default function MissionSummaryModal({
    setVisible,
    missionSummary,
    heroSent,
    missionStatus,
    sabotage,
}: MissionSummaryModalProps) {
    const { body, stats } = parseSummary(missionSummary);

    // Sabotage always forces a fail state
    const effectiveStatus = sabotage ? "Fail" : missionStatus;
    const theme = effectiveStatus === "Success!" ? THEME.success : THEME.fail;

    return (
        <div
            className="relative z-10 w-full max-w-md bg-white border-[5px] border-black shadow-[10px_10px_0_black]"
            style={{ fontFamily: "'Bangers', cursive" }}
        >
            {/* Header */}
            <div
                className="flex items-center gap-4 px-5 py-4 border-b-[5px] border-black"
                style={{ background: theme.headerBg }}
            >
                <div
                    className="w-12 h-12 border-4 border-black flex items-center justify-center shrink-0"
                    style={{
                        background: theme.accentBg,
                        boxShadow: `3px 3px 0 ${theme.headerText}`,
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'Permanent Marker', cursive",
                            fontSize: 18,
                            color: theme.accentText,
                        }}
                    >
                        RPT
                    </span>
                </div>

                <div className="flex flex-col">
                    <h2
                        className="uppercase tracking-[0.18em] leading-none"
                        style={{
                            fontSize: 30,
                            color: theme.headerText,
                            textShadow: `3px 3px 0 rgba(0,0,0,0.18)`,
                        }}
                    >
                        Mission Report
                    </h2>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span
                            className="text-xs uppercase tracking-widest"
                            style={{ color: theme.headerText, opacity: 0.7 }}
                        >
                            Hero:
                        </span>
                        <span
                            className="uppercase tracking-widest text-[13px]"
                            style={{
                                fontFamily: "'Permanent Marker', cursive",
                                color: theme.headerText,
                            }}
                        >
                            {heroSent}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => setVisible(false)}
                    className="ml-auto text-3xl leading-none transition-opacity hover:opacity-60"
                    style={{
                        fontFamily: "'Permanent Marker', cursive",
                        color: theme.headerText,
                    }}
                >
                    x
                </button>
            </div>

            {/* Status banner */}
            <div
                className="flex items-center justify-between px-5 py-2 border-b-[4px] border-black"
                style={{ background: theme.statusBg }}
            >
                <span
                    className="uppercase tracking-[0.22em]"
                    style={{
                        fontFamily: "'Bangers', cursive",
                        fontSize: 20,
                        color: theme.statusText,
                        textShadow: `2px 2px 0 ${theme.statusBorder}`,
                    }}
                >
                    {theme.statusLabel}
                </span>

                {sabotage && (
                    <div
                        className="border-[3px] border-black px-3 py-0.5"
                        style={{
                            background: "#fff",
                            boxShadow: `3px 3px 0 ${theme.statusBorder}`,
                        }}
                    >
                        <span
                            className="uppercase tracking-widest"
                            style={{
                                fontFamily: "'Permanent Marker', cursive",
                                fontSize: 11,
                                color: "#CC1100",
                            }}
                        >
                            Sabotage Detected
                        </span>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="px-6 pt-5 pb-8 border-b-[5px] border-black bg-white relative overflow-hidden">
                {/* Ben-Day dots */}
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

                {/* Stats cards */}
                <div className="mt-4 flex gap-3">
                    {stats.map(({ label, value }) => (
                        <div
                            key={label}
                            className="flex-1 border-[3px] border-black px-4 py-3 shadow-[4px_4px_0_black] flex flex-col items-center"
                            style={{ background: theme.statsBg }}
                        >
                            <span
                                className="text-[11px] uppercase tracking-widest mb-1"
                                style={{
                                    fontFamily: "'Bangers', cursive",
                                    color: theme.statsText,
                                    opacity: 0.75,
                                }}
                            >
                                {label}
                            </span>
                            <span
                                className="leading-none"
                                style={{
                                    fontFamily: "'Permanent Marker', cursive",
                                    fontSize: 26,
                                    color: theme.statsText,
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

            {/* Footer / action */}
            <div
                className="p-5"
                style={{ background: theme.footerBg }}
            >
                <button
                    onClick={() => setVisible(false)}
                    className="w-full border-4 border-black py-4 uppercase tracking-[0.2em] transition-all active:translate-x-[4px] active:translate-y-[4px]"
                    style={{
                        fontSize: 22,
                        background: "transparent",
                        border: `4px solid ${theme.footerBorder}`,
                        color: theme.footerText,
                        boxShadow: `5px 5px 0 ${theme.footerShadow}`,
                        fontFamily: "'Bangers', cursive",
                    }}
                >
                    Close Report
                </button>
            </div>

            {/* Torn bottom edge */}
            <div className="h-3 overflow-hidden" style={{ background: theme.tornFill }}>
                <svg
                    viewBox="0 0 400 12"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                >
                    <path
                        d="M0,0 L20,8 L40,2 L60,10 L80,3 L100,9 L120,1 L140,8 L160,4 L180,10 L200,2 L220,8 L240,3 L260,9 L280,1 L300,7 L320,3 L340,10 L360,2 L380,8 L400,0 L400,12 L0,12 Z"
                        fill={theme.tornFill}
                        stroke={theme.tornStroke}
                        strokeWidth="1.5"
                    />
                </svg>
            </div>
        </div>
    );
}