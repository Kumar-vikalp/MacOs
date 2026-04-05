import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Apple, Wifi, Battery } from 'lucide-react';
import AppleMenu from './AppleMenu';
import BatteryIndicator from './BatteryIndicator';
import WifiMenu from './WifiMenu';
import { finder_menu_config } from '../../config/menu.config';
import MenuDropdown from './MenuDropdown';

const MenuBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const [showBatteryMenu, setShowBatteryMenu] = useState(false);
  const [showWifiMenu, setShowWifiMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuRect, setMenuRect] = useState({ left: 0 });

  const handleMenuClick = (menuId, event) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setMenuRect(rect);
      setActiveMenu(menuId);
    }
  };

  const handleMenuHover = (menuId, event) => {
    if (activeMenu !== null && activeMenu !== menuId) {
      const rect = event.currentTarget.getBoundingClientRect();
      setMenuRect(rect);
      setActiveMenu(menuId);
    }
  };

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

        <div className="flex items-center space-x-1 text-xs px-1">
          {Object.entries(finder_menu_config).map(([key, config]) => (
            <div
              key={key}
              className={`px-3 py-1 rounded transition-colors cursor-pointer font-semibold ${
                activeMenu === key ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              onClick={(e) => handleMenuClick(key, e)}
              onMouseEnter={(e) => handleMenuHover(key, e)}
            >
              {config.title}
            </div>
          ))}
          
          <AnimatePresence>
            {activeMenu && finder_menu_config[activeMenu] && (
              <MenuDropdown 
                config={finder_menu_config[activeMenu]} 
                xOffset={menuRect.left} 
                onClose={() => setActiveMenu(null)} 
              />
            )}
          </AnimatePresence>
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