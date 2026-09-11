'use client';
import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';

const memoryLogs = [
  '> memory_log_01: 5 years building interfaces that scale.',
  '> memory_log_02: frontend engineer @ ANRX Solutions since 2021.',
  '> memory_log_03: currently completing B.Tech in CSE.',
  '> memory_log_04: driven by systems that feel alive, not static.',
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerBackRef = useRef<HTMLDivElement>(null);
  const layerMidRef = useRef<HTMLDivElement>(null);
  const layerFrontRef = useRef<HTMLDivElement>(null);
  const logRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax layers move at different speeds as you scroll through the section
      gsap.to(layerBackRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to(layerMidRef.current, {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to(layerFrontRef.current, {
        yPercent: -45,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Memory logs fade/slide in one by one as they enter view
      logRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[150vh] bg-black overflow-hidden"
    >
      {/* Parallax skyline layers */}
      <div ref={layerBackRef} className="absolute inset-0 opacity-30">
        <CitySilhouette
          className="text-cyan-900"
          heightClass="h-1/3"
          seed={1}
        />
      </div>
      <div ref={layerMidRef} className="absolute inset-0 opacity-50">
        <CitySilhouette
          className="text-cyan-700"
          heightClass="h-1/2"
          seed={2}
        />
      </div>
      <div ref={layerFrontRef} className="absolute inset-0 opacity-80">
        <CitySilhouette
          className="text-cyan-500"
          heightClass="h-2/3"
          seed={3}
        />
      </div>

      {/* Memory logs */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 space-y-6 max-w-2xl">
        {memoryLogs.map((line, i) => (
          <p
            key={i}
            ref={(el) => {
              logRefs.current[i] = el;
            }}
            className="font-mono text-sm md:text-lg text-white/90"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

// Deterministic pseudo-random generator (mulberry32) — same seed always
// produces the same sequence, so server and client render identically.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function CitySilhouette({
  className,
  heightClass,
  seed = 1,
}: {
  className: string;
  heightClass: string;
  seed?: number;
}) {
  const rand = mulberry32(seed);
  const buildingCount = 40;
  const buildings = Array.from({ length: buildingCount }, (_, i) => ({
    x: i * (100 / buildingCount),
    width: (100 / buildingCount) * (0.4 + rand() * 0.3), // gaps between buildings
    height: 10 + rand() * 40, // shorter, more varied
  }));

  return (
    <svg
      viewBox="0 0 100 60"
      preserveAspectRatio="none"
      className={`w-full ${heightClass} absolute bottom-0 ${className}`}
    >
      {buildings.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={60 - b.height}
          width={b.width}
          height={b.height}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
