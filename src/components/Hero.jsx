import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/40 to-slate-50 pt-8 pb-14 px-4 sm:px-6 lg:px-8">
      {/* Decorative subtle background elements */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 space-y-3 text-left"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Live Bus Schedule • Kottayam, Kerala
            </div>

            {/* Main Heading matching prompt exactly */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Bus Timings <br />
              <span className="text-blue-600 font-black">via Pampady Bus Stand</span>
            </h1>

            {/* Subheading matching prompt exactly */}
            <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed">
              Find accurate bus timings, routes and schedules for all buses passing through Pampady Bus Stand.
            </p>
          </motion.div>

          {/* Bus Visual Graphic / Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 relative flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/80 bg-gradient-to-tr from-blue-900 to-indigo-800 p-1 group">
              {/* Bus photo background / illustration representation */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                {/* Visual SVG Bus Graphic */}
                <svg className="w-full h-full object-cover text-blue-400 opacity-90" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="400" height="300" fill="#1E293B" />
                  {/* Sky/Header gradient */}
                  <rect width="400" height="180" fill="url(#skyGrad)" />
                  {/* Bus Body SVG outline */}
                  <g transform="translate(40, 50)">
                    {/* Red KSRTC Style Bus Body */}
                    <rect x="20" y="30" width="280" height="150" rx="20" fill="#DC2626" />
                    <rect x="20" y="100" width="280" height="80" rx="10" fill="#B91C1C" />
                    {/* Windshield */}
                    <rect x="40" y="45" width="110" height="50" rx="8" fill="#E0F2FE" opacity="0.9" />
                    <rect x="160" y="45" width="120" height="50" rx="8" fill="#E0F2FE" opacity="0.9" />
                    {/* Destination Banner */}
                    <rect x="60" y="15" width="180" height="22" rx="4" fill="#0F172A" />
                    <text x="150" y="30" fill="#FACC15" fontSize="11" fontWeight="bold" textAnchor="middle">PAMPADY - KOTTAYAM</text>
                    {/* Bus Brand Name */}
                    <text x="160" y="125" fill="#FFFFFF" fontSize="22" fontWeight="900" textAnchor="middle" letterSpacing="3">KSRTC</text>
                    {/* Wheels */}
                    <circle cx="80" cy="180" r="26" fill="#0F172A" stroke="#94A3B8" strokeWidth="4" />
                    <circle cx="80" cy="180" r="10" fill="#CBD5E1" />
                    <circle cx="240" cy="180" r="26" fill="#0F172A" stroke="#94A3B8" strokeWidth="4" />
                    <circle cx="240" cy="180" r="10" fill="#CBD5E1" />
                    {/* Headlights */}
                    <circle cx="35" cy="140" r="10" fill="#FDE047" />
                    <circle cx="285" cy="140" r="10" fill="#FDE047" />
                  </g>
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="400" y2="180" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E3A8A" />
                      <stop offset="1" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Subtle sheen overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                
                {/* Floating pill over image */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-white/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-800">Pampady Stand Active</span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Live Sync</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
