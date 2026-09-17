import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus — Intelligent Infrastructure for AI",
  description:
    "Nexus gives you one API to access, route and scale the world's best AI models across any infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
