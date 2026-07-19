import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureCatalogTables, type CatalogProduct, type CatalogService, type CatalogAvailability } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await ensureCatalogTables();
    const date = new URL(request.url).searchParams.get("date");
    const services = await prisma.$queryRawUnsafe<CatalogService[]>('SELECT * FROM "Service" WHERE "active" = TRUE ORDER BY "createdAt"');
    const products = await prisma.$queryRawUnsafe<CatalogProduct[]>('SELECT * FROM "Product" WHERE "active" = TRUE ORDER BY "createdAt"');
    const availability = date
      ? await prisma.$queryRawUnsafe<CatalogAvailability[]>('SELECT * FROM "Availability" WHERE "active" = TRUE AND "date" = $1 ORDER BY "time"', date)
      : [];
    return NextResponse.json({ services, products, availability });
  } catch (error) {
    console.error("Catalog error", error);
    return NextResponse.json({ message: "Não foi possível carregar o catálogo." }, { status: 500 });
  }
}
