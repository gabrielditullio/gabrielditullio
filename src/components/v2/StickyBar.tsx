import { useEffect, useState } from "react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { motion, AnimatePresence } from "framer-motion";

const StickyBar = () => {
  const [show, setShow] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctaEl = document.getElementById("cta-final");
    if (!ctaEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCtaVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(ctaEl);
    return () => observer.disconnect();
  }, []);

  const visible = show && !ctaVisible;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 48, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border/50 py-3 md:py-3"
        >
          <div className="container flex items-center justify-between gap-4">
            <p className="hidden md:block text-sm text-muted-foreground font-body">
              Análise gratuita do seu negócio
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto text-center px-6 py-3 rounded-full bg-cta-gradient text-primary-foreground font-heading font-bold text-sm shadow-cta hover:shadow-cta-hover hover:scale-105 transition-all duration-300"
            >
              AGENDAR AGORA
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBar;
