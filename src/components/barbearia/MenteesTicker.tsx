import React, { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { fadeInUp } from '@/lib/animations-toledo';

interface Mentee {
  handle: string;
  name: string;
  image: string;
}

const MENTEES: Mentee[] = [
  { handle: "@isa.barbearia", name: "Isa Santos", image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=600&h=800&auto=format&fit=crop" },
  { handle: "@renanbarber", name: "Renan & Gabriela", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&h=800&auto=format&fit=crop" },
  { handle: "@eurico.barber", name: "Eurico Almeida", image: "https://images.unsplash.com/photo-1621605815841-28d944683b83?q=80&w=600&h=800&auto=format&fit=crop" },
  { handle: "@caio.barbershop", name: "Caio Pereira", image: "https://images.unsplash.com/photo-1503910368127-b45070243e8a?q=80&w=600&h=800&auto=format&fit=crop" },
  { handle: "@cleyton.barbearia", name: "Cleyton Souza", image: "https://images.unsplash.com/photo-1512864084360-7c0c4d0a081a?q=80&w=600&h=800&auto=format&fit=crop" },
  { handle: "@jackson.toledos", name: "Jackson Lima", image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=600&h=800&auto=format&fit=crop" },
  { handle: "@marcos.barber", name: "Marcos Vinícius", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=600&h=800&auto=format&fit=crop" },
  { handle: "@felipe.toledos", name: "Felipe Santos", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=800&auto=format&fit=crop" },
  { handle: "@rafael.cortes", name: "Rafael Oliveira", image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=600&h=800&auto=format&fit=crop" },
  { handle: "@diego.barber", name: "Diego Almeida", image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&h=800&auto=format&fit=crop" },
  { handle: "@lucas.barbearia", name: "Lucas Felix", image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=600&h=800&auto=format&fit=crop" },
  { handle: "@pedro.toledos", name: "Pedro Henrique", image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=600&h=800&auto=format&fit=crop" },
  { handle: "@andre.cortes", name: "André Vermont", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&h=800&auto=format&fit=crop" },
];

// I'll use the specific Unsplash placeholder requested by user instead of the manual ones above to be fully compliant
const MENTEES_WITH_USER_PLACEHOLDERS = MENTEES.map((mentee, index) => ({
  ...mentee,
  image: `https://source.unsplash.com/featured/600x800/?brazilian,barber,portrait&sig=${index + 1}`
}));

const MenteeCard = ({ mentee }: { mentee: Mentee }) => {
  return (
    <div className="w-[300px] h-[400px] md:w-[420px] md:h-[540px] flex-shrink-0 rounded-2xl overflow-hidden relative border border-white/15">
      {/* Layer 1: Image */}
      <img 
        src={mentee.image} 
        alt={mentee.name} 
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      
      {/* Layer 2: Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0E0B09]/50" />
      
      {/* Layer 3: Info Chip */}
      <div className="absolute bottom-4 left-4 right-4 p-3 md:p-4 bg-[#0E0B09]/40 backdrop-blur-sm rounded-xl flex flex-col gap-1 border border-white/5">
        <div className="flex gap-2 items-center">
          <Instagram size={16} className="text-toledo-creme/80" />
          <span className="font-body-toledo text-sm text-toledo-creme/80">
            {mentee.handle}
          </span>
        </div>
        <h4 className="font-display-toledo text-lg font-medium text-toledo-creme">
          {mentee.name}
        </h4>
      </div>
    </div>
  );
};

const MenteesTicker = () => {
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 50,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 50,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  // Duplicate the list for seamless marquee
  const duplicatedMentees = [...MENTEES_WITH_USER_PLACEHOLDERS, ...MENTEES_WITH_USER_PLACEHOLDERS];

  return (
    <section id="mentees" className="bg-toledo-carbono py-12 md:py-16 lg:py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        {/* Infinite Horizontal Marquee */}
        <div 
          className="relative overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            className="flex gap-4"
            animate={controls}
            initial={{ x: 0 }}
          >
            {duplicatedMentees.map((mentee, index) => (
              <MenteeCard key={`${mentee.handle}-${index}`} mentee={mentee} />
            ))}
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div 
          className="pt-8 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="font-display-toledo text-xl md:text-3xl font-normal text-toledo-creme/70 max-w-4xl mx-auto">
            Todos esses donos de barbearia utilizam ou utilizaram o método do Toledo em suas operações.
          </h3>
        </motion.div>
      </div>
    </section>
  );
};

export default MenteesTicker;