import React from 'react';
import { Clock, Bus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BusCard({ bus, index, isNextBus }) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const isPast = bus.minutes < currentMinutes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
      className={`relative rounded-2xl border transition-all duration-200 overflow-hidden ${
        isNextBus
          ? 'border-emerald-400 bg-emerald-50 shadow-md shadow-emerald-100'
          : isPast
          ? 'border-slate-100 bg-slate-50 opacity-60'
          : 'border-slate-200 bg-white shadow-xs'
      }`}
    >
      {/* ── NEXT BUS Banner ── */}
      {isNextBus && (
        <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block shrink-0" />
          ⬇ NEXT BUS
        </div>
      )}

      <div className="p-4 space-y-2">

        {/* ── TOP ROW: Serial · Time · Badge ── */}
        <div className="flex items-center justify-between gap-2">

          {/* Left: serial + time grouped */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Serial circle */}
            <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold border-2 ${
              isPast
                ? 'border-slate-200 bg-slate-100 text-slate-400'
                : isNextBus
                ? 'border-emerald-400 bg-emerald-500 text-white'
                : 'border-blue-100 bg-blue-50 text-blue-700'
            }`}>
              {bus.sl || index + 1}
            </div>

            {/* Departure time */}
            <div>
              <p className={`text-xl sm:text-2xl font-black leading-none tracking-tight ${
                isPast ? 'text-slate-400' : isNextBus ? 'text-emerald-700' : 'text-blue-600'
              }`}>
                {bus.time}
              </p>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {isPast ? 'Departed' : 'Departs'}
              </p>
            </div>
          </div>

          {/* Right: Bus type badge */}
          <div className="shrink-0">
            {bus.isKsrtc ? (
              <span className="block px-3 py-1.5 rounded-xl bg-red-600 text-white text-sm font-black tracking-wide text-center min-w-[60px]">
                KSRTC
              </span>
            ) : (
              <span className="block px-3 py-1.5 rounded-xl bg-slate-700 text-white text-sm font-bold tracking-wide text-center min-w-[60px]">
                Private
              </span>
            )}
          </div>
        </div>

        {/* ── BOTTOM ROW: Full bus name — wraps freely, never truncated ── */}
        <div className="pl-10">
          <p className={`text-base font-bold leading-snug break-words ${
            isPast ? 'text-slate-400' : 'text-slate-900'
          }`}>
            {bus.name}
          </p>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <Bus className="w-3 h-3 shrink-0" />
            <span>Via Pampady Bus Stand</span>
          </p>
        </div>

      </div>
    </motion.div>
  );
}
