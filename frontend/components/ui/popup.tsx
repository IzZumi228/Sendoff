"use client";

import Image from "next/image";
import { Bangers } from "next/font/google";

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
});

export type HeroSkills = Record<string, string | number | boolean>;

export type PopupMissionContext = {
  name: string;
  bonusPersonality: string;
  penaltyWeaknesses: string[];
};

type PopupProps = {
  isOpen: boolean;
  heroName: string;
  skillsArr: HeroSkills;
  onClose: () => void;
  onSendHero: () => void;
  imageUrl?: string;
  missionContext?: PopupMissionContext | null;
};

type SkillKey =
  | "Power"
  | "Strength"
  | "Magic"
  | "Intelligence"
  | "Speed"
  | "Defense"
  | "Poison"
  | "Rage"
  | "Corrupted"
  | "Evilness";

const SKILL_KEYS: SkillKey[] = [
  "Power",
  "Strength",
  "Magic",
  "Intelligence",
  "Speed",
  "Defense",
  "Poison",
  "Rage",
  "Corrupted",
  "Evilness",
];

const SKILL_BG: Record<SkillKey, { bg: string; border: string; shadow: string }> = {
  Power: { bg: "#FF4500", border: "#8B1A00", shadow: "#8B1A00" },
  Strength: { bg: "#E8A020", border: "#7a4a00", shadow: "#7a4a00" },
  Magic: { bg: "#7B2FBE", border: "#3a006e", shadow: "#3a006e" },
  Intelligence: { bg: "#1A8FE3", border: "#0a4070", shadow: "#0a4070" },
  Speed: { bg: "#00C2A0", border: "#005a49", shadow: "#005a49" },
  Defense: { bg: "#4A6FA5", border: "#1a2f52", shadow: "#1a2f52" },
  Poison: { bg: "#5DB329", border: "#2a5a00", shadow: "#2a5a00" },
  Rage: { bg: "#CC1100", border: "#5a0000", shadow: "#5a0000" },
  Corrupted: { bg: "#1a1a2e", border: "#6d00b3", shadow: "#6d00b3" },
  Evilness: { bg: "#0d0d0d", border: "#3a0000", shadow: "#3a0000" },
};

export default function Popup({
  isOpen,
  heroName,
  skillsArr,
  onClose,
  onSendHero,
  imageUrl,
  missionContext,
}: PopupProps) {
  if (!isOpen) return null;

  const normalizedSkills = Object.fromEntries(
    Object.entries(skillsArr).map(([key, value]) => [key.toLowerCase(), value]),
  );

  const successRateRaw = Number(
    normalizedSkills["final_score"] ?? normalizedSkills["finalscore"] ?? 0,
  );
  const successRate = Number.isFinite(successRateRaw)
    ? Math.max(0, Math.min(100, successRateRaw / 2))
    : 0;
  const successTier =
    successRate >= 85 ? "S-Tier" : successRate >= 70 ? "A-Tier" : successRate >= 50 ? "B-Tier" : "C-Tier";

  const heroPersonality = String(normalizedSkills["personality"] ?? "").toLowerCase();
  const heroWeakness = String(normalizedSkills["weakness"] ?? "").toLowerCase();
  const bonusPersonality = missionContext?.bonusPersonality.toLowerCase() ?? "";
  const penaltyWeaknesses = (missionContext?.penaltyWeaknesses ?? []).map((weakness) =>
    weakness.toLowerCase(),
  );
  const hasPersonalityBonus =
    heroPersonality && heroPersonality === bonusPersonality;
  const hasWeaknessPenalty =
    heroWeakness && penaltyWeaknesses.includes(heroWeakness);

  const personalityValue = String(normalizedSkills["personality"] ?? "");
  const weaknessValue = String(normalizedSkills["weakness"] ?? "");

  const normalizedFlagMap = Object.fromEntries(
    Object.entries(skillsArr).map(([key, value]) => [
      key.toLowerCase().replace(/[^a-z0-9]/g, ""),
      value,
    ]),
  );
  const isVillainRaw =
    normalizedFlagMap["isvillain"] ??
    normalizedFlagMap["villain"] ??
    normalizedSkills["isvillain"];
  const isVillainString = String(isVillainRaw ?? "").toLowerCase().trim();
  const isVillain =
    isVillainRaw === true ||
    isVillainRaw === 1 ||
    isVillainRaw === "1" ||
    isVillainString === "true" ||
    isVillainString === "yes";
  const roleLabel = isVillain ? "Villain" : "Hero";

  const formatProfileValue = (label: string, value: string | number | boolean) => {
    if (label === "Age") {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? String(Math.floor(parsed)) : String(value);
    }

    if (label === "Weight") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return (Math.ceil(parsed * 10) / 10).toFixed(1);
      }
      return String(value);
    }

    return String(value);
  };

  const profileStats = [
    { label: "Hometown", value: normalizedSkills["hometown"] },
    { label: "Age", value: normalizedSkills["age"] },
    { label: "Weight", value: normalizedSkills["weight"] },
    { label: "Height", value: normalizedSkills["height"] },
  ]
    .filter((item) => item.value !== undefined && item.value !== null && String(item.value).trim() !== "")
    .map((item) => `${item.label}: ${formatProfileValue(item.label, item.value)}`);

  return (
    <div
      className={`${bangers.className} fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4`}
    >
      <div className="w-full max-w-md border-4 border-black bg-[#fefae8] p-4 shadow-[8px_8px_0_#111]">
        <div className="mb-4 flex items-center gap-3 border-b-4 border-black pb-3">
          <div className="size-14 overflow-hidden rounded-full border-4 border-black bg-[#2b80d9] shadow-[3px_3px_0_#111]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={heroName}
                width={56}
                height={56}
                className="size-full object-cover"
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <span
                className={[
                  "border-2 border-black px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] shadow-[2px_2px_0_#111]",
                  isVillain ? "bg-red-600 text-white" : "bg-green-600 text-white",
                ].join(" ")}
              >
                {roleLabel}
              </span>
              <p className="inline-block bg-[#ffd900] px-2 py-0.5 text-lg uppercase tracking-wider text-black">
                {heroName}
              </p>
            </div>
            {profileStats.length > 0 ? (
              <p className="text-[11px] text-black/55">
                {profileStats.join("   ·   ")}
              </p>
            ) : null}
          </div>
          <button
            onClick={onClose}
            className="ml-auto border-2 border-black bg-white px-2 py-1 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_#111] hover:bg-[#ffd900]"
          >
            Close
          </button>
        </div>

        <div className="mb-4 max-h-80 space-y-4 overflow-auto pr-1">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-black/80">
              Skill Match
            </p>
            <div className="flex flex-wrap gap-x-2 gap-y-3">
              {SKILL_KEYS.map((skill) => {
                const raw = normalizedSkills[skill.toLowerCase()];
                const value = typeof raw === "number" ? raw : Number(raw ?? 0);
                const parsedValue = Number.isFinite(value) ? value : 0;
                const { bg, border, shadow } = SKILL_BG[skill];

                return (
                  <div key={skill} className="flex flex-col items-center gap-1" title={skill}>
                    <div
                      className="relative flex h-[52px] w-[52px] items-center justify-center"
                      style={{
                        background: bg,
                        border: `3px solid ${border}`,
                        boxShadow: `3px 3px 0 ${shadow}`,
                        clipPath:
                          "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)",
                      }}
                    >
                      <Image
                        src={`/badges/${skill.toLowerCase()}.png`}
                        alt={skill}
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <span className="max-w-[54px] truncate text-center text-[10px] uppercase tracking-wide leading-none text-black">
                      {skill}
                    </span>
                    <span className="border-2 border-black bg-white px-1 text-[9px] uppercase">
                      {parsedValue}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {(personalityValue || weaknessValue) && (
            <div className="flex gap-3">
              {personalityValue && (
                <div
                  className={[
                    "flex-1 border-2 border-black px-3 py-2 shadow-[3px_3px_0_black]",
                    hasPersonalityBonus ? "bg-green-50" : "bg-white",
                  ].join(" ")}
                >
                  <p
                    className={[
                      "mb-1 text-[11px] uppercase tracking-widest",
                      hasPersonalityBonus ? "text-green-800" : "text-black",
                    ].join(" ")}
                  >
                    ✦ Bonus Personality
                  </p>
                  <p
                    className={[
                      "text-[15px]",
                      hasPersonalityBonus ? "text-green-900" : "text-black",
                    ].join(" ")}
                  >
                    {personalityValue} {hasPersonalityBonus ? "+10% to success points" : ""}
                  </p>
                </div>
              )}
              {weaknessValue && (
                <div
                  className={[
                    "flex-1 border-2 border-black px-3 py-2 shadow-[3px_3px_0_black]",
                    hasWeaknessPenalty ? "bg-red-50" : "bg-white",
                  ].join(" ")}
                >
                  <p
                    className={[
                      "mb-1 text-[11px] uppercase tracking-widest",
                      hasWeaknessPenalty ? "text-red-800" : "text-black",
                    ].join(" ")}
                  >
                    ✕ Penalty Weakness {penaltyWeaknesses ? "-5% from success points" : ""}
                  </p>
                  <p
                    className={[
                      "text-[15px]",
                      hasWeaknessPenalty ? "text-red-900" : "text-black",
                    ].join(" ")}
                  >
                    {weaknessValue}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="border-2 border-black bg-[#111] px-3 py-2 text-white shadow-[4px_4px_0_#000]">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5e642]">
              Mission Readiness
            </p>
            <div className="mt-1 flex items-end justify-between">
              <p className="text-2xl uppercase leading-none text-[#f5e642]">
                {successRate.toFixed(1)}%
              </p>
              <span className="border-2 border-[#f5e642] bg-black px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-[#f5e642]">
                {successTier}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onSendHero}
          className="w-full border-4 border-black bg-[#ffd900] py-2 text-sm uppercase tracking-[0.2em] text-black shadow-[4px_4px_0_#111] hover:bg-[#ff3b3b] hover:text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#111]"
        >
          Send A Hero
        </button>
      </div>
    </div>
  );
}
