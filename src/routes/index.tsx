import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Anchor, AlignJustify, Sun, Sparkles, Layers, Star, Activity, Scissors,
  Stethoscope, ShieldCheck, Baby, Heart, Palette, Flower2,
  ArrowRight, CheckCircle2, Cpu, HandHeart, Microscope, Users, Award, Clock, MapPin, Phone, Mail, Quote, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import heroDoctor from "@/assets/dr-arthur-nova.jpg.png";
import clinicInterior from "@/assets/clinic-interior.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Arthur Egídio — Odontologia Integrada" },
      {
        name: "description",
        content:
          "Clínica odontológica premium com implantes, ortodontia, lentes de contato dental e estética do sorriso. Tecnologia, precisão e atendimento humanizado.",
      },
      { property: "og:title", content: "Dr. Arthur Egídio — Odontologia Integrada" },
      {
        property: "og:description",
        content: "Clínica odontológica premium com implantes, ortodontia, lentes de contato dental e estética do sorriso. Tecnologia, precisão e atendimento humanizado.",
      },
    ],
  }),
  component: HomePage,
});

const iconMap = {
  Anchor, AlignJustify, Sun, Sparkles, Layers, Star, Activity, Scissors,
  Stethoscope, ShieldCheck, Baby, Heart, Palette, Flower2,
} as const;

const treatments = [
  { icon: "Anchor", title: "Implantes Dentários", desc: "Reposição definitiva com implantes de titânio e planejamento digital." },
  { icon: "AlignJustify", title: "Ortodontia", desc: "Aparelhos fixos, autoligados e alinhadores invisíveis." },
  { icon: "Sun", title: "Clareamento Dental", desc: "Clareamento a laser e caseiro supervisionado." },
  { icon: "Sparkles", title: "Lentes de Contato", desc: "Lentes ultrafinas em porcelana para um sorriso natural." },
  { icon: "Layers", title: "Próteses", desc: "Fixas, removíveis e sobre implantes com estética e conforto." },
  { icon: "Star", title: "Facetas", desc: "Correção de forma, cor e alinhamento com naturalidade." },
  { icon: "Activity", title: "Tratamento de Canal", desc: "Endodontia moderna, precisa e indolor." },
  { icon: "Scissors", title: "Extrações", desc: "Simples e cirúrgicas com máxima segurança." },
  { icon: "Stethoscope", title: "Cirurgia Oral", desc: "Procedimentos cirúrgicos com técnica avançada." },
  { icon: "ShieldCheck", title: "Limpeza & Prevenção", desc: "Profilaxia, flúor e orientação personalizada." },
  { icon: "Baby", title: "Odontopediatria", desc: "Atendimento acolhedor para crianças." },
  { icon: "Heart", title: "Periodontia", desc: "Cuidado especializado das gengivas." },
  { icon: "Palette", title: "Dentística Estética", desc: "Restaurações estéticas invisíveis." },
  { icon: "Flower2", title: "Harmonização Orofacial", desc: "Procedimentos faciais para realçar sua beleza." },
];

const differentials = [
  { icon: HandHeart, title: "Atendimento Humanizado", desc: "Cada paciente é único e recebe cuidado individualizado." },
  { icon: Cpu, title: "Equipamentos Modernos", desc: "Tecnologia de ponta em cada procedimento." },
  { icon: Microscope, title: "Radiografia Digital", desc: "Diagnósticos precisos com menor exposição." },
  { icon: ShieldCheck, title: "Biossegurança", desc: "Protocolos rigorosos de esterilização e proteção." },
  { icon: Sparkles, title: "Planejamento Digital", desc: "Simulação e previsibilidade do seu novo sorriso." },
  { icon: Users, title: "Equipe Especializada", desc: "Profissionais capacitados em suas especialidades." },
  { icon: Award, title: "Ambiente Confortável", desc: "Estrutura pensada para o seu bem-estar." },
  { icon: Clock, title: "Atendimento Personalizado", desc: "Do primeiro contato ao pós-tratamento." },
];

const testimonials = [
  { name: "Mariana S.", text: "Atendimento impecável e um resultado que superou minhas expectativas. Recomendo demais!", rating: 5 },
  { name: "Ricardo L.", text: "Clínica sofisticada e equipe muito atenciosa. Fiz implantes e voltei a sorrir com confiança.", rating: 5 },
  { name: "Camila P.", text: "As lentes ficaram perfeitas! Trabalho minucioso, sempre com carinho e cuidado.", rating: 5 },
  { name: "Fernando A.", text: "Levo meus filhos e são tratados com muito acolhimento. Ambiente lindo e profissional.", rating: 5 },
];

const faqs = [
  { q: "Quanto custa uma avaliação?", a: "A primeira avaliação é feita com planejamento personalizado. Entre em contato para valores atualizados." },
  { q: "A clínica aceita convênios?", a: "Consulte os convênios atendidos entrando em contato com nossa recepção. Também oferecemos condições especiais para pagamento particular." },
  { q: "Quanto dura um implante dentário?", a: "Com cuidados adequados, um implante dentário pode durar por toda a vida. Fazemos acompanhamento periódico." },
  { q: "O clareamento dental dói?", a: "O procedimento é indolor. Alguma sensibilidade temporária pode ocorrer e é gerenciada com produtos específicos." },
  { q: "Como funciona o agendamento?", a: "Você preenche o formulário online, nossa equipe entra em contato para confirmar horário e detalhes." },
  { q: "Fazem atendimento de urgência?", a: "Sim, temos horários reservados para casos de urgência. Entre em contato pelo WhatsApp para atendimento rápido." },
];

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <About />
      <Treatments />
      <Differentials />
      <Testimonials />
      <FAQSection />
      <Insurance />
      <Location />
      <ContactSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background pt-8 pb-20 md:pt-14 md:pb-28">
      <div className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-[36rem] rounded-full bg-sky/40 blur-3xl" />

      <div className="container-page relative grid gap-12 md:grid-cols-2 md:items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-gold" /> Odontologia Integrada
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-primary md:text-6xl lg:text-7xl">
            Dr. Arthur <span className="italic text-primary/85">Egídio</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Cuidando do seu sorriso com <span className="text-foreground">tecnologia</span>,{" "}
            <span className="text-foreground">precisão</span> e{" "}
            <span className="text-foreground">atendimento humanizado</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90">
              <Link to="/agendamento">Agendar Consulta <ArrowRight className="ml-1 size-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-border px-7 hover:bg-secondary">
              <a href="#tratamentos">Conhecer Tratamentos</a>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { k: "+10", l: "anos de experiência" },
              { k: "+2 mil", l: "sorrisos transformados" },
              { k: "14", l: "especialidades" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-display text-2xl text-primary">{s.k}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-up">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-sky/50 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10">
            <img
              src={heroDoctor}
              alt="Dr. Arthur Egídio em seu consultório odontológico"
              width={1200}
              height={1504}
              className="aspect-[4/5] w-full object-cover scale-[1.15] -translate-x-[7%]"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur md:block">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">CRO ativo</p>
                <p className="text-xs text-muted-foreground">Cirurgião-Dentista</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = ["Planejamento Digital", "Radiografia Digital", "Biossegurança", "Atendimento Humanizado", "Estética Avançada"];
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {items.map((i, idx) => (
          <span key={i} className="flex items-center gap-3">
            <span>{i}</span>
            {idx < items.length - 1 && <span className="size-1 rounded-full bg-border" />}
          </span>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="py-24">
      <div className="container-page grid gap-14 md:grid-cols-2 md:items-center">
        <div className="order-2 md:order-1">
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-lg">
            <img
              src="/nova-foto.jpg.webp"
              alt="Interior do consultório do Dr. Arthur Egídio"
              width={1600} height={1000} loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Sobre</p>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
            Uma odontologia pensada em cada detalhe
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Formado em Odontologia com especializações em Implantodontia, Ortodontia e Estética
            Dental, o Dr. Arthur Egídio construiu uma clínica onde tecnologia, técnica e
            acolhimento caminham juntos. Aqui, cada plano de tratamento é feito para você.
          </p>

          <ul className="mt-8 space-y-3.5">
            {[
              "Graduação em Odontologia com formação continuada",
              "Especializações em Implantes, Ortodontia e Estética",
              "Atualização constante em tecnologia e biossegurança",
              "Missão: entregar o melhor da odontologia com humanidade",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground/80">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Treatments() {
  return (
    <section id="tratamentos" className="bg-secondary/40 py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Tratamentos</p>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
            Todas as especialidades em um só lugar
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cuidado completo para todas as fases da vida — sempre com planejamento personalizado.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t) => {
            const Icon = iconMap[t.icon as keyof typeof iconMap];
            return (
              <article key={t.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                <div className="grid size-11 place-items-center rounded-xl bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-xl text-primary">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                <Link
                  to="/agendamento"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                >
                  Saiba mais <ArrowRight className="size-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Differentials() {
  return (
    <section id="diferenciais" className="py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Diferenciais</p>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
            Por que escolher nossa clínica
          </h2>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((d) => (
            <div key={d.title} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg">
              <div className="grid size-10 place-items-center rounded-lg bg-gold/15 text-gold-foreground">
                <d.icon className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-base text-primary">{d.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="depoimentos" className="bg-primary py-24 text-primary-foreground">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Depoimentos</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            O que nossos pacientes dizem
          </h2>
          <div className="mt-5 flex items-center justify-center gap-1 text-gold">
            {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
            <span className="ml-2 text-sm text-primary-foreground/80">4,9 de 5 — centenas de avaliações</span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-primary-foreground/5 p-6 backdrop-blur border border-primary-foreground/10">
              <Quote className="size-6 text-gold" />
              <blockquote className="mt-4 text-sm leading-relaxed text-primary-foreground/90">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between">
                <span className="text-sm font-medium">{t.name}</span>
                <span className="text-gold text-sm">★★★★★</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="py-24">
      <div className="container-page grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">FAQ</p>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-muted-foreground">
            Não encontrou o que procura? Fale conosco pelo WhatsApp e teremos prazer em ajudar.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left font-display text-lg text-primary hover:no-underline">
                <span className="flex items-center gap-3"><ChevronDown className="hidden" />{f.q}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Insurance() {
  return (
    <section className="bg-secondary/40 py-16">
      <div className="container-page text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Convênios</p>
        <h2 className="mt-3 font-display text-3xl text-primary md:text-4xl">
          Consulte os convênios atendidos
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Trabalhamos com os principais convênios odontológicos. Entre em contato para confirmar a cobertura do seu plano.
        </p>
        <Button asChild variant="outline" className="mt-6 rounded-full">
          <a href="#contato">Falar com a recepção</a>
        </Button>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="localizacao" className="py-24">
      <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Localização</p>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
            Venha nos visitar
          </h2>
          <ul className="mt-6 space-y-4 text-sm text-foreground/80">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-primary" /><span>Rua Exemplo, 123 — Centro<br />Sua Cidade, UF — CEP 00000-000</span></li>
            <li className="flex items-center gap-3"><Phone className="size-5 text-primary" /> (00) 0000-0000</li>
            <li className="flex items-center gap-3"><Clock className="size-5 text-primary" /> Seg a Sex — 08h às 19h · Sáb — 08h às 13h</li>
          </ul>
          <Button asChild className="mt-6 rounded-full">
            <a href="https://maps.google.com" target="_blank" rel="noreferrer">Como Chegar</a>
          </Button>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
          <iframe
            title="Localização da clínica"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.187123!2d-46.6558!3d-23.5613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQwLjciUyA0NsKwMzknMjEuMCJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
            className="aspect-[4/3] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setSent(true);
    toast.success("Mensagem enviada! Retornaremos em breve.");
    (e.currentTarget as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contato" className="bg-secondary/40 py-24">
      <div className="container-page grid gap-12 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Contato</p>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
            Fale com a gente
          </h2>
          <p className="mt-4 text-muted-foreground">
            Prefere agendar direto? Use nosso formulário completo de agendamento online.
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/agendamento">Agendar Consulta <ArrowRight className="ml-1 size-4" /></Link>
          </Button>
          <ul className="mt-10 space-y-4 text-sm text-foreground/80">
            <li className="flex items-center gap-3"><Phone className="size-5 text-primary" /> (00) 0000-0000</li>
            <li className="flex items-center gap-3"><Mail className="size-5 text-primary" /> contato@drarthuregidio.com.br</li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="grid gap-1.5">
            <Label htmlFor="c-name">Nome</Label>
            <Input id="c-name" required disabled={sent} />
          </div>
          <div className="grid gap-1.5 md:grid-cols-2 md:gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="c-phone">Telefone</Label>
              <Input id="c-phone" required disabled={sent} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="c-email">E-mail</Label>
              <Input id="c-email" type="email" required disabled={sent} />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="c-message">Mensagem</Label>
            <Textarea id="c-message" rows={5} required disabled={sent} />
          </div>
          <Button type="submit" disabled={sending || sent} className="h-12 rounded-full">
            {sending ? "Enviando..." : sent ? "Enviado!" : "Enviar mensagem"}
          </Button>
        </form>
      </div>
    </section>
  );
}
