'use client';
import { useState } from 'react';
import BootSequence from '@/components/scenes/BootSequence';

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <main
        className={`min-h-screen bg-black text-white transition-opacity duration-700 ${
          booted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="text-3xl p-10">Hero section coming next...</h1>
      </main>
    </>
  );
}
