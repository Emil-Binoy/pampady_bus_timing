import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 my-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800 relative overflow-hidden"
      >
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" /> Get in Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Contact Us
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Have questions, feedback, or schedule updates? Feel free to reach out to Cathedral OCYM Pampady.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Email Card */}
            <div className="bg-slate-800/80 hover:bg-slate-800 backdrop-blur-md rounded-2xl p-5 border border-slate-700/80 transition-all duration-200 shadow-md flex flex-col justify-between space-y-4 group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Us</p>
                    <a
                      href="mailto:cathedralocympdy@gmail.com"
                      className="text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors break-all underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-400"
                    >
                      cathedralocympdy@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
                <a
                  href="mailto:cathedralocympdy@gmail.com"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-4 h-4" /> Send Email
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('cathedralocympdy@gmail.com', 'email')}
                  className="p-2.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copy email address"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-slate-800/80 hover:bg-slate-800 backdrop-blur-md rounded-2xl p-5 border border-slate-700/80 transition-all duration-200 shadow-md flex flex-col justify-between space-y-4 group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call Us</p>
                    <a
                      href="tel:+918714020231"
                      className="text-base sm:text-lg font-bold text-white hover:text-emerald-400 transition-colors underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-400"
                    >
                      +91 87140 20231
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
                <a
                  href="tel:+918714020231"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('+91 87140 20231', 'phone')}
                  className="p-2.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copy phone number"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
