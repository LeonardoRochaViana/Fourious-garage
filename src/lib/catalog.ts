import { prisma } from "@/lib/prisma";

export async function ensureCatalogTables() {
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "Service" (
    "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "description" TEXT NOT NULL,
    "duration" TEXT NOT NULL, "price" TEXT NOT NULL, "active" BOOLEAN NOT NULL DEFAULT TRUE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "description" TEXT NOT NULL,
    "purpose" TEXT NOT NULL, "active" BOOLEAN NOT NULL DEFAULT TRUE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "Availability" (
    "id" TEXT PRIMARY KEY, "date" TEXT NOT NULL, "time" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT TRUE, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("date", "time")
  )`);

  const [{ count }] = await prisma.$queryRawUnsafe<Array<{ count: bigint }>>('SELECT COUNT(*)::bigint AS count FROM "Service"');
  if (Number(count) === 0) {
    const defaults = [
      ["lavagem-simples","Lavagem Simples","Limpeza externa rápida para manutenção do brilho e remoção de sujeiras leves.","40 min","A partir de R$ 40"],
      ["lavagem-completa","Lavagem Completa","Limpeza externa e interna com acabamento detalhado.","1h30","A partir de R$ 80"],
      ["higienizacao-interna","Higienização Interna","Limpeza profunda dos bancos, carpetes, painel e partes internas.","3h","A partir de R$ 180"],
      ["polimento-tecnico","Polimento Técnico","Correção de pintura, remoção de riscos leves e restauração do brilho.","4h","A partir de R$ 350"]
    ];
    for (const row of defaults) {
      await prisma.$executeRawUnsafe('INSERT INTO "Service" ("id","name","description","duration","price") VALUES ($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING', ...row);
    }
  }

  const [{ productCount }] = await prisma.$queryRawUnsafe<Array<{ productCount: bigint }>>('SELECT COUNT(*)::bigint AS "productCount" FROM "Product"');
  if (Number(productCount) === 0) {
    const defaults = [
      ["shampoo","Shampoo automotivo premium","Limpeza eficiente com espuma densa e alto poder de lubrificação.","Lavagem externa segura"],
      ["cera","Cera de proteção","Camada de brilho e repelência para valorizar a pintura.","Proteção e acabamento"],
      ["selante","Selante de pintura","Barreira técnica para preservar o verniz por mais tempo.","Durabilidade do brilho"]
    ];
    for (const row of defaults) {
      await prisma.$executeRawUnsafe('INSERT INTO "Product" ("id","name","description","purpose") VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING', ...row);
    }
  }
}

export type CatalogService = { id: string; name: string; description: string; duration: string; price: string; active: boolean };
export type CatalogProduct = { id: string; name: string; description: string; purpose: string; active: boolean };
export type CatalogAvailability = { id: string; date: string; time: string; active: boolean };
