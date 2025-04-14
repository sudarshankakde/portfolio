import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const StatsCounter = ({ stats }) => {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 seconds for the count animation
    const steps = 60; // Number of steps in the animation
    const interval = duration / steps;

    const counters = stats.map((stat, index) => {
      return setInterval(() => {
        setCounts(prevCounts => {
          const newCounts = [...prevCounts];
          if (newCounts[index] < stat.value) {
            newCounts[index] = Math.min(
              newCounts[index] + Math.ceil(stat.value / steps),
              stat.value
            );
          }
          return newCounts;
        });
      }, interval);
    });

    return () => counters.forEach(counter => clearInterval(counter));
  }, [stats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4 md:px-8 mb-16 backdrop-blur-md opacity-85">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative overflow-hidden rounded-lg p-6 border border-gray-800 bg-black/50 backdrop-blur-sm
                     transition-all duration-500 hover:border-[#aed2ff] hover:shadow-[0_0_25px_rgba(174,210,255,0.25)]"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#aed2ff] mb-2 opacity-90">
              {counts[index]}
            </div>
            <div className="text-lg md:text-xl text-gray-300 opacity-80">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCounter;