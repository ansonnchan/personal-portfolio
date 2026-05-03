import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anson's Terminal",
  description: "A command-line portfolio"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
