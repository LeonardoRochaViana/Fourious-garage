CREATE TABLE "Booking" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "whatsapp" TEXT NOT NULL,
  "vehicleModel" TEXT NOT NULL,
  "plate" TEXT,
  "service" TEXT NOT NULL,
  "bookingDate" TEXT NOT NULL,
  "bookingTime" TEXT NOT NULL,
  "notes" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Booking_bookingDate_bookingTime_key" ON "Booking"("bookingDate", "bookingTime");

CREATE INDEX "Booking_bookingDate_idx" ON "Booking"("bookingDate");
