import { getWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";

const WhatsAppFloat = () => {
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
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-cta-gradient shadow-cta hover:shadow-cta-hover flex items-center justify-center text-3xl animate-float"
      aria-label="Falar no WhatsApp"
    >
      💬
    </motion.a>
  );
};

export default WhatsAppFloat;
