import { BadgeCheck, CalendarClock, Gem, Handshake, Shield, Wrench } from "lucide-react";

const differentials = [
  { title: "Atendimento com horário marcado", icon: CalendarClock },
  { title: "Produtos profissionais", icon: BadgeCheck },
  { title: "Cuidado detalhado", icon: Gem },
  { title: "Acabamento premium", icon: Wrench },
  { title: "Segurança no processo", icon: Shield },
  { title: "Serviço personalizado por veículo", icon: Handshake }
];

export default function Differentials() {
  return (
    <section className="border-b border-garage-line py-20">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-bold uppercase text-garage-red">Diferenciais</p>
          <h2 className="red-line mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">Processo pensado para valorizar seu veículo</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map(({ title, icon: Icon }) => (
            <article key={title} className="flex min-h-32 items-center gap-4 border border-garage-line bg-garage-panel p-5 transition hover:border-garage-red">
              <div className="grid h-12 w-12 shrink-0 place-items-center bg-red-950/60 text-garage-red">
                <Icon size={23} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase leading-tight">{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
