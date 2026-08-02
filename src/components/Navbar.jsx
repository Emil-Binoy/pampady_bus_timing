import React, { useState } from 'react';
import { Menu, X, Bus, RefreshCw, Clock, MapPin, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onRefresh, isRefreshing, lastUpdated, onSelectPopular }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
          
          {/* Logo & Brand Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Circular Gold/Dark Heritage Logo Badge */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-900 via-amber-950 to-black p-0.5 shadow-md flex items-center justify-center border border-amber-500/40 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full rounded-full bg-amber-950/80 flex items-center justify-center p-1.5 overflow-hidden relative">
                <Bus className="w-5 h-5 text-amber-400 stroke-[2.2]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-400/10 to-transparent pointer-events-none" />
              </div>
            </div>

            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight tracking-tight flex items-center gap-1.5">
                Pampady Bus Stand
              </h1>
              <p className="text-xs font-semibold text-blue-600 tracking-wide">
                Bus Timings
              </p>
            </div>
          </div>

          {/* Right Action & Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh live data"
              className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 active:scale-95 transition-all duration-150 flex items-center gap-1.5 text-xs font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 active:scale-95 transition-all"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Drawer Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Side Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-950 flex items-center justify-center">
                      <Bus className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900 text-sm">Pampady Bus Stand</h2>
                      <p className="text-xs text-blue-600 font-medium">Live Timings & Routes</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav items */}
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium text-sm transition-colors text-left"
                  >
                    <Bus className="w-4 h-4 text-blue-600" />
                    Home & Timings
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      const el = document.getElementById('search-card-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium text-sm transition-colors text-left"
                  >
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Search Destinations
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      if (onSelectPopular) onSelectPopular('Kottayam');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium text-sm transition-colors text-left"
                  >
                    <Clock className="w-4 h-4 text-blue-600" />
                    Kottayam Buses
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      if (onSelectPopular) onSelectPopular('Ernakulam');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium text-sm transition-colors text-left"
                  >
                    <Clock className="w-4 h-4 text-blue-600" />
                    Ernakulam Buses
                  </button>
                </div>
              </div>

              {/* Bottom drawer info */}
              <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span>Last Updated: {lastUpdated}</span>
                </div>
                <p>Data synced directly with Google Sheets for accuracy.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
