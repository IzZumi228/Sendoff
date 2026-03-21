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
    <footer className="supports-backdrop-filter:bg-background/70 border-t bg-background/95 py-3 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-center">
        <nav aria-label="Footer links">
          <ul className="flex flex-wrap gap-3">
            {heroDashboard.map((hero) => (
              <li key={hero.name}>
                <div className="flex items-center gap-2 flex-col ">
                  <Image
                    className="rounded-sm"
                    src={hero.imgUrl}
                    alt={hero.name}
                    width={100}
                    height={100}
                  />
                  <span className="transition-colors hover:text-foreground text-xl">{hero.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
