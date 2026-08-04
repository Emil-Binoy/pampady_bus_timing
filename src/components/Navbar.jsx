import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

export default function Navbar({ onOpenLogo }) {
  return (
    <header className="sticky top-0 z-100 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs py-2.5 px-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center gap-1.5">
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

        {/* Centered Title & Subtitle under Logo */}
        <div className="flex flex-col items-center justify-center min-w-0 text-center">
          
          <p className="text-xs font-bold text-yellow-600 truncate tracking-wide">
            St. John's Orthodox Cathedral OCYM, Pampady
          </p>
        </div>
      </div>
    </header>
  );
}
