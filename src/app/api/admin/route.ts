import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureCatalogTables } from "@/lib/catalog";

function authorized(request: Request) {
  const configured = process.env.ADMIN_PASSWORD;
  return Boolean(configured && request.headers.get("x-admin-password") === configured);
}
function denied() { return NextResponse.json({ message: "Senha administrativa incorreta." }, { status: 401 }); }

export async function GET(request: Request) {
  if (!authorized(request)) return denied();
  await ensureCatalogTables();
  const services = await prisma.$queryRawUnsafe('SELECT * FROM "Service" ORDER BY "createdAt" DESC');
  const products = await prisma.$queryRawUnsafe('SELECT * FROM "Product" ORDER BY "createdAt" DESC');
  const availability = await prisma.$queryRawUnsafe('SELECT * FROM "Availability" WHERE "date" >= CURRENT_DATE::text ORDER BY "date","time"');
  return NextResponse.json({ services, products, availability });
}

export async function POST(request: Request) {
  if (!authorized(request)) return denied();
  await ensureCatalogTables();
  const body = await request.json();
  const id = crypto.randomUUID();
  if (body.entity === "service") {
    await prisma.$executeRawUnsafe('INSERT INTO "Service" ("id","name","description","duration","price") VALUES ($1,$2,$3,$4,$5)', id, body.name, body.description, body.duration, body.price);
  } else if (body.entity === "product") {
    await prisma.$executeRawUnsafe('INSERT INTO "Product" ("id","name","description","purpose") VALUES ($1,$2,$3,$4)', id, body.name, body.description, body.purpose);
  } else if (body.entity === "availability") {
    await prisma.$executeRawUnsafe('INSERT INTO "Availability" ("id","date","time") VALUES ($1,$2,$3) ON CONFLICT ("date","time") DO UPDATE SET "active"=TRUE', id, body.date, body.time);
  } else return NextResponse.json({ message: "Tipo inválido." }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!authorized(request)) return denied();
  await ensureCatalogTables();
  const { searchParams } = new URL(request.url);
  const entity = searchParams.get("entity");
  const id = searchParams.get("id");
  const table = entity === "service" ? "Service" : entity === "product" ? "Product" : entity === "availability" ? "Availability" : null;
  if (!table || !id) return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
  await prisma.$executeRawUnsafe(`DELETE FROM "${table}" WHERE "id" = $1`, id);
  return NextResponse.json({ ok: true });
}
