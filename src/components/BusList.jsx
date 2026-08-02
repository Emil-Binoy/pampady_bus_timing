import React from 'react';
import BusCard from './BusCard';
import LoadingSkeleton from './LoadingSkeleton';
import EmptyState from './EmptyState';
import { Info, Bus, Clock, Filter, AlertCircle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BusList({
  selectedRoute,
  buses,
  rawBuses,
  loadingBuses,
  busesError,
  busFilter,
  setBusFilter,
  onResetFilter,
  onRefresh,
}) {
  if (!selectedRoute) return null;

  const ksrtcCount = rawBuses ? rawBuses.filter((b) => b.isKsrtc).length : 0;
  const privateCount = rawBuses ? rawBuses.filter((b) => !b.isKsrtc).length : 0;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-12 space-y-6">
      
      {/* Header section with destination name and count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Bus className="w-3.5 h-3.5" />
            <span>Destination Selected</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{selectedRoute.englishName}</span>
            {selectedRoute.malayalamName && (
              <span className="text-lg sm:text-2xl text-slate-500 font-medium">
                ({selectedRoute.malayalamName})
              </span>
            )}
          </h2>
        </div>

        {/* Bus Count Badge */}
        {!loadingBuses && !busesError && rawBuses.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold shadow-2xs">
              {buses.length} {buses.length === 1 ? 'Bus' : 'Buses'} Available
            </span>
          </div>
        )}
      </div>

      {/* Filter Tabs (All, KSRTC, Private, Upcoming) */}
      {!loadingBuses && !busesError && rawBuses.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setBusFilter('ALL')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              busFilter === 'ALL'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Buses ({rawBuses.length})
          </button>

          <button
            onClick={() => setBusFilter('KSRTC')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              busFilter === 'KSRTC'
                ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                : 'bg-white text-slate-600 hover:bg-red-50 hover:text-red-600 border border-slate-200'
            }`}
          >
            KSRTC ({ksrtcCount})
          </button>

          <button
            onClick={() => setBusFilter('PRIVATE')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              busFilter === 'PRIVATE'
                ? 'bg-blue-800 text-white shadow-md shadow-blue-800/20'
                : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-slate-200'
            }`}
          >
            Private ({privateCount})
          </button>

          <button
            onClick={() => setBusFilter('UPCOMING')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              busFilter === 'UPCOMING'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Upcoming Only</span>
          </button>
        </div>
      )}

      {/* Main Bus Cards Container */}
      <div className="space-y-3 min-h-[250px]">
        {loadingBuses ? (
          <LoadingSkeleton count={6} />
        ) : busesError ? (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center text-red-700 space-y-3">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
            <p className="font-bold text-base">{busesError}</p>
            <button
              onClick={onRefresh}
              className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : buses.length > 0 ? (
          <div className="space-y-3">
            {buses.map((bus, idx) => (
              <BusCard
                key={`${bus.sl}-${bus.time}-${idx}`}
                bus={bus}
                index={idx}
                routeName={selectedRoute.englishName}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            message={`No buses found for ${selectedRoute.englishName} matching '${busFilter}' filter.`}
            onReset={() => setBusFilter('ALL')}
            onRefresh={onRefresh}
          />
        )}
      </div>

      {/* Information Box (Exact callout matching reference image) */}
      <div className="mt-8 bg-blue-50/60 border border-blue-100 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-slate-700">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
          <h4 className="font-bold text-slate-900">Information</h4>
          <p className="text-slate-600">All times are subject to change by bus operators.</p>
          <p className="text-slate-600">Please arrive at the stop 5–10 minutes before the scheduled time.</p>
        </div>
      </div>
    </section>
  );
}
