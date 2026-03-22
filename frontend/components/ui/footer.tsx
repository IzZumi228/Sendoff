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
<<<<<<< Updated upstream
  { name: "Batman",          imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/639.jpg", skillsArr:{
  name: "Green X",
  power: 30,
  strength: 37,
  magic: 76,
  intelligence: 74,
  speed: 92,
  defense: 89,
  poison: 7,
  rage: 31,
  corrupted: 24,
  evilness: 48,
  age: 33.83,
  personality: "Sarcastic",
  hometown: "Hong Kong",
  favoriteColor: "0x9251B",
  weakness: "Fearful",
  height: "16' 0''",
  weight: 58.01804,
  isVillain: false,
  isLiving: false,
  isEmployed: false,
  isHuman: true
  } },
  { name: "Captain America", imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/274.jpg",skillsArr:{
  power: 92,
  strength: 43,
  magic: 66,
  intelligence: 78,
  speed: 51,
  defense: 82,
  poison: 0,
  rage: 13,
  corrupted: 45,
  evilness: 0,
  age: 23.46,
  personality: "Sadistic",
  hometown: "Zhengzhou",
  favoriteColor: "0x52DEFF",
  weakness: "Soft hearted",
  height: "17' 2''",
  weight: 234.36007,
  isVillain: false,
  isLiving: false,
  isEmployed: true,
  isHuman: false
  }  },
  { name: "Deadpool",        imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/835.jpg",skillsArr:{
  power: 64,
  strength: 0,
  magic: 40,
  intelligence: 100,
  speed: 80,
  defense: 11,
  poison: 50,
  rage: 28,
  corrupted: 42,
  evilness: 100,
  age: 18.0,
  personality: "Power hungry",
  hometown: "Porto Alegre",
  favoriteColor: "0xA130BB",
  weakness: "Prideful",
  height: "8' 3''",
  weight: 51.02968,
  isVillain: false,
  isLiving: false,
  isEmployed: true,
  isHuman: false
  }  },
  { name: "Flash",           imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/891.jpg",skillsArr:{
  power: 76,
  strength: 51,
  magic: 89,
  intelligence: 89,
  speed: 63,
  defense: 60,
  poison: 45,
  rage: 82,
  corrupted: 20,
  evilness: 7,
  age: 43.31,
  personality: "Sarcastic",
  hometown: "Buenos Aires",
  favoriteColor: "0xE54430",
  weakness: "Obsessive",
  height: "16' 3''",
  weight: 207.13496,
  isVillain: true,
  isLiving: false,
  isEmployed: true,
  isHuman: true
  }  },
  { name: "Green Lantern",   imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/697.jpg",skillsArr:{
  name: "Dark Girl",
  power: 8,
  strength: 14,
  magic: 54,
  intelligence: 6,
  speed: 10,
  defense: 3,
  poison: 45,
  rage: 9,
  corrupted: 30,
  evilness: 18,
  age: 26.27,
  personality: "Calculating",
  hometown: "Shenyang",
  favoriteColor: "0x7A3047",
  weakness: "Power addicted",
  height: "4' 9''",
  weight: 9.74529,
  isVillain: true,
  isLiving: true,
  isEmployed: false,
  isHuman: false
  }  },
 ] satisfies HeroCard[];
=======
  { name: "Batman",          imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/639.jpg"  },
  { name: "Captain America", imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/274.jpg"  },
  { name: "Deadpool",        imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/835.jpg"  },
  { name: "Flash",           imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/891.jpg"  },
  { name: "Green Lantern",   imgUrl: "https://www.superherodb.com/pictures2/portraits/10/100/697.jpg"  },
];
>>>>>>> Stashed changes

export function Footer() {
  const [selectedHero, setSelectedHero] = useState<HeroCard | null>(null);

  return (
    <>
      <footer
        className="relative border-t-4 border-black bg-[#f9f9f9] pt-6 overflow-hidden"
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

<<<<<<< Updated upstream
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
        imageUrl={selectedHero?.imgUrl}
        onClose={() => setSelectedHero(null)}
      />
=======
      {/* Bottom colophon */}
      <div
        className="relative z-10 mt-5 border-t-4 border-black bg-black py-2 text-center"
      >
        <span
          className="text-[12px] uppercase tracking-[0.22em] text-[#FFE600]"
          style={{ fontFamily: "'Bangers', cursive" }}
        >
          © Sendoff HQ — All heroes on standby
        </span>
      </div>
    </footer>
>>>>>>> Stashed changes
    </>
  );
}