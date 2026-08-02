import React from 'react';
import { Bus, Search, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmptyState({ message, onReset, onRefresh }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-100 shadow-xs max-w-lg mx-auto my-6 space-y-4"
    >
      {/* Bus graphic icon container */}
      <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 border-4 border-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
        <Bus className="w-10 h-10 stroke-[1.8]" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl font-extrabold text-slate-900">No buses found</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          {message || 'We could not find any bus schedules matching your search criteria.'}
        </p>
      </div>

      <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
        {onReset && (
          <button
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>View All Buses</span>
          </button>
        )}

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span>Reload Sheet</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
