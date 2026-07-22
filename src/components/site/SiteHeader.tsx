import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Tratamentos", href: "/#tratamentos" },
  { label: "Diferenciais", href: "/#diferenciais" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Contato", href: "/#contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between py-4">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Início">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">
            A
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-semibold text-primary">
              Dr. Arthur Egídio
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Odontologia Integrada
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5">
            <Link to="/agendamento">Agendar Consulta</Link>
          </Button>
        </div>

        <button
          className="grid size-10 place-items-center rounded-md text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-2 rounded-full bg-primary text-primary-foreground">
              <Link to="/agendamento" onClick={() => setOpen(false)}>
                Agendar Consulta
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}