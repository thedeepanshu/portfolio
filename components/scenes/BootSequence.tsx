'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  '> initializing system...',
  '> loading identity_module.exe',
  '> thedeepanshu.instance found',
  '> seems like a friend',
  '> access granted',
];

export default function BootSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIndex < bootLines.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 400);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setDone(true), 600);
      return () => clearTimeout(t);
    }
  }, [lineIndex]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 1200);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 font-mono text-cyan-400">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key="terminal" className="text-sm md:text-base space-y-2">
            {bootLines.slice(0, lineIndex).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        ) : (
          <GlitchName />
        )}
      </AnimatePresence>
    </div>
  );
}

function GlitchName() {
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative text-5xl md:text-8xl font-bold text-white tracking-wider"
    >
      <span className="relative inline-block">
        DEEPANSHU
        <motion.span
          className="absolute inset-0 text-cyan-400"
          animate={{ x: [0, -4, 3, -2, 0], opacity: [1, 0.6, 0.8, 0.5, 0] }}
          transition={{ duration: 0.6, times: [0, 0.2, 0.4, 0.6, 1] }}
        >
          DEEPANSHU
        </motion.span>
        <motion.span
          className="absolute inset-0 text-pink-500"
          animate={{ x: [0, 4, -3, 2, 0], opacity: [1, 0.6, 0.8, 0.5, 0] }}
          transition={{ duration: 0.6, times: [0, 0.2, 0.4, 0.6, 1] }}
        >
          DEEPANSHU
        </motion.span>
      </span>
    </motion.h1>
  );
}
