import { Clock, Gauge } from "lucide-react";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="servicos" className="border-b border-garage-line py-20">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-bold uppercase text-garage-red">Serviços</p>
          <h2 className="red-line mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">Tratamento certo para cada detalhe</h2>
          <p className="mt-7 text-garage-text">
            Da lavagem de manutenção ao acabamento técnico, cada serviço é executado com processo, cuidado e produto profissional.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article key={service.id} className="flex min-h-[310px] flex-col border border-garage-line bg-garage-panel p-5 transition hover:-translate-y-1 hover:border-garage-red">
              <div className="mb-5 flex h-11 w-11 items-center justify-center bg-red-950/60 text-garage-red">
                <Gauge size={22} />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase">{service.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-garage-text">{service.description}</p>
              <div className="mt-5 space-y-2 border-t border-garage-line pt-4 text-sm">
                <p className="flex items-center gap-2 text-zinc-300">
                  <Clock size={16} className="text-garage-red" />
                  {service.duration}
                </p>
                <p className="font-bold text-white">{service.price}</p>
              </div>
              <a href="#agendamento" className="mt-5 inline-flex justify-center border border-garage-red px-4 py-3 text-sm font-bold uppercase text-white transition hover:bg-garage-red">
                Agendar
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
