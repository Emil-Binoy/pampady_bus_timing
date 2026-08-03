import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function LogoModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 max-w-sm sm:max-w-md w-full bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 text-center space-y-5 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title Header */}
            <div className="space-y-1 pt-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Official Logo
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Cathedral OCYM Pampady
              </h2>
            </div>

            {/* Instagram / WhatsApp Style Zoomed Profile Photo */}
            <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl shadow-amber-500/20 bg-slate-950 flex items-center justify-center group">
              <img
                src={logoImg}
                alt="Cathedral OCYM Pampady Full Logo"
                className="w-full h-full object-cover select-none"
              />
            </div>

            {/* Footer notice */}
            <div className="pt-2 text-xs text-slate-400 font-medium">
              Tap anywhere to close
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
