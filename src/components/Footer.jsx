import React from 'react';
import { Mail, Phone, Clock, Heart, Code2 } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';
import logoImg from '../assets/logo.png';

const INSTAGRAM_URL = 'https://www.instagram.com/cathedral_ocym_pmdy?igsh=bWl0c2pyNHFsOXg3';
const FACEBOOK_URL = 'https://www.facebook.com/share/14eoLzUtZy3/';

export default function Footer({ lastUpdated, onOpenLogo, onOpenAbout }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column (Col 1-5) */}
          <div className="md:col-span-5 space-y-4">
            <div
              onClick={onOpenLogo}
              className="flex items-center gap-3 cursor-pointer group w-fit"
              title="Click to view logo"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 bg-slate-900 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                <img src={logoImg} alt="Cathedral OCYM Pampady" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white leading-tight group-hover:text-amber-400 transition-colors">
                  Pampady Bus Stand
                </h3>
                <p className="text-xs text-blue-400 font-extrabold tracking-wide">Bus Timings</p>
                <p className="text-[11px] text-amber-400 font-semibold">An Initiative by Cathedral OCYM Pampady</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-medium">
              Your digital timetable for Pampady Bus Stand, Kottayam. Real-time access to KSRTC and Private bus schedules. Built & maintained with care for all commuters.
            </p>

            {/* Social Media Icons */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Follow Us:</span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
                title="Instagram - @cathedral_ocym_pmdy"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
                title="Facebook - Cathedral OCYM Pampady"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column (Col 6-8) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-widest text-slate-300">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>• Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('search-card-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>• Search Destinations</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>• About Initiative</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>• Contact Us</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information Column (Col 9-12) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-widest text-slate-300">
              Contact Information
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href="mailto:cathedralocympdy@gmail.com"
                  className="hover:text-blue-400 transition-colors underline underline-offset-2 decoration-slate-700 hover:decoration-blue-400 break-all"
                >
                  cathedralocympdy@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="tel:+918714020231"
                  className="hover:text-emerald-400 transition-colors underline underline-offset-2 decoration-slate-700 hover:decoration-emerald-400"
                >
                  +91 87140 20231
                </a>
              </li>
              <li className="pt-1 flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Last Updated: <strong className="text-white font-bold">{lastUpdated || '17-06-2026'}</strong></span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Developer Credit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Pampady Bus Stand Timings.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-400">Initiative by <strong className="text-amber-400 font-bold">Cathedral OCYM Pampady</strong></span>
          </div>

          {/* Designed & Developed Credit */}
          <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800/80 shadow-xs">
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>
              Designed & Developed by{' '}
              <a
                href="https://emil-binoy.github.io/Portfolio-using-React/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-200 font-bold hover:text-blue-400 underline underline-offset-2 decoration-blue-500/40 transition-colors"
              >
                Emil Binoy
              </a>
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
