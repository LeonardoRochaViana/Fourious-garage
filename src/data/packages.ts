export type ServicePackage = {
  name: string;
  price: string;
  featured?: boolean;
  items: string[];
};

export const servicePackages: ServicePackage[] = [
  {
    name: "Pacote Básico",
    price: "R$ 70",
    items: ["Lavagem externa", "Aspiração interna", "Limpeza dos vidros", "Finalização simples"]
  },
  {
    name: "Pacote Premium",
    price: "R$ 150",
    featured: true,
    items: [
      "Lavagem completa",
      "Aspiração detalhada",
      "Hidratação de plásticos",
      "Limpeza dos vidros",
      "Pretinho nos pneus",
      "Acabamento premium"
    ]
  },
  {
    name: "Pacote Diamante",
    price: "R$ 450",
    items: [
      "Lavagem completa premium",
      "Higienização interna",
      "Polimento técnico",
      "Cristalização",
      "Proteção da pintura",
      "Acabamento detalhado"
    ]
  }
];
