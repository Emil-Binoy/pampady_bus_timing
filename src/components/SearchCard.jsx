import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X, ArrowRight, Check } from 'lucide-react';
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

  // Close dropdown when clicking outside
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
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredRoutes.length > 0) {
      onSelectRoute(filteredRoutes[0]);
      setIsDropdownOpen(false);
    }
  };

  return (
    <div id="search-card-section" className="relative max-w-4xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 z-30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/70 border border-slate-100/90 backdrop-blur-xl relative"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold text-base sm:text-lg">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <MapPin className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h2>Search Destination</h2>
        </div>

        {/* Form / Search Input with Autocomplete */}
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="relative" ref={dropdownRef}>
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder={
                  selectedRoute
                    ? `Selected: ${selectedRoute.englishName} (Search other...)`
                    : 'Enter destination or place (e.g. Kottayam, Pala)'
                }
                className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 pl-4 pr-12 py-3.5 sm:py-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 text-sm sm:text-base font-medium outline-none transition-all duration-200"
              />

              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <Search className="absolute right-4 w-5 h-5 text-slate-400 pointer-events-none" />
              )}
            </div>

            {/* Autocomplete Suggestions Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && searchQuery.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 max-h-60 overflow-y-auto z-50 divide-y divide-slate-50"
                >
                  {loadingRoutes ? (
                    <div className="p-4 text-center text-xs text-slate-500 font-medium">
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
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center justify-between transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                            <div>
                              <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                                {route.englishName}
                              </p>
                              {route.malayalamName && (
                                <p className="text-xs text-slate-500 font-normal">
                                  {route.malayalamName}
                                </p>
                              )}
                            </div>
                          </div>

                          {isSelected ? (
                            <Check className="w-4 h-4 text-blue-600" />
                          ) : (
                            <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-500 font-medium">
                      No matching destinations found for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Popular Destination Chips */}
          <DestinationChips
            popularRoutes={popularRoutes}
            selectedRoute={selectedRoute}
            onSelectRoute={(route) => {
              onSelectRoute(route);
              setIsDropdownOpen(false);
            }}
          />

          {/* Search Button */}
          <button
            type="submit"
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold py-3.5 sm:py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-200 flex items-center justify-center gap-2.5 text-base sm:text-lg cursor-pointer"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
            <span>Search Buses</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}
