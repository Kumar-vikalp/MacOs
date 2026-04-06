import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Battery, Zap, ShieldCheck, Clock, Settings, Activity, ChevronRight } from 'lucide-react';

const BatteryIndicator = ({ onClose }) => {
  const menuRef = useRef(null);
  const [batteryData, setBatteryData] = useState({
    level: 100,
    charging: false,
    chargingTime: 0,
  });

  useEffect(() => {
    // Fetch Real Battery Data
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        const updateBattery = () => {
          setBatteryData({
            level: Math.round(battery.level * 100),
            charging: battery.charging,
            chargingTime: battery.chargingTime,
          });
        };

        updateBattery();

        // Listen for changes
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
        return () => {
          battery.removeEventListener('levelchange', updateBattery);
          battery.removeEventListener('chargingchange', updateBattery);
        };
      });
    }

    // Close on click outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      ref={menuRef}
      className="absolute top-[32px] right-2 w-[300px] bg-[#ececed]/85 dark:bg-[#1e1e1e]/80 backdrop-blur-3xl border border-[#c8c8c8] dark:border-[#3c3c3c] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-2.5 text-[13px] font-normal text-black dark:text-white ring-1 ring-black/5"
      initial={{ opacity: 0, scale: 0.98, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
    >
      {/* Primary Status Card */}
      <motion.div 
        variants={itemVariants}
        className="bg-black/[0.03] dark:bg-white/[0.06] rounded-xl p-3 mb-2 flex items-center justify-between border border-black/[0.05] dark:border-white/[0.05]"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <Battery size={26} className="text-black dark:text-white opacity-90" strokeWidth={1.5} />
            {batteryData.charging && (
              <Zap size={11} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black dark:text-white fill-current" />
            )}
          </div>
          <div>
            <div className="font-semibold text-[14px] tracking-tight">
              {batteryData.level}% {batteryData.charging ? 'Charging' : 'Remaining'}
            </div>
            <div className="text-[11px] opacity-50 font-medium lowercase first-letter:uppercase">
              Source: {batteryData.charging ? 'Power Adapter' : 'Battery Power'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="bg-black/[0.03] dark:bg-white/[0.04] p-2.5 rounded-xl border border-black/[0.03] dark:border-white/[0.03]">
          <div className="flex items-center gap-1.5 mb-1 opacity-40 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck size={12} />
            <span>Condition</span>
          </div>
          <div className="font-medium text-black/80 dark:text-white/90">Normal</div>
        </div>

        <div className="bg-black/[0.03] dark:bg-white/[0.04] p-2.5 rounded-xl border border-black/[0.03] dark:border-white/[0.03]">
          <div className="flex items-center gap-1.5 mb-1 opacity-40 text-[10px] font-bold uppercase tracking-widest">
            <Activity size={12} />
            <span>Health</span>
          </div>
          <div className="font-medium text-black/80 dark:text-white/90">100%</div>
        </div>

        {/* Dynamic Status Box */}
        <div className="col-span-2 bg-black/[0.03] dark:bg-white/[0.04] p-2.5 rounded-xl border border-black/[0.03] dark:border-white/[0.03] flex items-center justify-between">
          <div className="flex items-center gap-2 opacity-40 text-[10px] font-bold uppercase tracking-widest">
            <Clock size={12} />
            <span>Status</span>
          </div>
          <span className="text-[10px] font-semibold text-[#007aff] dark:text-[#0a84ff]">
            {batteryData.charging ? 'Fully charged soon' : 'Power Mode: Normal'}
          </span>
        </div>
      </div>

      <div className="h-[1px] bg-black/5 dark:bg-white/10 my-1.5 mx-1" />

      <button className="group w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#007aff] hover:text-white transition-all duration-75 text-left">
        <div className="flex items-center gap-2.5">
          <Settings size={15} className="opacity-50 group-hover:opacity-100" />
          <span className="font-medium">Battery Settings...</span>
        </div>
        <ChevronRight size={14} className="opacity-30 group-hover:opacity-100" />
      </button>
    </motion.div>
  );
};

export default BatteryIndicator;