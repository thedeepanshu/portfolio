'use client';
import { useState } from 'react';
import BootSequence from '@/components/scenes/BootSequence';
import Hero from '@/components/scenes/Hero';
import About from '@/components/scenes/About';

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <main
        className={`transition-opacity duration-700 ${booted ? 'opacity-100' : 'opacity-0'}`}
      >
        <Hero />
        <About />
      </main>
    </>
  );
}
