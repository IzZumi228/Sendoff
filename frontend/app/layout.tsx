import type { Metadata } from "next";
import { Bangers, Geist_Mono } from "next/font/google";
import "./globals.css";

const comicSans = Bangers({
  variable: "--font-comic",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sendoff Dashboard",
  description: "Sendoff operational dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${comicSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
