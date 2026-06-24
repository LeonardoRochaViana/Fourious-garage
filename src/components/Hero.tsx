import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="garage-grid overflow-hidden border-b border-garage-line">
      <div className="section-shell grid min-h-[calc(100vh-5rem)] items-center gap-10 py-16 lg:grid-cols-[1fr_0.92fr]">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex border border-red-900/70 bg-red-950/30 px-4 py-2 text-xs font-bold uppercase tracking-normal text-red-200">
            Detalhamento automotivo premium
          </p>
          <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Seu carro com aparência de zero novamente
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            Limpeza, higienização e estética automotiva premium para quem valoriza cada detalhe do veículo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#agendamento"
              className="inline-flex items-center justify-center gap-2 bg-garage-red px-6 py-4 text-sm font-bold uppercase text-white transition hover:bg-red-700"
            >
              Agendar serviço
              <ArrowRight size={18} />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center border border-garage-line bg-garage-panel px-6 py-4 text-sm font-bold uppercase text-white transition hover:border-garage-red"
            >
              Ver serviços
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-garage-text">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={18} className="text-garage-red" /> Produtos profissionais
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={18} className="text-garage-red" /> Horário marcado
            </span>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden border border-garage-line bg-garage-panel p-6 shadow-redGlow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(220,38,38,0.32),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_34%)]" />
          <div className="absolute left-8 right-8 top-10 h-1 bg-gradient-to-r from-transparent via-garage-red to-transparent" />
          <div className="absolute bottom-20 left-1/2 h-28 w-[86%] -translate-x-1/2 rounded-t-[90px] border-2 border-red-700/70 bg-black/70 shadow-redGlow">
            <div className="absolute left-[14%] top-8 h-8 w-[28%] skew-x-[-18deg] border border-red-500/60 bg-zinc-900" />
            <div className="absolute right-[14%] top-8 h-8 w-[28%] skew-x-[18deg] border border-red-500/60 bg-zinc-900" />
            <div className="absolute bottom-3 left-[12%] h-12 w-12 rounded-full border-4 border-zinc-700 bg-black" />
            <div className="absolute bottom-3 right-[12%] h-12 w-12 rounded-full border-4 border-zinc-700 bg-black" />
          </div>
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between border-t border-garage-line pt-5 text-xs font-bold uppercase text-zinc-400">
            <span>Garage detail</span>
            <span className="text-garage-red">Premium finish</span>
          </div>
        </div>
      </div>
    </section>
  );
}
