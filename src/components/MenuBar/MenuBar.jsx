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

        bat.addEventListener('levelchange', () => updateBatteryInfo(bat));
        bat.addEventListener('chargingchange', () => updateBatteryInfo(bat));
      });
    }

    return () => {
      if (batteryObj) {
        batteryObj.removeEventListener('levelchange', () => updateBatteryInfo(batteryObj));
        batteryObj.removeEventListener('chargingchange', () => updateBatteryInfo(batteryObj));
      }
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMusicIconClick = () => {
    openWindow('applemusic', 'Apple Music', 'AppleMusic');
  };

  return (
    /* h-[24px] -> h-6 | z-[100] -> z-100 */
    <div className="fixed top-0 left-0 right-0 h-6 bg-black/15 dark:bg-[#1a1a1a]/30 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-2.5 text-white z-100 select-none">
      <div className="flex items-center">
        <div className="relative flex items-center">
          <button
            onClick={() => setShowAppleMenu(!showAppleMenu)}
            /* h-[20px] -> h-5 | rounded-[4px] -> rounded-sm */
            className="flex items-center justify-center w-8 h-5 rounded-sm hover:bg-white/20 transition-colors"
          >
            <img
              src="/apple-logo.svg"
              alt="Apple"
              /* w-[14px] -> w-3.5 | h-[14px] -> h-3.5 */
              className="w-3.5 h-3.5 invert brightness-[100] contrast-[100]"
            />
          </button>
          <AnimatePresence>
            {showAppleMenu && <AppleMenu onClose={() => setShowAppleMenu(false)} />}
          </AnimatePresence>
        </div>

        <div className="flex items-center ml-1 text-[13px] font-semibold tracking-tight">
          {Object.entries(finder_menu_config).map(([key, config]) => (
            <div
              key={key}
              /* h-[20px] -> h-5 | rounded-[4px] -> rounded-sm */
              className={`px-3 h-5 flex items-center rounded-sm transition-colors cursor-default ${
                activeMenu === key ? 'bg-white/20' : 'hover:bg-white/20'
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

      <div className="flex items-center gap-1">
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
                /* h-[20px] -> h-5 | rounded-[4px] -> rounded-sm */
                className="flex items-center justify-center w-7 h-5 rounded-sm hover:bg-white/15 transition-colors cursor-pointer"
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
            /* h-[20px] -> h-5 | rounded-[4px] -> rounded-sm */
            className="flex items-center justify-center w-7 h-5 rounded-sm hover:bg-white/15 transition-colors cursor-pointer"
          >
            <Wifi size={15} strokeWidth={2.5} />
          </button>
          <AnimatePresence>
            {showWifiMenu && <WifiMenu onClose={() => setShowWifiMenu(false)} />}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowBatteryMenu(!showBatteryMenu)}
            /* h-[20px] -> h-5 | rounded-[4px] -> rounded-sm */
            className={`flex items-center gap-1.5 px-2 h-5 rounded-sm transition-colors ${
              showBatteryMenu ? 'bg-white/20' : 'hover:bg-white/15'
            } cursor-pointer`}
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
                realBattery={battery}
              />
            )}
          </AnimatePresence>
        </div>

        {/* h-[20px] -> h-5 | rounded-[4px] -> rounded-sm */}
        <div className="px-2 h-5 flex items-center rounded-sm hover:bg-white/15 transition-colors text-[12.5px] font-medium tracking-tight">
          {format(currentTime, 'EEE MMM d h:mm a')}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;