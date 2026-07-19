"use client";

import { useState } from "react";
import { CalendarDays, Menu, X } from "lucide-react";
import { furiousLogo } from "@/data/furiousLogo";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Pacotes", href: "#pacotes" },
  { label: "Agendamento", href: "#agendamento" },
  { label: "Contato", href: "#contato" }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-garage-line bg-garage-black/92 backdrop-blur-xl">
      <div className="section-shell flex min-h-20 items-center justify-between gap-6">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Furious Garage">
          <span className="h-14 w-14 overflow-hidden border border-garage-red bg-black shadow-redGlow">
            <img src={furiousLogo} alt="" className="h-full w-full object-cover" />
          </span>
          <span>
            <span className="block font-display text-2xl font-bold uppercase tracking-normal">Furious Garage</span>
            <span className="block text-xs font-semibold uppercase tracking-normal text-garage-text">Estética Automotiva</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Menu principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-semibold text-zinc-300 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#agendamento"
            className="hidden items-center gap-2 bg-garage-red px-5 py-3 text-sm font-bold uppercase text-white transition hover:bg-red-700 sm:flex"
          >
            <CalendarDays size={18} />
            Agendar agora
          </a>
          <button
            className="grid h-11 w-11 place-items-center border border-garage-line bg-garage-panel lg:hidden"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav className="section-shell grid gap-2 border-t border-garage-line py-4 lg:hidden" aria-label="Menu mobile">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="border border-garage-line bg-garage-panel px-4 py-3 text-sm font-semibold text-zinc-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#agendamento"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-garage-red px-4 py-3 text-sm font-bold uppercase text-white"
          >
            <CalendarDays size={18} />
            Agendar agora
          </a>
        </nav>
      ) : null}
    </header>
  );
}
