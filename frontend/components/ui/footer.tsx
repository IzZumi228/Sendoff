import Image from "next/image";
const heroDashboard = [
 {name:"Batman ", imgUrl:"https://www.superherodb.com/pictures2/portraits/10/100/639.jpg"},
 {name:"Captain America ", imgUrl:"https://www.superherodb.com/pictures2/portraits/10/100/274.jpg"},
 {name:"Deadpool ", imgUrl:"https://www.superherodb.com/pictures2/portraits/10/100/835.jpg"},
 {name:"Flash ", imgUrl:"https://www.superherodb.com/pictures2/portraits/10/100/891.jpg"},
 {name:"Green Lantern ", imgUrl:"https://www.superherodb.com/pictures2/portraits/10/100/697.jpg"},
];

export function Footer() {
  return (
    <footer className="supports-backdrop-filter:bg-background/70 border-t-4 border-border bg-accent/90 py-4 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 text-xs text-foreground sm:flex-row sm:items-center sm:justify-center">
        <nav aria-label="Footer links">
          <ul className="flex flex-wrap gap-4">
            {heroDashboard.map((hero) => (
              <li key={hero.name}>
                <div className="flex flex-col items-center gap-2 rounded-md border-[3px] border-border bg-background px-2 py-2 shadow-[4px_4px_0_#111]">
                  <Image
                    className="rounded-sm border-2 border-border"
                    src={hero.imgUrl}
                    alt={hero.name}
                    width={100}
                    height={100}
                  />
                  <span className="text-xl tracking-wide transition-colors hover:text-primary">{hero.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
