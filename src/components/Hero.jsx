import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home as HomeIcon, PhoneCall, Info } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';
import busStandImg from '../assets/bus_stand.png';
import logoImg from '../assets/logo.png';

const INSTAGRAM_URL = 'https://www.instagram.com/cathedral_ocym_pmdy?igsh=bWl0c2pyNHFsOXg3';
const FACEBOOK_URL = 'https://www.facebook.com/share/14eoLzUtZy3/';

export default function Hero({ onOpenLogo, onOpenAbout, lastUpdated }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative overflow-hidden min-h-[240px] sm:min-h-[300px] md:min-h-[340px]">

      {/* ── Background: bus_stand.png covers full hero ── */}
      <div className="absolute inset-0">
        <img
          src={busStandImg}
          alt="Pampady Bus Stand"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Gradient overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.80) 25%, rgba(255,255,255,0.40) 65%, rgba(255,255,255,0) 100%)',
          }}
        />
      </div>

      {/* ── Fixed Floating Hamburger Menu Button (Positioned over Hero, below top Navbar) ── */}
      <div className="fixed top-16 right-4 sm:top-18 sm:right-6 z-40">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="bg-slate-900/80 hover:bg-slate-900 active:scale-95 backdrop-blur-md border border-white/20 text-white shadow-xl rounded-2xl p-2.5 sm:p-3 min-h-[44px] min-w-[44px] flex items-center justify-center transition-all cursor-pointer group"
          title="Open Menu"
        >
          <Menu className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* ── Text content sits on top of photo ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md space-y-3"
        >
          {/* Builder / Initiator Badge */}
          <div
            onClick={onOpenLogo}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md shadow-lg border border-amber-500/40 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            title="Click to view logo"
          >
            <img
              src={logoImg}
              alt="Cathedral OCYM Pampady Logo"
              className="w-6 h-6 rounded-full object-cover border border-amber-400 shrink-0"
            />
            <span className="text-xs font-semibold tracking-wide text-slate-200">
              Built by <strong className="text-amber-400 font-extrabold">Cathedral OCYM Pampady</strong>
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight drop-shadow-xs">
            Bus Timings
            <br />
            <span className="text-blue-700">via Pampady Bus Stand</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-xs sm:max-w-sm">
            Find accurate timings for all buses passing through Pampady Bus Stand.
          </p>
        </motion.div>
      </div>

      {/* ── Slide-out Hamburger Menu Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[85vw] max-w-xs bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-900 text-white">
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenLogo?.();
                    }}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 hover:scale-110 transition-transform cursor-pointer bg-slate-950"
                    title="Click to view logo"
                  >
                    <img src={logoImg} alt="Cathedral OCYM Pampady" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-extrabold text-white text-sm leading-tight">Pampady Bus Stand</p>
                    <p className="text-xs text-amber-400 font-bold">Cathedral OCYM Pampady</p>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 py-3 overflow-y-auto divide-y divide-slate-100">
                {/* Home */}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors min-h-[56px] group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <HomeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Home</p>
                    <p className="text-xs text-slate-500 font-medium">Return to main page</p>
                  </div>
                </button>

                {/* Contact */}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-emerald-50 active:bg-emerald-100 transition-colors min-h-[56px] group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Contact</p>
                    <p className="text-xs text-slate-500 font-medium">Email & Phone details</p>
                  </div>
                </button>

                {/* About */}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenAbout?.();
                  }}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-purple-50 active:bg-purple-100 transition-colors min-h-[56px] group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">About</p>
                    <p className="text-xs text-slate-500 font-medium">About this initiative</p>
                  </div>
                </button>
              </div>

              {/* Drawer Footer with Social Icons */}
              <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
                <div className="space-y-2 text-center">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Connect With Us</p>
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                      title="Follow on Instagram"
                    >
                      <InstagramIcon className="w-5 h-5" />
                    </a>
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                      title="Follow on Facebook"
                    >
                      <FacebookIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-center space-y-1">
                  {lastUpdated && (
                    <p className="text-[11px] font-semibold text-slate-500">
                      Last Updated: <span className="text-blue-700 font-bold">{lastUpdated}</span>
                    </p>
                  )}
                  <p className="text-[11px] font-extrabold text-amber-600">Built by Cathedral OCYM Pampady</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
