import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Apple, Wifi, Battery } from 'lucide-react';
import AppleMenu from './AppleMenu';
import BatteryIndicator from './BatteryIndicator';
import WifiMenu from './WifiMenu';

const MenuBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const [showBatteryMenu, setShowBatteryMenu] = useState(false);
  const [showWifiMenu, setShowWifiMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-6 bg-black/20 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-white text-sm font-medium z-50">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <motion.button
            onClick={() => setShowAppleMenu(!showAppleMenu)}
            className="flex items-center hover:bg-white/10 px-2 py-1 rounded transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Option A: Using it as an <img> tag */}
            <img
              src="/apple-logo.svg"
              alt="Apple Logo"
              className="text-gray-500 w-4 h-4 c" // Use Tailwind to set the size
              fill="currentColor"
            />
          </motion.button>
          <AnimatePresence>
            {showAppleMenu && (
              <AppleMenu onClose={() => setShowAppleMenu(false)} />
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <span className="hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer">Finder</span>
          <span className="hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer">File</span>
          <span className="hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer">Edit</span>
          <span className="hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer">View</span>
          <span className="hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer">Go</span>
          <span className="hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer">Window</span>
          <span className="hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer">Help</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <motion.button
              onClick={() => setShowWifiMenu(!showWifiMenu)}
              className="flex items-center hover:bg-white/10 px-1 py-1 rounded transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Wifi size={14} />
            </motion.button>
            <AnimatePresence>
              {showWifiMenu && (
                <WifiMenu onClose={() => setShowWifiMenu(false)} />
              )}
            </AnimatePresence>
          </div>
          <div className="relative">
            <motion.button
              onClick={() => setShowBatteryMenu(!showBatteryMenu)}
              className="flex items-center space-x-1 hover:bg-white/10 px-1 py-1 rounded transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Battery size={14} />
              <span className="text-xs">100%</span>
            </motion.button>
            <AnimatePresence>
              {showBatteryMenu && (
                <BatteryIndicator onClose={() => setShowBatteryMenu(false)} />
              )}
            </AnimatePresence>
          </div>
        </div>
        <motion.div
          className="text-xs hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          {format(currentTime, 'EEE MMM d  h:mm a')}
        </motion.div>
      </div>
    </div>
  );
};

export default MenuBar;