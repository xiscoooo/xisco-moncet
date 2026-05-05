import type { Metadata } from "next";
import { EB_Garamond, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xisco Moncet · Founder & Data Scientist",
  description:
    "CEO & co-founder of Saména. Data Science at Télécom Paris. Notes from the intersection of research, product, and shipping.",
  metadataBase: new URL("https://xisco.dev"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${garamond.variable} ${cormorant.variable} ${mono.variable}`}>
      <body className="bg-[#f5f1e8] text-[#1a1612] antialiased font-serif selection:bg-[#1a1612] selection:text-[#f5f1e8] cursor-none-md">
        {children}
      </body>
    </html>
  );
}
