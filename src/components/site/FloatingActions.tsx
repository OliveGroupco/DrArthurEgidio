import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5500000000000"; // TODO: substituir pelo número real
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Gostaria de agendar uma consulta com o Dr. Arthur Egídio."
);

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-end px-5">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        {showTop && (
          <button
            aria-label="Voltar ao topo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid size-11 place-items-center rounded-full border border-border bg-background/90 text-primary shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:bg-background"
          >
            <ArrowUp className="size-5" />
          </button>
        )}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar no WhatsApp"
          className="grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition hover:-translate-y-0.5 hover:shadow-2xl"
        >
          <MessageCircle className="size-6" />
        </a>
      </div>
    </div>
  );
}