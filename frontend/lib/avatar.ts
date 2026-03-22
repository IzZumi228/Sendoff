export type AvatarVariant = "female" | "male" | "mutant";

const HEADSHOT_POOL: Record<AvatarVariant, string[]> = {
  female: ["/headshots/female-1.png", "/headshots/female-2.png"],
  male: ["/headshots/male-1.png", "/headshots/male-2.png"],
  mutant: [
    "/headshots/mutant-1.png",
    "/headshots/mutant-2.png",
    "/headshots/mutant-3.png",
  ],
};

const VARIANTS: AvatarVariant[] = ["female", "male", "mutant"];
const usedHeadshots = new Set<string>();
const ALL_HEADSHOTS = VARIANTS.flatMap((variant) =>
  HEADSHOT_POOL[variant].map((imgUrl) => ({ variant, imgUrl })),
);

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function pickRandomAvatar(): { variant: AvatarVariant; imgUrl: string } {
  let available = ALL_HEADSHOTS.filter(({ imgUrl }) => !usedHeadshots.has(imgUrl));

  // When every image has been used once, start a new cycle.
  if (available.length === 0) {
    usedHeadshots.clear();
    available = ALL_HEADSHOTS;
  }

  const selected = available[randomInt(available.length)];
  if (!selected) {
    return { variant: "male", imgUrl: "/event-mark.png" };
  }

  usedHeadshots.add(selected.imgUrl);
  return selected;
}
