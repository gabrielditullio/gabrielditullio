import { motion } from "framer-motion";
import { fadeIn } from "../motion/MotionWrapper";
import { Search, Users, Instagram, Facebook, Music, Youtube, Linkedin } from "lucide-react";

const platforms = [
  { name: "GOOGLE ADS", icon: Search },
  { name: "META ADS", icon: Users },
  { name: "INSTAGRAM ADS", icon: Instagram },
  { name: "FACEBOOK ADS", icon: Facebook },
  { name: "TIKTOK ADS", icon: Music },
  { name: "YOUTUBE ADS", icon: Youtube },
  { name: "LINKEDIN ADS", icon: Linkedin },
];

const PlatformMarqueeV2 = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ duration: 0.8 }}
      className="py-4 bg-primary/5 border-y border-border overflow-hidden"
    >
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {[...platforms, ...platforms].map((p, i) => {
          const Icon = p.icon;
          return (
            <span
              key={`${p.name}-${i}`}
              className="text-sm font-heading font-medium tracking-widest text-muted-foreground/60 uppercase flex items-center gap-2"
            >
              <Icon size={16} className="text-primary" />
              {p.name}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PlatformMarqueeV2;
