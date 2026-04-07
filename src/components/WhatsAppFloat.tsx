import { getWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  const [stickyBarVisible, setStickyBarVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const ctaEl = document.getElementById("cta-final");
      const ctaVisible = ctaEl
        ? ctaEl.getBoundingClientRect().top < window.innerHeight &&
          ctaEl.getBoundingClientRect().bottom > 0
        : false;
      setStickyBarVisible(window.scrollY > 500 && !ctaVisible);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-6 z-50 w-16 h-16 rounded-full bg-cta-gradient shadow-cta hover:shadow-cta-hover flex items-center justify-center animate-float transition-all duration-300"
      style={{ bottom: stickyBarVisible ? "76px" : "24px" }}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={28} strokeWidth={2} className="text-primary-foreground" />
    </motion.a>
  );
};

export default WhatsAppFloat;
