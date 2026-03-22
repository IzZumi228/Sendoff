"use client";

import { useState } from "react";
import Image from "next/image";
import Popup, { type HeroSkills } from "./popup";

type HeroCard = {
  name: string;
  imgUrl: string;
  skillsArr: HeroSkills;
};

const heroDashboard = [
  { name: "Batman",          imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/639.jpg", skillsArr:{
    "Strength": 100,
    "Speed": 100,
    "Agility": 100,
    "Endurance": 100,
    "Intelligence": 100,
    "Willpower": 100,
    "Power": 100,
    "Combat": 100,
    "Stealth": 100,
    "Leadership": 100,
    "Strategy": 100,
  } },
  { name: "Captain America", imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/274.jpg",skillsArr:{
    "Strength": 100,
    "Speed": 100,
    "Agility": 100,
    "Endurance": 100,
    "Intelligence": 100,
    "Willpower": 100,
    "Power": 100,
    "Combat": 100,
    "Stealth": 100,
    "Leadership": 100,
    "Strategy": 100,
  }  },
  { name: "Deadpool",        imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/835.jpg",skillsArr:{
    "Strength": 100,
    "Speed": 100,
    "Agility": 100,
    "Endurance": 100,
    "Intelligence": 100,
    "Willpower": 100,
    "Power": 100,
    "Combat": 100,
    "Stealth": 100,
    "Leadership": 100,
    "Strategy": 100,
  }  },
  { name: "Flash",           imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/891.jpg",skillsArr:{
    "Strength": 100,
    "Speed": 100,
    "Agility": 100,
    "Endurance": 100,
    "Intelligence": 100,
    "Willpower": 100,
    "Power": 100,
    "Combat": 100,
    "Stealth": 100,
    "Leadership": 100,
    "Strategy": 100,
  }  },
  { name: "Green Lantern",   imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/697.jpg",skillsArr:{
    "Strength": 100,
    "Speed": 100,
    "Agility": 100,
    "Endurance": 100,
    "Intelligence": 100,
    "Willpower": 100,
    "Power": 100,
    "Combat": 100,
    "Stealth": 100,
    "Leadership": 100,
    "Strategy": 100,
  }  },
 ] satisfies HeroCard[];

export function Footer() {
  const [selectedHero, setSelectedHero] = useState<HeroCard | null>(null);

  return (
    <>
      <footer
        className="relative border-t-4 border-black bg-[#f9f9f9] py-6 overflow-hidden"
        style={{
          boxShadow: "0 -6px 0 #111",
          backgroundImage: `
          radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px),
          radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)
        `,
          backgroundSize: "12px 12px, 12px 12px",
          backgroundPosition: "0 0, 6px 6px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Panel caption strip */}
        <div className="relative z-10 mb-4 flex items-center gap-3 px-6">
          <div className="h-[3px] flex-1 bg-black" />
          <span
            className="px-3 text-[13px] uppercase tracking-[0.2em] text-black"
            style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.22em" }}
          >
            The Roster
          </span>
          <div className="h-[3px] flex-1 bg-black" />
        </div>

        {/* Hero cards */}
        <nav aria-label="Footer hero roster" className="relative z-10">
          <ul className="mx-auto flex w-full max-w-4xl flex-wrap justify-center gap-5 px-4">
            {heroDashboard.map((hero) => (
              <li key={hero.name}>
                <button
                  onClick={() => setSelectedHero(hero)}
                  className={[
                    "group flex cursor-pointer flex-col items-center gap-0 overflow-hidden",
                    "border-4 border-black bg-white",
                    "shadow-[6px_6px_0_#111]",
                    "transition-all duration-75",
                    "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_#111]",
                  ].join(" ")}
                  style={{ width: 110 }}
                >
                  <div className="relative w-full overflow-hidden border-b-4 border-black">
                    <Image
                      src={hero.imgUrl}
                      alt={hero.name}
                      width={110}
                      height={110}
                      className="block w-full object-cover transition-transform duration-150 group-hover:scale-105"
                      style={{ display: "block" }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
                      style={{
                        background:
                          "repeating-linear-gradient(135deg, transparent 0px, transparent 6px, rgba(255,230,0,0.18) 6px, rgba(255,230,0,0.18) 7px)",
                      }}
                    />
                  </div>

                  <div className="w-full bg-[#FF3B3B] px-2 py-1.5 text-center">
                    <span
                      className="block text-[13px] uppercase leading-tight tracking-[0.08em] text-white transition-colors group-hover:text-[#FFE600]"
                      style={{
                        fontFamily: "'Bangers', cursive",
                        letterSpacing: "0.1em",
                        WebkitTextStroke: "0.4px #111",
                        textShadow: "1px 1px 0 rgba(0,0,0,0.4)",
                      }}
                    >
                      {hero.name}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom colophon */}
        <div className="relative z-10 mt-5 border-t-4 border-black bg-black py-2 text-center">
          <span
            className="text-[12px] uppercase tracking-[0.22em] text-[#FFE600]"
            style={{ fontFamily: "'Bangers', cursive" }}
          >
            © Sendoff HQ — All heroes on standby
          </span>
        </div>
      </footer>

      <Popup
        isOpen={selectedHero !== null}
        heroName={selectedHero?.name ?? ""}
        skillsArr={selectedHero?.skillsArr ?? {}}
        onClose={() => setSelectedHero(null)}
      />
    </>
  );
}