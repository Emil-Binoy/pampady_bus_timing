import React, { useState } from 'react';
import { Menu, X, Bus, RefreshCw, Clock, MapPin, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

export default function Navbar({ onRefresh, isRefreshing, lastUpdated, onSelectPopular, onOpenLogo }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">

          {/* Logo & Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer min-w-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                onOpenLogo?.();
              }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-sm border-2 border-amber-500/60 shrink-0 bg-white hover:scale-110 active:scale-95 transition-transform cursor-pointer"
              title="Click to view logo"
            >
              <img src={logoImg} alt="Cathedral OCYM Pampady Logo" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight truncate">
                Pampady Bus Stand
              </h1>
              <p className="text-[11px] sm:text-xs font-extrabold text-amber-600 truncate">
                By Cathedral OCYM Pampady
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Refresh button — min 44px touch */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh data"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 active:scale-95 transition-all text-xs font-bold min-h-[44px]"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="p-3 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[85vw] max-w-xs bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenLogo?.();
                    }}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500/60 shrink-0 hover:scale-110 transition-transform cursor-pointer"
                    title="Click to view logo"
                  >
                    <img src={logoImg} alt="Cathedral OCYM Pampady" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 text-sm">Pampady Bus Stand</p>
                    <p className="text-xs text-amber-600 font-bold">Cathedral OCYM Pampady</p>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links — large tap areas */}
              <div className="flex-1 py-3 overflow-y-auto">
                {[
                  { icon: Bus, label: 'Home', sub: 'Go back to top', action: () => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
                  { icon: MapPin, label: 'Search Buses', sub: 'Find your destination', action: () => { setMenuOpen(false); document.getElementById('search-card-section')?.scrollIntoView({ behavior: 'smooth' }); } },
                  { icon: Clock, label: 'Kottayam Buses', sub: 'View Kottayam schedule', action: () => { setMenuOpen(false); onSelectPopular?.('Kottayam'); } },
                  { icon: Clock, label: 'Ernakulam Buses', sub: 'View Ernakulam schedule', action: () => { setMenuOpen(false); onSelectPopular?.('Ernakulam'); } },
                  { icon: Clock, label: 'Changanassery Buses', sub: 'View Changanassery schedule', action: () => { setMenuOpen(false); onSelectPopular?.('Changanassery'); } },
                ].map(({ icon: Icon, label, sub, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors border-b border-slate-50 min-h-[64px]"
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{label}</p>
                      <p className="text-xs text-slate-500">{sub}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="px-5 py-4 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700">
                  <Info className="w-4 h-4 text-blue-500 shrink-0" />
                  <p className="text-sm font-semibold">Last Updated: <span className="text-blue-600">{lastUpdated}</span></p>
                </div>
                <p className="text-xs font-bold text-amber-600">Built by Cathedral OCYM Pampady</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
