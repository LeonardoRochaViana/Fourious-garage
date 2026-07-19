import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { furiousLogo } from "@/data/furiousLogo";

export default function Hero() {
  return (
    <section id="inicio" className="garage-grid relative overflow-hidden border-b border-garage-line">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(220,38,38,0.18),transparent_32%)]" />
      <div className="section-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1fr_0.92fr]">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 border border-red-900/70 bg-red-950/30 px-4 py-2 text-xs font-bold uppercase tracking-wide text-red-200">
            <Sparkles size={15} /> Detalhamento automotivo premium
          </p>
          <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Seu carro com aparência de zero novamente
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            Limpeza, higienização e estética automotiva premium para quem valoriza cada detalhe do veículo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#agendamento" className="inline-flex items-center justify-center gap-2 bg-garage-red px-6 py-4 text-sm font-bold uppercase text-white transition hover:bg-red-700">
              Agendar serviço <ArrowRight size={18} />
            </a>
            <a href="#servicos" className="inline-flex items-center justify-center border border-garage-line bg-garage-panel px-6 py-4 text-sm font-bold uppercase text-white transition hover:border-garage-red">
              Ver serviços
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-5 text-sm text-garage-text">
            <span className="inline-flex items-center gap-2"><ShieldCheck size={18} className="text-garage-red" /> Produtos profissionais</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck size={18} className="text-garage-red" /> Horário marcado</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[620px]">
          <div className="absolute -inset-5 bg-garage-red/10 blur-3xl" />
          <div className="relative overflow-hidden border border-red-900/70 bg-black shadow-[0_0_80px_rgba(220,38,38,0.18)]">
            <div className="absolute left-0 top-0 h-1 w-28 bg-garage-red" />
            <div className="absolute right-0 top-0 h-1 w-28 bg-garage-red" />
            <img src={furiousLogo} alt="Furious Garage Estética Automotiva" className="aspect-square w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-red-950 bg-black/90 px-5 py-4 text-xs font-bold uppercase tracking-wider backdrop-blur">
              <span className="text-zinc-400">Estética automotiva</span>
              <span className="text-garage-red">Furious Garage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
