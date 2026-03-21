
const footerLinks = [
  { label: "About", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Privacy", href: "#" },
];

export function Footer() {
  return (
    <footer className="supports-backdrop-filter:bg-background/70 border-t bg-background/95 py-3 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2077 Sendoff. All rights reserved.</p>
        <nav aria-label="Footer links">
          <ul className="flex flex-wrap gap-3">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a className="transition-colors hover:text-foreground" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
