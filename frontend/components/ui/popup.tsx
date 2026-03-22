"use client";

import Image from "next/image";
import { Bangers } from "next/font/google";

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
});

export type HeroSkills = Record<string, string | number | boolean>;

type PopupProps = {
  isOpen: boolean;
  heroName: string;
  skillsArr: HeroSkills;
  onClose: () => void;
  onSendHero: () => void;
  imageUrl?: string;
};

export default function Popup({
  isOpen,
  heroName,
  skillsArr,
  onClose,
  onSendHero,
  imageUrl,
}: PopupProps) {
  if (!isOpen) return null;

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
            <p className="inline-block bg-[#ffd900] px-2 py-0.5 text-lg uppercase tracking-wider text-black">
              {heroName}
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-black/70">
              Hero Profile
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto border-2 border-black bg-white px-2 py-1 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_#111] hover:bg-[#ffd900]"
          >
            Close
          </button>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-black/80">
            Stats
          </p>
          <div className="max-h-72 space-y-2 overflow-auto pr-1">
            {Object.entries(skillsArr).map(([statName, statValue]) => (
              <div
                key={statName}
                className="grid grid-cols-[1fr_auto] items-center gap-2 border-2 border-black bg-white px-3 py-2 shadow-[2px_2px_0_#111]"
              >
                <span className="truncate text-sm uppercase tracking-[0.08em] text-black">
                  {statName}
                </span>
                <span className="border-2 border-black bg-[#ff3b3b] px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-white">
                  {String(statValue)}
                </span>
              </div>
            ))}
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
