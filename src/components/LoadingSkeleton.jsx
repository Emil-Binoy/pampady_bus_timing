import React from 'react';

export default function LoadingSkeleton({ count = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-100 flex items-center justify-between gap-4 animate-pulse"
        >
          {/* Left Time skeleton */}
          <div className="space-y-2 min-w-[100px]">
            <div className="h-3 w-12 bg-slate-200 rounded-md" />
            <div className="h-6 w-20 bg-slate-200 rounded-lg" />
          </div>

          {/* Middle Bus Name skeleton */}
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-slate-200 rounded-md" />
            <div className="h-3 w-1/2 bg-slate-100 rounded-md" />
          </div>

          {/* Right Tag skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-7 w-16 bg-slate-200 rounded-xl" />
            <div className="w-8 h-8 rounded-full bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
