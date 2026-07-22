import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle, MapPin, Phone, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-primary-foreground/10 font-display text-xl">
              A
            </span>
            <div>
              <p className="font-display text-lg">Dr. Arthur Egídio</p>
              <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">
                Odontologia Integrada
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm text-primary-foreground/75 leading-relaxed">
            Cuidando do seu sorriso com tecnologia, precisão e atendimento humanizado.
            Uma experiência odontológica pensada em cada detalhe.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="grid size-10 place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors">
              <Instagram className="size-4" />
            </a>
            <a href="#" aria-label="Facebook" className="grid size-10 place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors">
              <Facebook className="size-4" />
            </a>
            <a href="#" aria-label="WhatsApp" className="grid size-10 place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors">
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60">Navegação</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href="/#sobre" className="hover:text-gold transition-colors">Sobre</a></li>
            <li><a href="/#tratamentos" className="hover:text-gold transition-colors">Tratamentos</a></li>
            <li><a href="/#depoimentos" className="hover:text-gold transition-colors">Depoimentos</a></li>
            <li><a href="/#faq" className="hover:text-gold transition-colors">Perguntas Frequentes</a></li>
            <li><Link to="/agendamento" className="hover:text-gold transition-colors">Agendar Consulta</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60">Contato</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" /><span>Rua Exemplo, 123 — Centro<br />Sua Cidade, UF</span></li>
            <li className="flex items-center gap-2.5"><Phone className="size-4 text-gold" /> (00) 0000-0000</li>
            <li className="flex items-center gap-2.5"><Mail className="size-4 text-gold" /> contato@drarthuregidio.com.br</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-primary-foreground/60 md:flex-row">
          <p>© {new Date().getFullYear()} Dr. Arthur Egídio — Odontologia Integrada. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary-foreground">Política de Privacidade</a>
            <a href="#" className="hover:text-primary-foreground">LGPD</a>
          </div>
        </div>
      </div>
    </footer>
  );
}