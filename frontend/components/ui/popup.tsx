"use client";

export type HeroSkills = Record<string, number>;

type PopupProps = {
  isOpen: boolean;
  heroName: string;
  skillsArr: HeroSkills;
  onClose: () => void;
};

export default function Popup({
  isOpen,
  heroName,
  skillsArr,
  onClose,
}: PopupProps) {
  if (!isOpen) return null;

  const stats = Object.entries(skillsArr);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-lg overflow-hidden border-[5px] border-black bg-white shadow-[10px_10px_0_black]">
        <div className="flex items-center justify-between gap-4 border-b-[5px] border-black bg-black px-5 py-4">
          <h2
            className="text-3xl uppercase tracking-[0.15em] text-white"
            style={{
              fontFamily: "'Bangers', cursive",
              textShadow: "3px 3px 0 #f5e642",
            }}
          >
            {heroName}
          </h2>
          <button
            onClick={onClose}
            className="border-2 border-white px-2 text-xl text-white transition hover:bg-white hover:text-black"
            aria-label="Close popup"
          >
            ✕
          </button>
        </div>

        <div className="relative border-b-[5px] border-black bg-white px-6 py-6">
          <div
            className="pointer-events-none absolute right-0 top-0 h-24 w-24 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1.5px, transparent 1.5px)",
              backgroundSize: "8px 8px",
            }}
          />

          <div className="mb-4 flex items-center gap-2">
            <div className="h-[3px] w-4 bg-black" />
            <span
              className="text-sm uppercase tracking-[0.18em] text-black"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              Hero Stats
            </span>
            <div className="h-[3px] flex-1 bg-black" />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {stats.map(([statName, statValue]) => (
              <div
                key={statName}
                className="grid items-center gap-3 border-2 border-black bg-[#fff7cc] px-3 py-2 shadow-[3px_3px_0_#111]"
              >
                <span
                  className="uppercase text-black"
                  style={{
                    fontFamily: "'Bangers', cursive",
                    letterSpacing: "0.08em",
                    fontWeight: 700,
                  }}
                >
                  {statName}
                </span>
                <span
                  className="min-w-14 border-2 border-black bg-[#FF3B3B] px-2 py-0.5 text-center text-white"
                  style={{
                    fontFamily: "'Bangers', cursive",
                    letterSpacing: "0.08em",
                    WebkitTextStroke: "0.4px #111",
                  }}
                >
                  {statValue}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f5e642] p-3">
          <button
            onClick={onClose}
            className="w-full border-4 border-black bg-white py-3 text-xl uppercase tracking-[0.2em] text-black shadow-[5px_5px_0_black] transition-all hover:bg-[#eee] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0_black]"
            style={{ fontFamily: "'Bangers', cursive" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}