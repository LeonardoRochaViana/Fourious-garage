import { Check, Star } from "lucide-react";
import { servicePackages } from "@/data/packages";

export default function Packages() {
  return (
    <section id="pacotes" className="border-b border-garage-line bg-black/25 py-20">
      <div className="section-shell">
        <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-garage-red">Pacotes</p>
            <h2 className="red-line mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">Escolha o nível de acabamento</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-garage-text">
            Combinações prontas para facilitar sua reserva e entregar resultado consistente do básico ao premium.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {servicePackages.map((pack) => (
            <article
              key={pack.name}
              className={`relative flex min-h-[430px] flex-col border p-6 ${
                pack.featured ? "border-garage-red bg-red-950/20 shadow-redGlow" : "border-garage-line bg-garage-panel"
              }`}
            >
              {pack.featured ? (
                <span className="absolute right-5 top-5 inline-flex items-center gap-2 bg-garage-red px-3 py-2 text-xs font-bold uppercase">
                  <Star size={14} />
                  Mais escolhido
                </span>
              ) : null}
              <h3 className="font-display text-3xl font-bold uppercase">{pack.name}</h3>
              <p className="mt-4 font-display text-5xl font-bold text-white">{pack.price}</p>
              <ul className="mt-7 flex-1 space-y-4 text-sm text-zinc-300">
                {pack.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-garage-red" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#agendamento" className="mt-8 inline-flex justify-center bg-white px-5 py-4 text-sm font-bold uppercase text-black transition hover:bg-garage-red hover:text-white">
                Reservar pacote
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
