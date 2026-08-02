import React from 'react';

export default function LoadingSkeleton({ count = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 flex items-center gap-4 animate-pulse"
        >
          {/* Serial number circle */}
          <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />

          {/* Time block */}
          <div className="space-y-2 shrink-0">
            <div className="h-7 w-24 bg-slate-200 rounded-lg" />
            <div className="h-3 w-14 bg-slate-100 rounded-md" />
          </div>

          {/* Bus name */}
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
            <div className="h-3 w-1/2 bg-slate-100 rounded-md" />
          </div>

          {/* Badge */}
          <div className="h-8 w-16 bg-slate-200 rounded-xl shrink-0" />
        </div>
      ))}
    </div>
  );
}
