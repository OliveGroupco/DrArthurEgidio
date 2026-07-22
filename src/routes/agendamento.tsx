import { createFileRoute } from "@tanstack/react-router";
import { BookingForm } from "@/components/site/BookingForm";
import { Calendar, Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/agendamento")({
  head: () => ({
    meta: [
      { title: "Agendar Consulta — Dr. Arthur Egídio" },
      {
        name: "description",
        content:
          "Agende sua consulta online com o Dr. Arthur Egídio. Preencha o formulário e nossa equipe entrará em contato para confirmar seu horário.",
      },
      { property: "og:title", content: "Agendar Consulta — Dr. Arthur Egídio" },
      { property: "og:description", content: "Agende sua consulta odontológica online em poucos minutos." },
    ],
  }),
  component: AppointmentPage,
});

function AppointmentPage() {
  return (
    <section className="bg-gradient-to-b from-secondary/60 to-background py-20">
      <div className="container-page grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="md:sticky md:top-24 md:h-fit">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Agendamento Online</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-primary md:text-5xl">
            Agende sua consulta em poucos minutos
          </h1>
          <p className="mt-5 text-muted-foreground">
            Preencha o formulário e nossa equipe confirmará seu horário em até 24 horas úteis, por telefone ou WhatsApp.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-foreground/80">
            <li className="flex gap-3"><Calendar className="mt-0.5 size-5 shrink-0 text-primary" /> Escolha a data que melhor se adapta à sua rotina.</li>
            <li className="flex gap-3"><Clock className="mt-0.5 size-5 shrink-0 text-primary" /> Horários flexíveis inclusive aos sábados.</li>
            <li className="flex gap-3"><MessageCircle className="mt-0.5 size-5 shrink-0 text-primary" /> Confirmação por WhatsApp para sua comodidade.</li>
          </ul>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}