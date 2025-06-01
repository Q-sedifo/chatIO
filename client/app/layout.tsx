import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FilmMate",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#121212] text-[#E0E0E0]">
        {children}
      </body>
    </html>
  );
}
