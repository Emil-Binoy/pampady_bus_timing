import React from 'react';
import { Sparkles } from 'lucide-react';

export default function DestinationChips({
  popularRoutes,
  selectedRoute,
  onSelectRoute,
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Popular Searches</span>
      </div>

      <div className="flex flex-wrap gap-2 pt-0.5">
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : 'bg-blue-50/70 text-blue-700 border-blue-100 hover:bg-blue-100 hover:border-blue-200'
              }`}
            >
              <span>{route.englishName}</span>
              {route.malayalamName && (
                <span className={`text-[10px] opacity-80 ${isSelected ? 'text-blue-100' : 'text-blue-600'}`}>
                  • {route.malayalamName}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
