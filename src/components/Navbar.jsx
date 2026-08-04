import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

export default function Navbar({ onOpenLogo }) {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs py-2.5 px-4">
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-3">
        {/* Animated Logo with subtle bounce */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={onOpenLogo}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-sm border-2 border-amber-500/80 shrink-0 bg-white hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          title="Click to view logo"
        >
          <img src={logoImg} alt="Cathedral OCYM Pampady Logo" className="w-full h-full object-cover" />
        </motion.div>

        {/* Vertically Centered Title & Subtitle */}
        <div className="flex flex-col items-start justify-center min-w-0">
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight truncate">
            Pampady Bus Stand
          </h1>
          <p className="text-xs font-extrabold text-blue-600 truncate tracking-wide">
            Bus Timings
          </p>
        </div>
      </div>
    </header>
  );
}
