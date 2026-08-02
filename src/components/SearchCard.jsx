import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DestinationChips from './DestinationChips';

export default function SearchCard({
  routes,
  searchQuery,
  setSearchQuery,
  filteredRoutes,
  selectedRoute,
  onSelectRoute,
  popularRoutes,
  loadingRoutes,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSelectSuggestion = (route) => {
    onSelectRoute(route);
    setIsDropdownOpen(false);
    // Scroll to results
    setTimeout(() => {
      const el = document.getElementById('bus-results');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredRoutes.length > 0) {
      handleSelectSuggestion(filteredRoutes[0]);
    }
  };

  return (
    <div id="search-card-section" className="relative max-w-2xl mx-auto px-3 sm:px-6 -mt-6 sm:-mt-8 z-30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-200/60 border border-slate-100"
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-blue-600 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
              Search Destination
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Where do you want to go?
            </p>
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="space-y-4">

          {/* Search Input — large for easy typing */}
          <div className="relative" ref={dropdownRef}>
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder={
                  selectedRoute
                    ? `📍 ${selectedRoute.englishName}`
                    : 'Type destination...'
                }
                className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 pl-4 pr-12 py-4 rounded-2xl border-2 border-blue-500 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 text-base font-semibold outline-none transition-all duration-200 min-h-[56px]"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <div className="absolute right-3 p-2 pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && searchQuery.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 max-h-64 overflow-y-auto z-50"
                >
                  {loadingRoutes ? (
                    <div className="p-5 text-center text-sm text-slate-500 font-medium">
                      Loading destinations...
                    </div>
                  ) : filteredRoutes.length > 0 ? (
                    filteredRoutes.map((route) => {
                      const isSelected = selectedRoute && selectedRoute.id === route.id;
                      return (
                        <button
                          key={route.id}
                          type="button"
                          onClick={() => handleSelectSuggestion(route)}
                          className="w-full px-4 py-4 text-left border-b border-slate-50 last:border-0 hover:bg-blue-50 flex items-center justify-between gap-3 transition-colors min-h-[60px]"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                            <div>
                              <p className="text-base font-bold text-slate-800">
                                {route.englishName}
                              </p>
                              {route.malayalamName && (
                                <p className="text-sm text-slate-500">{route.malayalamName}</p>
                              )}
                            </div>
                          </div>
                          {isSelected && <Check className="w-5 h-5 text-blue-600 shrink-0" />}
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-5 text-center text-sm text-slate-500 font-medium">
                      No results for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Popular Chips */}
          <DestinationChips
            popularRoutes={popularRoutes}
            selectedRoute={selectedRoute}
            onSelectRoute={(route) => {
              onSelectRoute(route);
              setIsDropdownOpen(false);
              setTimeout(() => {
                const el = document.getElementById('bus-results');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 200);
            }}
          />

          {/* Big Search Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center justify-center gap-3 text-lg min-h-[56px] cursor-pointer"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
            Search Buses
          </button>
        </form>
      </motion.div>
    </div>
  );
}
