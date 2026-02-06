import { getWhatsAppLink } from "@/lib/whatsapp";

const WhatsAppFloat = () => {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-cta-gradient shadow-cta hover:shadow-cta-hover flex items-center justify-center text-3xl animate-float hover:scale-110 transition-transform duration-200"
      aria-label="Falar no WhatsApp"
    >
      💬
    </a>
  );
};

export default WhatsAppFloat;
