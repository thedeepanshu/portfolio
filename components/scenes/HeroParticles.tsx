'use client';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 2000;

function generateParticleData() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const targets = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 2.2;
    targets[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    targets[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    targets[i * 3 + 2] = r * Math.cos(phi);
  }

  return { positions, targets };
}

export default function HeroParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const progress = useRef(0);

  // Lazy initializer: runs exactly once on mount, sanctioned by React for
  // one-time impure/random computation — no effect or setState needed.
  const [data] = useState(() => generateParticleData());

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;

    if (progress.current < 1) {
      progress.current += 0.006;
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const t = progress.current;
      posAttr.array[ix] = THREE.MathUtils.lerp(
        data.positions[ix],
        data.targets[ix],
        t
      );
      posAttr.array[ix + 1] = THREE.MathUtils.lerp(
        data.positions[ix + 1],
        data.targets[ix + 1],
        t
      );
      posAttr.array[ix + 2] = THREE.MathUtils.lerp(
        data.positions[ix + 2],
        data.targets[ix + 2],
        t
      );
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#22d3ee"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}
