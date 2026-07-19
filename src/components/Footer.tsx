const links = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Pacotes", href: "#pacotes" },
  { label: "Agendamento", href: "#agendamento" },
  { label: "Contato", href: "#contato" }
];

export default function Footer() {
  return (
    <footer className="bg-garage-black py-10">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-3xl font-bold uppercase">Furious Garage</p>
          <p className="text-sm font-semibold uppercase text-garage-text">Estética Automotiva</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm font-semibold text-zinc-300" aria-label="Links rápidos">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="text-sm text-garage-text"><p>© 2026 Furious Garage. Todos os direitos reservados.</p><a href="/admin" className="mt-2 inline-block transition hover:text-white">Área administrativa</a></div>
      </div>
    </footer>
  );
}
