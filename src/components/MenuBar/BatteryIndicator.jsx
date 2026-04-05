import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Battery, Zap } from 'lucide-react';

const BatteryIndicator = ({ onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      ref={menuRef}
      className="absolute top-[35px] right-2 w-[320px] bg-[#f4f5f5]/80 dark:bg-[#1c1c1e]/80 backdrop-blur-[40px] border border-white/20 dark:border-white/10 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] p-4 text-black dark:text-white text-sm"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      {/* Battery Status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Battery size={20} className="text-green-600" />
          <span className="font-medium">Battery</span>
        </div>
        <span className="text-green-400 font-semibold">100%</span>
      </div>

      {/* Battery Bar */}
      <div className="w-full h-2 bg-white/20 rounded-full mb-3 overflow-hidden">
        <motion.div
          className="h-full bg-green-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Status Info */}
      <div className="space-y-2 text-xs text-white/70">
        <div className="flex items-center justify-between">
          <span>Condition:</span>
          <span className="text-green-400 font-medium">Normal</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Power Source:</span>
          <div className="flex items-center space-x-1">
            <Zap size={12} className="text-yellow-400" />
            <span>Power Adapter</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span>Time until full:</span>
          <span>Fully Charged</span>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-white/20 my-3" />

      {/* Battery Settings */}
      <button className="w-full text-left text-xs text-white/70 hover:text-white transition-colors">
        Battery Settings...
      </button>
    </motion.div>
  );
};

export default BatteryIndicator;