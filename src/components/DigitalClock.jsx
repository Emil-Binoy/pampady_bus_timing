import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeData() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return {
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    ampm,
    day: dayNames[now.getDay()],
    date: now.getDate(),
    month: monthNames[now.getMonth()],
    year: now.getFullYear(),
  };
}

export default function DigitalClock() {
  const [time, setTime] = useState(getTimeData());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeData()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="digital-clock-card"
    >
      {/* Date row */}
      <p className="digital-clock-date">
        {time.day}, {time.date} {time.month} {time.year}
      </p>

      {/* Main time display */}
      <div className="digital-clock-time">
        <span className="digital-clock-segment">{time.hours}</span>
        <span className="digital-clock-colon">:</span>
        <span className="digital-clock-segment">{time.minutes}</span>
        <span className="digital-clock-colon">:</span>
        <motion.span
          key={time.seconds}
          initial={{ opacity: 0.4, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="digital-clock-seconds"
        >
          {time.seconds}
        </motion.span>
        <span className="digital-clock-ampm">{time.ampm}</span>
      </div>
    </motion.div>
  );
}
