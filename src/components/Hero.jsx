import React from 'react';
import { motion } from 'framer-motion';
import busStandImg from '../assets/bus_stand.png';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[240px] sm:min-h-[300px] md:min-h-[340px]">

      {/* ── Background: bus_stand.png covers the full hero ── */}
      <div className="absolute inset-0">
        <img
          src={busStandImg}
          alt="Pampady Bus Stand"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Dark gradient overlay — left side is more opaque for text readability,
            right side reveals the real photo. On desktop more photo is visible. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.75) 20%, rgba(255,255,255,0.35) 65%, rgba(255,255,255,0) 100%)',
          }}
        />
       
      </div>

      {/* ── Text content sits on top of the photo ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md space-y-3"
        >
          

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight tracking-tight drop-shadow-md">
            Bus Timings
            <br />
            <span className="text-blue-700">via Pampady Bus Stand</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-black leading-relaxed max-w-xs sm:max-w-sm drop-shadow">
            Find accurate timings for all buses passing through Pampady Bus Stand.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
