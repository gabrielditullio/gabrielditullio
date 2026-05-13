import React from 'react';
import Header from '@/components/barbearia/Header';
import Hero from '@/components/barbearia/Hero';
import MenteesTicker from '@/components/barbearia/MenteesTicker';
import Caminho from '@/components/barbearia/Caminho';
import Diagnostico from '@/components/barbearia/Diagnostico';

const WorkshopBarbearia = () => {
  return (
    <main className="bg-toledo-carbono min-h-screen">
      <Header />
      <Hero />
      <MenteesTicker />
      <Caminho />
      <Diagnostico />
    </main>
  );
};

export default WorkshopBarbearia;