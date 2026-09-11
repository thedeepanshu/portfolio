'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/projects';

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId)!;

  return (
    <section className="relative min-h-screen bg-black py-24 px-6 md:px-20">
      <p className="font-mono text-cyan-400 text-sm mb-10">
        {'> archive_access.init()'}
      </p>

      <div className="grid md:grid-cols-[280px_1fr] gap-10">
        {/* File list */}
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`text-left font-mono text-sm px-4 py-3 border transition-colors whitespace-nowrap ${
                p.id === activeId
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-400/10'
                  : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white/80'
              }`}
            >
              {p.tag} — {p.title}
            </button>
          ))}
        </div>

        {/* Active panel */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <HoloPanel key={active.id} project={active} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function HoloPanel({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
      exit={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="relative border border-cyan-400/40 bg-cyan-400/5 backdrop-blur-sm p-8 overflow-hidden"
    >
      {/* corner brackets — sells the "HUD panel" look */}
      <Corner className="top-2 left-2" />
      <Corner className="top-2 right-2 rotate-90" />
      <Corner className="bottom-2 left-2 -rotate-90" />
      <Corner className="bottom-2 right-2 rotate-180" />

      {/* scanline sweep on mount */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: '200%' }}
        transition={{ duration: 1, ease: 'linear' }}
        className="absolute left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent pointer-events-none"
      />

      <p className="font-mono text-xs text-cyan-400/70 mb-2">{project.tag}</p>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {project.title}
      </h3>
      <p className="text-white/70 leading-relaxed mb-6 max-w-xl">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-xs font-mono border border-white/20 text-white/60 px-2 py-1"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <svg
      className={`absolute w-4 h-4 text-cyan-400 ${className}`}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path d="M0 0 H8 M0 0 V8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
