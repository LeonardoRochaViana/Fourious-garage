import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ message: "Informe a data para buscar horários ocupados." }, { status: 400 });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        bookingDate: date
      },
      select: {
        bookingTime: true
      }
    });

    return NextResponse.json({
      occupiedTimes: bookings.map((booking) => booking.bookingTime)
    });
  } catch (error) {
    console.error("Failed to fetch occupied slots", error);
    return NextResponse.json({ message: "Não foi possível buscar horários ocupados." }, { status: 500 });
  }
}
