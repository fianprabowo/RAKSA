import type { ReactNode } from "react";
import { Inter } from "next/font/google";

// Avenir is a licensed font (bundled on Apple devices as "Avenir Next").
// We prefer it via the font stack in globals.css, and load Inter as a
// close web fallback for non-Apple platforms where Avenir is unavailable.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-auth-fallback",
  display: "swap",
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className={`${inter.variable} auth-scope`}>{children}</div>;
}
