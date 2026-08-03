import React from 'react';
import { Bus, Clock, ShieldCheck, Heart, RefreshCw, Sparkles } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Footer({ lastUpdated, onRefresh, onOpenLogo }) {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 mt-16 pt-12 pb-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-3">
            <div
              onClick={onOpenLogo}
              className="flex items-center gap-3 cursor-pointer group w-fit"
              title="Click to view logo"
            >
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 bg-amber-950 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                <img src={logoImg} alt="Cathedral OCYM Pampady" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white leading-tight group-hover:text-amber-300 transition-colors">
                  Pampady Bus Stand
                </h3>
                <p className="text-xs text-amber-400 font-bold">An Initiative by Cathedral OCYM Pampady</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your digital bus timetable for Pampady Bus Stand, Kottayam. Real-time access to KSRTC and Private bus schedules. Built & maintained by Cathedral OCYM Pampady.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Last Updated: <strong className="text-white">{lastUpdated || '17-06-2026'}</strong></span>
            </div>
          </div>

          {/* Quick Links & Info */}
          <div className="md:col-span-6 grid grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-slate-300">
                Information
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>• Timings are subject to change.</li>
                <li>• Arrive 5-10 min early.</li>
                <li>• Live Google Sheets Sync.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-slate-300">
                Popular Hubs
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>Kottayam • Ernakulam</li>
                <li>Changanassery • Pala</li>
                <li>Thiruvalla • Kanjirapally</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            <span>Pampady Bus Stand Timings © {new Date().getFullYear()}</span>
            <span>•</span>
            <span
              onClick={onOpenLogo}
              className="flex items-center gap-1 text-slate-300 font-semibold cursor-pointer hover:text-amber-400 transition-colors"
              title="Click to view logo"
            >
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> by <strong className="text-amber-400 font-bold underline underline-offset-2">Cathedral OCYM Pampady</strong>
            </span>
          </div>

          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Force Refresh Sheet Data</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
