import React from 'react';
import { motion } from 'framer-motion';
import busStandImg from '../assets/bus_stand.png';
import logoImg from '../assets/logo.png';

export default function Hero({ onOpenLogo }) {
  return (
    <section className="relative overflow-hidden min-h-[240px] sm:min-h-[300px] md:min-h-[340px]">

      {/* ── Background: bus_stand.png covers the full hero ── */}
      <div className="absolute inset-0">
        <img
          src={busStandImg}
          alt="Pampady Bus Stand"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Dark gradient overlay — left side is more opaque for text readability,
            right side reveals the real photo. On desktop more photo is visible. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.80) 25%, rgba(255,255,255,0.40) 65%, rgba(255,255,255,0) 100%)',
          }}
        />
       
      </div>

      {/* ── Text content sits on top of the photo ── */}
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
    </section>
  );
}
