'use client';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import HeroParticles from './HeroParticles';

const taglineFull =
  'frontend_developer.exe — building interfaces that feel alive';

export default function Hero() {
  const [tagline, setTagline] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTagline(taglineFull.slice(0, i + 1));
      i++;
      if (i === taglineFull.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <HeroParticles />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 pointer-events-none">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="font-mono text-cyan-400 text-sm md:text-base tracking-wide"
        >
          {tagline}
          <span className="animate-pulse">_</span>
        </motion.p>
      </div>
    </section>
  );
}
