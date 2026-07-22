import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const bookingSchema = z.object({
  full_name: z.string().trim().min(2, "Informe seu nome").max(120),
  phone: z.string().trim().min(8, "Informe seu telefone").max(30),
  email: z.string().trim().email("E-mail inválido").max(160),
  cpf: z.string().trim().max(20).optional().or(z.literal("")),
  preferred_date: z.string().min(1, "Escolha uma data"),
  preferred_time: z.string().min(1, "Escolha um horário"),
  appointment_type: z.enum([
    "primeira_consulta",
    "retorno",
    "avaliacao",
    "urgencia",
    "exame",
  ]),
  specialty: z.string().max(80).optional().or(z.literal("")),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

type BookingValues = z.infer<typeof bookingSchema>;

const specialties = [
  "Implantes", "Ortodontia", "Clareamento", "Lentes de Contato",
  "Próteses", "Facetas", "Canal", "Cirurgia Oral",
  "Limpeza e Prevenção", "Odontopediatria", "Periodontia",
  "Harmonização Orofacial", "Outra",
];

const times = [
  "08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00","18:00",
];

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      full_name: "", phone: "", email: "", cpf: "",
      preferred_date: "", preferred_time: "",
      appointment_type: "primeira_consulta",
      specialty: "", notes: "",
    },
  });

  const onSubmit = async (values: BookingValues) => {
    const { error } = await supabase.from("appointments").insert({
      full_name: values.full_name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      cpf: values.cpf?.trim() || null,
      preferred_date: values.preferred_date,
      preferred_time: values.preferred_time,
      appointment_type: values.appointment_type,
      specialty: values.specialty?.trim() || null,
      notes: values.notes?.trim() || null,
    });
    if (error) {
      toast.error("Não foi possível enviar sua solicitação. Tente novamente.");
      return;
    }
    setSubmitted(true);
    toast.success("Solicitação enviada! Entraremos em contato em breve.");
    form.reset();
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl text-primary">Solicitação recebida</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Obrigado! Nossa equipe entrará em contato em até 24 horas úteis para confirmar seu horário.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Enviar outra solicitação
        </Button>
      </div>
    );
  }

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="full_name">Nome completo *</Label>
          <Input id="full_name" {...register("full_name")} placeholder="Seu nome" />
          {errors.full_name && <p className="text-xs text-destructive">{errors.full_name.message}</p>}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="phone">Telefone / WhatsApp *</Label>
          <Input id="phone" {...register("phone")} placeholder="(00) 00000-0000" />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email">E-mail *</Label>
          <Input id="email" type="email" {...register("email")} placeholder="voce@email.com" />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="cpf">CPF (opcional)</Label>
          <Input id="cpf" {...register("cpf")} placeholder="000.000.000-00" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="preferred_date">Data desejada *</Label>
          <Input id="preferred_date" type="date" min={new Date().toISOString().split("T")[0]} {...register("preferred_date")} />
          {errors.preferred_date && <p className="text-xs text-destructive">{errors.preferred_date.message}</p>}
        </div>
        <div className="grid gap-1.5">
          <Label>Horário *</Label>
          <Select value={watch("preferred_time")} onValueChange={(v) => setValue("preferred_time", v, { shouldValidate: true })}>
            <SelectTrigger><SelectValue placeholder="Escolha um horário" /></SelectTrigger>
            <SelectContent>{times.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
          {errors.preferred_time && <p className="text-xs text-destructive">{errors.preferred_time.message}</p>}
        </div>
        <div className="grid gap-1.5">
          <Label>Tipo de consulta *</Label>
          <Select
            value={watch("appointment_type")}
            onValueChange={(v) => setValue("appointment_type", v as BookingValues["appointment_type"], { shouldValidate: true })}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="primeira_consulta">Primeira consulta</SelectItem>
              <SelectItem value="retorno">Retorno</SelectItem>
              <SelectItem value="avaliacao">Avaliação</SelectItem>
              <SelectItem value="urgencia">Urgência</SelectItem>
              <SelectItem value="exame">Exame</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label>Especialidade</Label>
          <Select value={watch("specialty") || ""} onValueChange={(v) => setValue("specialty", v)}>
            <SelectTrigger><SelectValue placeholder="Selecione (opcional)" /></SelectTrigger>
            <SelectContent>{specialties.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="notes">Observações</Label>
        <Textarea id="notes" rows={4} {...register("notes")} placeholder="Conte um pouco sobre o motivo da consulta..." />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-12 rounded-full bg-primary text-primary-foreground text-base hover:bg-primary/90"
      >
        {isSubmitting ? <><Loader2 className="mr-2 size-4 animate-spin" />Enviando...</> : "Enviar solicitação"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Ao enviar você concorda com nossa Política de Privacidade e o tratamento dos seus dados conforme a LGPD.
      </p>
    </form>
  );
}