export type BookingSummary = {
  name: string;
  phone: string;
  vehicleModel: string;
  vehiclePlate?: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
};

export type BookingFormState = BookingSummary;
