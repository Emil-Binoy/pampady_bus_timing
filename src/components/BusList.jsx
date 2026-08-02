import React from 'react';
import BusCard from './BusCard';
import LoadingSkeleton from './LoadingSkeleton';
import EmptyState from './EmptyState';
import { Info, Bus, Clock, AlertCircle } from 'lucide-react';

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

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const ksrtcCount = rawBuses ? rawBuses.filter((b) => b.isKsrtc).length : 0;
  const privateCount = rawBuses ? rawBuses.filter((b) => !b.isKsrtc).length : 0;

  // Find the next upcoming bus index (across the full filtered list)
  const nextBusIdx = buses.findIndex((b) => b.minutes >= currentMinutes);

  return (
    <section id="bus-results" className="max-w-2xl mx-auto px-3 sm:px-6 pt-6 pb-28 space-y-5">

      {/* ─── Destination Header ─── */}
      <div className="flex flex-col gap-1 border-b border-slate-200 pb-4">
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
          <Bus className="w-3.5 h-3.5" /> Showing buses to
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
          {selectedRoute.englishName}
        </h2>
        {selectedRoute.malayalamName && (
          <p className="text-base text-slate-500 font-semibold">{selectedRoute.malayalamName}</p>
        )}

        {/* Bus count pill */}
        {!loadingBuses && !busesError && rawBuses.length > 0 && (
          <p className="text-sm text-slate-600 font-medium mt-1">
            <span className="font-extrabold text-blue-700">{buses.length}</span> buses available
          </p>
        )}
      </div>

      {/* ─── Filter Tabs ─── (larger, finger-friendly) */}
      {!loadingBuses && !busesError && rawBuses.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { key: 'ALL',      label: `All (${rawBuses.length})`,    active: 'bg-blue-600 text-white' },
            { key: 'UPCOMING', label: '🕐 Upcoming',                  active: 'bg-emerald-600 text-white'},
            { key: 'KSRTC',    label: `KSRTC (${ksrtcCount})`,       active: 'bg-red-600 text-white'  },
            { key: 'PRIVATE',  label: `Private (${privateCount})`,    active: 'bg-slate-800 text-white'},
          ].map(({ key, label, active }) => (
            <button
              key={key}
              onClick={() => setBusFilter(key)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-bold min-h-[44px] transition-all border cursor-pointer ${
                busFilter === key
                  ? `${active} border-transparent shadow-sm`
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ─── Bus Cards ─── */}
      <div className="space-y-3">
        {loadingBuses ? (
          <LoadingSkeleton count={6} />
        ) : busesError ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
            <p className="font-bold text-base text-red-700">{busesError}</p>
            <button
              onClick={onRefresh}
              className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors min-h-[44px]"
            >
              Try Again
            </button>
          </div>
        ) : buses.length > 0 ? (
          buses.map((bus, idx) => (
            <BusCard
              key={`${bus.sl}-${bus.time}-${idx}`}
              bus={bus}
              index={idx}
              isNextBus={idx === nextBusIdx}
            />
          ))
        ) : (
          <EmptyState
            message={`No buses found for ${selectedRoute.englishName} with '${busFilter}' filter.`}
            onReset={() => setBusFilter('ALL')}
            onRefresh={onRefresh}
          />
        )}
      </div>

      {/* ─── Info Notice ─── */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-sm sm:text-base leading-relaxed">
          <p className="font-bold text-slate-900">Important Notice</p>
          <p className="text-slate-600">Timings may change. Please arrive <strong>5–10 minutes early</strong>.</p>
        </div>
      </div>
    </section>
  );
}
