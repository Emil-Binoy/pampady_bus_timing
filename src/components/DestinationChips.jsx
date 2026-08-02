import React from 'react';
import { Sparkles } from 'lucide-react';

export default function DestinationChips({
  popularRoutes,
  selectedRoute,
  onSelectRoute,
}) {
  return (
    <div className="space-y-2.5">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        Popular Destinations
      </p>

      {/* Wrap chips — large tap area for thumbs */}
      <div className="flex flex-wrap gap-2">
        {popularRoutes.map((route) => {
          const isSelected =
            selectedRoute &&
            (selectedRoute.id === route.id ||
              selectedRoute.englishName.toLowerCase() === route.englishName.toLowerCase());

          return (
            <button
              key={route.id || route.englishName}
              type="button"
              onClick={() => onSelectRoute(route)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold min-h-[44px] transition-all duration-200 active:scale-95 border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
              }`}
            >
              {route.englishName}
              {route.malayalamName && (
                <span className={`ml-1 text-xs font-normal ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                  · {route.malayalamName}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
