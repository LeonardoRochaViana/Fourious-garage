"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { availableTimeSlots } from "@/data/availability";
import { services } from "@/data/services";
import type { BookingFormState, BookingSummary } from "@/types/booking";

const initialForm: BookingFormState = {
  name: "",
  phone: "",
  vehicleModel: "",
  vehiclePlate: "",
  service: "",
  date: "",
  time: "",
  notes: ""
};

type OccupiedSlotsResponse = {
  occupiedTimes?: string[];
  message?: string;
};

export default function BookingForm() {
  const [form, setForm] = useState<BookingFormState>(initialForm);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState<BookingSummary | null>(null);
  const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slots = useMemo(
    () =>
      form.date
        ? availableTimeSlots.map((slot) => ({
            time: slot,
            isAvailable: !occupiedTimes.includes(slot)
          }))
        : [],
    [form.date, occupiedTimes]
  );

  useEffect(() => {
    if (!form.date) {
      setOccupiedTimes([]);
      return;
    }

    const controller = new AbortController();

    async function fetchOccupiedTimes() {
      setIsLoadingSlots(true);
      setError("");

      try {
        const response = await fetch(`/api/bookings/occupied?date=${encodeURIComponent(form.date)}`, {
          signal: controller.signal
        });
        const data = (await response.json()) as OccupiedSlotsResponse;

        if (!response.ok) {
          throw new Error(data.message ?? "Não foi possível buscar horários ocupados.");
        }

        setOccupiedTimes(data.occupiedTimes ?? []);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setOccupiedTimes([]);
        setError(fetchError instanceof Error ? fetchError.message : "Não foi possível buscar horários ocupados.");
      } finally {
        setIsLoadingSlots(false);
      }
    }

    fetchOccupiedTimes();

    return () => controller.abort();
  }, [form.date]);

  function updateField(field: keyof BookingFormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "date" ? { time: "" } : {})
    }));
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name || !form.phone || !form.vehicleModel || !form.service || !form.date || !form.time) {
      setError("Preencha todos os campos obrigatórios e selecione um horário disponível.");
      setSummary(null);
      return;
    }

    const selectedSlot = slots.find((slot) => slot.time === form.time);

    if (!selectedSlot?.isAvailable) {
      setError("Este horário não está disponível. Escolha outro horário livre.");
      setSummary(null);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          whatsapp: form.phone,
          vehicleModel: form.vehicleModel,
          plate: form.vehiclePlate,
          service: form.service,
          bookingDate: form.date,
          bookingTime: form.time,
          notes: form.notes
        })
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Não foi possível confirmar o agendamento.");
      }

      setSummary(form);
      setOccupiedTimes((current) => Array.from(new Set([...current, form.time])));
      setError("");

      const whatsappMessage = encodeURIComponent(
        [
          "Olá, Furious Garage! Fiz uma reserva pelo site.",
          "",
          `Cliente: ${form.name}`,
          `WhatsApp: ${form.phone}`,
          `Veículo: ${form.vehicleModel}${form.vehiclePlate ? ` - ${form.vehiclePlate}` : ""}`,
          `Serviço: ${form.service}`,
          `Data: ${form.date.split("-").reverse().join("/")}`,
          `Horário: ${form.time}`,
          form.notes ? `Observações: ${form.notes}` : "",
          "",
          "Aguardo a confirmação."
        ].filter(Boolean).join("\n")
      );

      window.open(`https://wa.me/5518996539169?text=${whatsappMessage}`, "_blank", "noopener,noreferrer");
    } catch (submitError) {
      setSummary(null);
      setError(submitError instanceof Error ? submitError.message : "Não foi possível confirmar o agendamento.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="agendamento" className="border-b border-garage-line py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase text-garage-red">Agendamento</p>
          <h2 className="red-line mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">Reserve seu horário</h2>
          <p className="mt-7 text-garage-text">
            Escolha o serviço, informe os dados do veículo e selecione apenas horários livres. As reservas são verificadas e salvas no Neon Postgres com Prisma.
          </p>
          <div className="mt-8 border border-garage-line bg-garage-panel p-5">
            <CalendarCheck className="mb-4 text-garage-red" size={30} />
            <p className="font-display text-2xl font-bold uppercase">Horários cadastrados</p>
            <p className="mt-2 text-sm leading-6 text-garage-text">08:00, 09:00, 10:00, 11:00, 13:00, 14:00, 15:00, 16:00 e 17:00.</p>
          </div>
        </div>

        <div className="border border-garage-line bg-garage-panel p-5 sm:p-7">
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">
                Nome do cliente *
                <input value={form.name} onChange={(event) => updateField("name", event.target.value)} className="border border-garage-line bg-black px-4 py-3 text-white outline-none transition focus:border-garage-red" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Telefone/WhatsApp *
                <input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className="border border-garage-line bg-black px-4 py-3 text-white outline-none transition focus:border-garage-red" />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">
                Modelo do veículo *
                <input value={form.vehicleModel} onChange={(event) => updateField("vehicleModel", event.target.value)} className="border border-garage-line bg-black px-4 py-3 text-white outline-none transition focus:border-garage-red" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Placa do veículo
                <input value={form.vehiclePlate} onChange={(event) => updateField("vehiclePlate", event.target.value)} className="border border-garage-line bg-black px-4 py-3 text-white outline-none transition focus:border-garage-red" />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-semibold">
              Serviço desejado *
              <select value={form.service} onChange={(event) => updateField("service", event.target.value)} className="border border-garage-line bg-black px-4 py-3 text-white outline-none transition focus:border-garage-red">
                <option value="">Selecione um serviço</option>
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-semibold">
              Data desejada *
              <input type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} className="border border-garage-line bg-black px-4 py-3 text-white outline-none transition focus:border-garage-red" />
            </label>

            <div className="grid gap-3">
              <p className="text-sm font-semibold">Horário disponível *</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {isLoadingSlots ? (
                  <p className="col-span-full border border-garage-line bg-black p-4 text-sm text-garage-text">Buscando horários ocupados...</p>
                ) : slots.length ? (
                  slots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.isAvailable}
                      onClick={() => updateField("time", slot.time)}
                      className={`min-h-12 border px-3 py-3 text-sm font-bold transition ${
                        form.time === slot.time
                          ? "border-garage-red bg-garage-red text-white"
                          : slot.isAvailable
                            ? "border-garage-line bg-black text-white hover:border-garage-red"
                            : "cursor-not-allowed border-garage-line bg-zinc-950 text-zinc-600 line-through"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))
                ) : (
                  <p className="col-span-full border border-garage-line bg-black p-4 text-sm text-garage-text">Selecione uma data para visualizar os horários.</p>
                )}
              </div>
            </div>

            <label className="grid gap-2 text-sm font-semibold">
              Observações
              <textarea value={form.notes} onChange={(event) => updateField("notes", event.target.value)} rows={4} className="resize-none border border-garage-line bg-black px-4 py-3 text-white outline-none transition focus:border-garage-red" />
            </label>

            {error ? <p className="border border-red-900 bg-red-950/40 p-3 text-sm text-red-100">{error}</p> : null}

            <button type="submit" disabled={isSubmitting} className="bg-garage-red px-6 py-4 text-sm font-bold uppercase text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-950 disabled:text-zinc-400">
              {isSubmitting ? "Confirmando..." : "Confirmar agendamento"}
            </button>
          </form>

          {summary ? (
            <div className="mt-6 border border-green-900 bg-green-950/25 p-5">
              <p className="flex items-center gap-2 font-display text-2xl font-bold uppercase text-white">
                <CheckCircle2 size={24} className="text-green-400" />
                Agendamento confirmado
              </p>
              <dl className="mt-4 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
                <div><dt className="text-garage-text">Nome</dt><dd>{summary.name}</dd></div>
                <div><dt className="text-garage-text">Telefone</dt><dd>{summary.phone}</dd></div>
                <div><dt className="text-garage-text">Veículo</dt><dd>{summary.vehicleModel}{summary.vehiclePlate ? ` - ${summary.vehiclePlate}` : ""}</dd></div>
                <div><dt className="text-garage-text">Serviço</dt><dd>{summary.service}</dd></div>
                <div><dt className="text-garage-text">Data</dt><dd>{summary.date}</dd></div>
                <div><dt className="text-garage-text">Horário</dt><dd>{summary.time}</dd></div>
                {summary.notes ? <div className="sm:col-span-2"><dt className="text-garage-text">Observações</dt><dd>{summary.notes}</dd></div> : null}
              </dl>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
