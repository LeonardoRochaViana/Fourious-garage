export type Product = {
  name: string;
  description: string;
  purpose: string;
};

export const products: Product[] = [
  {
    name: "Shampoo automotivo premium",
    description: "Limpeza eficiente com espuma densa e alto poder de lubrificação.",
    purpose: "Lavagem externa segura"
  },
  {
    name: "Cera de proteção",
    description: "Camada de brilho e repelência para valorizar a pintura.",
    purpose: "Proteção e acabamento"
  },
  {
    name: "Selante de pintura",
    description: "Barreira técnica para preservar o verniz por mais tempo.",
    purpose: "Durabilidade do brilho"
  },
  {
    name: "Produto para limpeza interna",
    description: "Fórmula profissional para painéis, plásticos e superfícies delicadas.",
    purpose: "Higienização interna"
  },
  {
    name: "Hidratador de couro",
    description: "Tratamento para preservar maciez, toque e aparência dos bancos.",
    purpose: "Conservação do couro"
  },
  {
    name: "Revitalizador de plásticos",
    description: "Realça acabamento e recupera o aspecto original de peças externas e internas.",
    purpose: "Renovação visual"
  }
];
