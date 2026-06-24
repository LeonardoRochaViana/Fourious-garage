export type Service = {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
};

export const services: Service[] = [
  {
    id: "lavagem-simples",
    name: "Lavagem Simples",
    description: "Limpeza externa rápida para manutenção do brilho e remoção de sujeiras leves.",
    duration: "40 min",
    price: "A partir de R$ 40"
  },
  {
    id: "lavagem-completa",
    name: "Lavagem Completa",
    description: "Limpeza externa e interna com acabamento detalhado.",
    duration: "1h30",
    price: "A partir de R$ 80"
  },
  {
    id: "higienizacao-interna",
    name: "Higienização Interna",
    description: "Limpeza profunda dos bancos, carpetes, painel e partes internas.",
    duration: "3h",
    price: "A partir de R$ 180"
  },
  {
    id: "polimento-tecnico",
    name: "Polimento Técnico",
    description: "Correção de pintura, remoção de riscos leves e restauração do brilho.",
    duration: "4h",
    price: "A partir de R$ 350"
  },
  {
    id: "cristalizacao",
    name: "Cristalização",
    description: "Proteção e realce de brilho para a pintura do veículo.",
    duration: "2h",
    price: "A partir de R$ 220"
  },
  {
    id: "vitrificacao",
    name: "Vitrificação",
    description: "Proteção premium para pintura com maior durabilidade e brilho intenso.",
    duration: "6h",
    price: "A partir de R$ 600"
  },
  {
    id: "limpeza-de-motor",
    name: "Limpeza de Motor",
    description: "Limpeza técnica e cuidadosa do compartimento do motor.",
    duration: "1h30",
    price: "A partir de R$ 120"
  },
  {
    id: "revitalizacao-de-farois",
    name: "Revitalização de Faróis",
    description: "Restauração da transparência dos faróis amarelados ou opacos.",
    duration: "1h",
    price: "A partir de R$ 100"
  }
];
