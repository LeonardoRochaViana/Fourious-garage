import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

const contactItems = [
  { label: "WhatsApp", value: "(00) 00000-0000", icon: Phone },
  { label: "Instagram", value: "@furiousgarage", icon: Instagram },
  { label: "Endereço", value: "Informe o endereço da Furious Garage", icon: MapPin },
  { label: "Horário", value: "Segunda a sábado, das 08h às 18h", icon: Clock }
];

export default function Contact() {
  return (
    <section id="contato" className="border-b border-garage-line bg-garage-panel py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase text-garage-red">Contato</p>
          <h2 className="red-line mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">Fale com a Furious Garage</h2>
          <p className="mt-7 text-garage-text">
            Tire dúvidas, confirme disponibilidade ou chame direto no WhatsApp para alinhar o melhor serviço para o seu carro.
          </p>
          <a
            href="https://wa.me/5500000000000"
            className="mt-8 inline-flex items-center gap-2 bg-garage-red px-6 py-4 text-sm font-bold uppercase text-white transition hover:bg-red-700"
          >
            <MessageCircle size={18} />
            Chamar no WhatsApp
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {contactItems.map(({ label, value, icon: Icon }) => (
            <article key={label} className="border border-garage-line bg-black p-5">
              <Icon className="mb-4 text-garage-red" size={25} />
              <p className="text-sm font-bold uppercase text-garage-text">{label}</p>
              <p className="mt-2 font-semibold text-white">{value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
