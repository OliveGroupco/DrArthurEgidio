import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LogOut, RefreshCw, ShieldOff } from "lucide-react";

type Appointment = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  cpf: string | null;
  preferred_date: string;
  preferred_time: string;
  appointment_type: string;
  specialty: string | null;
  notes: string | null;
  status: "pending" | "confirmed" | "rescheduled" | "cancelled" | "completed";
  created_at: string;
};

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel — Agendamentos" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [items, setItems] = useState<Appointment[] | null>(null);
  const [forbidden, setForbidden] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("preferred_date", { ascending: true });
    if (error) {
      setForbidden(true);
      setItems([]);
    } else {
      setItems((data ?? []) as Appointment[]);
      setForbidden(false);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: Appointment["status"]) => {
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    if (error) toast.error("Não foi possível atualizar.");
    else { toast.success("Status atualizado."); load(); }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  return (
    <section className="py-14">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Painel</p>
            <h1 className="mt-2 font-display text-3xl text-primary md:text-4xl">Agendamentos</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={load}><RefreshCw className="mr-2 size-4" /> Atualizar</Button>
            <Button variant="outline" onClick={signOut}><LogOut className="mr-2 size-4" /> Sair</Button>
          </div>
        </div>

        {forbidden ? (
          <div className="mt-12 rounded-3xl border border-border bg-card p-10 text-center">
            <ShieldOff className="mx-auto size-8 text-muted-foreground" />
            <h2 className="mt-4 font-display text-xl text-primary">Acesso restrito</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sua conta não tem permissão de administrador. Solicite o papel <code>admin</code> na tabela <code>user_roles</code>.
            </p>
          </div>
        ) : loading ? (
          <p className="mt-10 text-sm text-muted-foreground">Carregando...</p>
        ) : items && items.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">Nenhum agendamento ainda.</p>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-4">Paciente</th>
                  <th className="p-4">Contato</th>
                  <th className="p-4">Data / Hora</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((a) => (
                  <tr key={a.id} className="border-t border-border align-top">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{a.full_name}</p>
                      {a.specialty && <p className="text-xs text-muted-foreground">{a.specialty}</p>}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      <p>{a.phone}</p>
                      <p className="text-xs">{a.email}</p>
                    </td>
                    <td className="p-4">
                      <p>{new Date(a.preferred_date).toLocaleDateString("pt-BR")}</p>
                      <p className="text-xs text-muted-foreground">{a.preferred_time}</p>
                    </td>
                    <td className="p-4 capitalize">{a.appointment_type.replace("_", " ")}</td>
                    <td className="p-4"><StatusBadge status={a.status} /></td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1.5">
                        <Button size="sm" variant="outline" onClick={() => updateStatus(a.id, "confirmed")}>Confirmar</Button>
                        <Button size="sm" variant="outline" onClick={() => updateStatus(a.id, "completed")}>Concluir</Button>
                        <Button size="sm" variant="outline" onClick={() => updateStatus(a.id, "cancelled")}>Cancelar</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: Appointment["status"] }) {
  const map: Record<Appointment["status"], string> = {
    pending: "bg-gold/20 text-primary",
    confirmed: "bg-primary/10 text-primary",
    rescheduled: "bg-sky/40 text-primary",
    cancelled: "bg-destructive/10 text-destructive",
    completed: "bg-green-500/15 text-green-700",
  };
  const label: Record<Appointment["status"], string> = {
    pending: "Pendente",
    confirmed: "Confirmado",
    rescheduled: "Remarcado",
    cancelled: "Cancelado",
    completed: "Concluído",
  };
  return <Badge className={`${map[status]} border-transparent`}>{label[status]}</Badge>;
}