import { useEffect, useState } from "react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import aboutPhoto from "@/assets/about-photo.png";

const ProactiveChatBubble = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.6) {
        setShow(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleClose = () => {
    setDismissed(true);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-24 right-6 z-40 max-w-sm bg-card border border-border rounded-2xl shadow-lg p-5"
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <img
              src={aboutPhoto}
              alt="Gabriel"
              className="w-10 h-10 rounded-full object-cover border border-border"
            />
            <div>
              <p className="font-heading font-bold text-sm text-foreground">Gabriel</p>
              <p className="text-xs text-muted-foreground font-body">Online agora</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-body mb-4">
            👋 Tem alguma dúvida sobre como funciona o tráfego pago pro seu negócio?
          </p>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2.5 rounded-full bg-cta-gradient text-primary-foreground font-heading font-bold text-sm shadow-cta hover:shadow-cta-hover hover:scale-105 transition-all duration-300"
          >
            Sim, quero entender melhor
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProactiveChatBubble;
