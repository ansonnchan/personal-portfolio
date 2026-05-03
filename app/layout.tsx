import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "System Interface Portfolio",
  description: "A command-driven portfolio interface."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
