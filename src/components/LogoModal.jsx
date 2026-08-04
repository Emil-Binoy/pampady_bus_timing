import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';
import logoImg from '../assets/logo.png';

const INSTAGRAM_URL = 'https://www.instagram.com/cathedral_ocym_pmdy?igsh=bWl0c2pyNHFsOXg3';
const FACEBOOK_URL = 'https://www.facebook.com/share/14eoLzUtZy3/';

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

            {/* Instagram / Profile Photo */}
            <div className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl shadow-amber-500/20 bg-slate-950 flex items-center justify-center group">
              <img
                src={logoImg}
                alt="Cathedral OCYM Pampady Full Logo"
                className="w-full h-full object-cover select-none"
              />
            </div>

            {/* Social Media Links */}
            <div className="space-y-2.5 pt-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Follow Us On Social Media
              </p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <FacebookIcon className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            {/* Footer notice */}
            <div className="pt-1 text-xs text-slate-400 font-medium">
              Tap backdrop or close button to dismiss
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
