import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bus, Info, Heart, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function AboutModal({ isOpen, onClose }) {
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
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 max-w-lg w-full bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 text-white space-y-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 bg-amber-950 shrink-0 shadow-lg">
                <img src={logoImg} alt="Cathedral OCYM Pampady" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  About Initiative
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Pampady Bus Stand Timings
                </h2>
                <p className="text-xs text-amber-400 font-bold">By Cathedral OCYM Pampady</p>
              </div>
            </div>

            {/* Body Description */}
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-normal">
              <p>
                <strong>Pampady Bus Stand Timings</strong> is a community-driven digital initiative created to provide accurate, real-time bus schedules for all passengers traveling through Pampady Bus Stand, Kottayam.
              </p>
              <p>
                Whether you are commuting locally to Kottayam, Changanassery, Pala, Thiruvalla, or traveling long-distance via KSRTC and Private buses, this platform offers quick and updated information directly from verified local schedules.
              </p>

              <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> Key Features
                </div>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li>• Dynamic schedule synchronization with official sheets</li>
                  <li>• Categorized KSRTC and Private bus listings</li>
                  <li>• Upcoming bus notifications based on current time</li>
                  <li>• Accessible, mobile-friendly interface in English & Malayalam</li>
                </ul>
              </div>
            </div>

            {/* Footer notice */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Pampady
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
