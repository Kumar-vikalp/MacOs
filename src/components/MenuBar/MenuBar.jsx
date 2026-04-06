import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Wifi, Battery, Zap, CirclePlay } from 'lucide-react';
import AppleMenu from './AppleMenu';
import BatteryIndicator from './BatteryIndicator';
import WifiMenu from './WifiMenu';
import { finder_menu_config } from '../../config/menu.config';
import MenuDropdown from './MenuDropdown';
import useMusicStore from '../../store/musicStore';
import useWindowStore from '../../store/windowStore';

const MenuBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const [showBatteryMenu, setShowBatteryMenu] = useState(false);
  const [showWifiMenu, setShowWifiMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuRect, setMenuRect] = useState({ left: 0 });
  
  const { isPlaying } = useMusicStore();
  const { openWindow } = useWindowStore();

  // --- Real-Time Battery Logic ---
  const [battery, setBattery] = useState({
    level: 100,
    charging: false
  });

  useEffect(() => {
    let batteryObj = null;

    const updateBatteryInfo = (bat) => {
      setBattery({
        level: Math.round(bat.level * 100),
        charging: bat.charging,
      });
    };

    if ('getBattery' in navigator) {
      navigator.getBattery().then((bat) => {
        batteryObj = bat;
        updateBatteryInfo(bat);

        // Listen for real-time changes
        bat.addEventListener('levelchange', () => updateBatteryInfo(bat));
        bat.addEventListener('chargingchange', () => updateBatteryInfo(bat));
      });
    }

    // Cleanup listeners
    return () => {
      if (batteryObj) {
        batteryObj.removeEventListener('levelchange', () => updateBatteryInfo(batteryObj));
        batteryObj.removeEventListener('chargingchange', () => updateBatteryInfo(batteryObj));
      }
    };
  }, []);
  // -------------------------------

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMusicIconClick = () => {
    openWindow('applemusic', 'Apple Music', 'AppleMusic');
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-[24px] bg-black/15 dark:bg-[#1a1a1a]/30 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-2.5 text-white z-[100] select-none">
      <div className="flex items-center">
        <div className="relative flex items-center">
          <button
            onClick={() => setShowAppleMenu(!showAppleMenu)}
            className="flex items-center justify-center w-8 h-[20px] rounded-[4px] hover:bg-white/20 transition-colors"
          >
            <img
              src="/apple-logo.svg"
              alt="Apple"
              className="w-[14px] h-[14px] invert brightness-[100] contrast-[100]"
            />
          </button>
          <AnimatePresence>
            {showAppleMenu && <AppleMenu onClose={() => setShowAppleMenu(false)} />}
          </AnimatePresence>
        </div>

        {/* Dynamic App Menus */}
        <div className="flex items-center ml-1 text-[13px] font-semibold tracking-tight">
          {Object.entries(finder_menu_config).map(([key, config]) => (
            <div
              key={key}
              className={`px-3 h-[20px] flex items-center rounded-[4px] transition-colors cursor-default ${activeMenu === key ? 'bg-white/20' : 'hover:bg-white/20'
                }`}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMenuRect(rect);
                setActiveMenu(activeMenu === key ? null : key);
              }}
            >
              {config.title}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side Status Icons */}
      <div className="flex items-center gap-1">
        {/* Music Icon - Only show when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative"
            >
              <button
                onClick={handleMusicIconClick}
                className="flex items-center justify-center w-7 h-[20px] rounded-[4px] hover:bg-white/15 transition-colors cursor-pointer"
                style={{ cursor: 'pointer' }}
              >
                <CirclePlay size={15} strokeWidth={2} className="text-red-400" />
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative">
          <button
            onClick={() => setShowWifiMenu(!showWifiMenu)}
            className="flex items-center justify-center w-7 h-[20px] rounded-[4px] hover:bg-white/15 transition-colors cursor-pointer"
            style={{ cursor: 'pointer' }}
          >
            <Wifi size={15} strokeWidth={2.5} />
          </button>
          <AnimatePresence>
            {showWifiMenu && <WifiMenu onClose={() => setShowWifiMenu(false)} />}
          </AnimatePresence>
        </div>

        {/* Real-Time Battery Display */}
        <div className="relative">
          <button
            onClick={() => setShowBatteryMenu(!showBatteryMenu)}
            className={`flex items-center gap-1.5 px-2 h-[20px] rounded-[4px] transition-colors ${showBatteryMenu ? 'bg-white/20' : 'hover:bg-white/15'
              } cursor-pointer`}
            style={{ cursor: 'pointer' }}
          >
            <span className="text-[12px] font-medium tracking-tighter">{battery.level}%</span>
            <div className="relative flex items-center">
              <Battery size={18} strokeWidth={1.5} className="opacity-90" />
              {battery.charging && (
                <Zap size={8} className="absolute left-[4.5px] fill-current text-white" />
              )}
            </div>
          </button>
          <AnimatePresence>
            {showBatteryMenu && (
              <BatteryIndicator
                onClose={() => setShowBatteryMenu(false)}
                // Pass the data down if you want to avoid calling the API twice
                realBattery={battery}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="px-2 h-[20px] flex items-center rounded-[4px] hover:bg-white/15 transition-colors text-[12.5px] font-medium tracking-tight">
          {format(currentTime, 'EEE MMM d h:mm a')}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;