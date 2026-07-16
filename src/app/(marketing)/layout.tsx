import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./landing.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-landing",
  display: "swap",
});

export default function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div className={`${inter.variable} landing-scope`}>{children}</div>;
}
