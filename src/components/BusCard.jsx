import React from 'react';
import { ChevronRight, Clock, ShieldCheck, Bus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BusCard({ bus, index, routeName }) {
  // Determine if it's past or upcoming based on current time
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const isPast = bus.minutes < currentMinutes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ scale: 1.01, translateY: -2 }}
      className={`group relative bg-white rounded-2xl p-4 sm:p-5 shadow-xs border transition-all duration-200 cursor-pointer ${
        isPast
          ? 'border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-200 hover:shadow-sm'
          : 'border-slate-100 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5'
      }`}
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Departure Time */}
        <div className="flex items-center gap-3 min-w-[100px] sm:min-w-[130px]">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-500" />
              Departs
            </span>
            <span className="text-base sm:text-xl font-extrabold text-blue-600 tracking-tight group-hover:text-blue-700">
              {bus.time}
            </span>
          </div>
        </div>

        {/* Bus Name & Serial Number */}
        <div className="flex-1 min-w-0 px-1 sm:px-2">
          <div className="flex items-center gap-2 mb-0.5">
            {bus.sl && (
              <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                #{bus.sl}
              </span>
            )}
            <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate group-hover:text-blue-900 transition-colors">
              {bus.name}
            </h3>
          </div>

          <p className="text-xs text-slate-500 truncate flex items-center gap-1">
            <Bus className="w-3 h-3 text-slate-400 shrink-0" />
            <span>Via Pampady Bus Stand</span>
          </p>
        </div>

        {/* Bus Type Tag (KSRTC in bold red / Private in blue) */}
        <div className="flex items-center gap-3 shrink-0">
          {bus.isKsrtc ? (
            <div className="flex flex-col items-end">
              <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-xs sm:text-sm font-black tracking-wide border border-red-100">
                KSRTC
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-end">
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs sm:text-sm font-bold tracking-wide border border-blue-100">
                Private
              </span>
            </div>
          )}

          {/* Right Chevron Arrow */}
          <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all">
            <ChevronRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

      </div>
    </motion.div>
  );
}
