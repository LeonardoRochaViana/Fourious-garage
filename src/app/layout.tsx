import type { Metadata } from "next";
import { Rajdhani, Sora } from "next/font/google";
import "./globals.css";
import { furiousLogo } from "@/data/furiousLogo";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Furious Garage | Estética Automotiva",
  description: "Limpeza, higienização e estética automotiva premium com agendamento online.",
  icons: { icon: furiousLogo, shortcut: furiousLogo, apple: furiousLogo }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${rajdhani.variable} ${sora.variable}`}>{children}</body>
    </html>
  );
}
