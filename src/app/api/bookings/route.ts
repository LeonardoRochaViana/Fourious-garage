import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type BookingPayload = {
  name?: string;
  whatsapp?: string;
  vehicleModel?: string;
  plate?: string;
  service?: string;
  bookingDate?: string;
  bookingTime?: string;
  notes?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingPayload;
    const requiredFields = [body.name, body.whatsapp, body.vehicleModel, body.service, body.bookingDate, body.bookingTime];

    if (requiredFields.some((field) => !field?.trim())) {
      return NextResponse.json({ message: "Preencha todos os campos obrigatórios." }, { status: 400 });
    }

    const existingBooking = await prisma.booking.findFirst({
      where: {
        bookingDate: body.bookingDate,
        bookingTime: body.bookingTime
      }
    });

    if (existingBooking) {
      return NextResponse.json({ message: "Este horário já foi reservado." }, { status: 409 });
    }

    const booking = await prisma.booking.create({
      data: {
        name: body.name!.trim(),
        whatsapp: body.whatsapp!.trim(),
        vehicleModel: body.vehicleModel!.trim(),
        plate: body.plate?.trim() || null,
        service: body.service!.trim(),
        bookingDate: body.bookingDate!.trim(),
        bookingTime: body.bookingTime!.trim(),
        notes: body.notes?.trim() || null
      }
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ message: "Este horário já foi reservado." }, { status: 409 });
    }

    console.error("Failed to create booking", error);
    return NextResponse.json({ message: "Não foi possível criar o agendamento." }, { status: 500 });
  }
}
