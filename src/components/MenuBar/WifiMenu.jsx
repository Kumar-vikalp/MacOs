import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Settings } from 'lucide-react';
import useDesktopStore from '../../store/desktopStore';

const WifiMenu = ({ onClose }) => {
  const menuRef = useRef(null);
  const { dockAutoHide, toggleDockAutoHide } = useDesktopStore();

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
      className="absolute top-full right-0 mt-1 w-64 glassmorphism rounded-lg shadow-lg py-3 px-4 text-white text-sm"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      {/* WiFi Status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Wifi size={20} className="text-blue-500" />
          <span className="font-medium">Wi-Fi</span>
        </div>
        <span className="text-green-400 font-semibold">Connected</span>
      </div>

      {/* Connected Network */}
      <div className="mb-4 p-2 bg-white/10 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Home Network</div>
            <div className="text-xs text-white/70">WPA2 Personal</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-xs text-white/70">Signal</div>
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-2 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Dock Auto-Hide Toggle */}
      <div className="mb-3 p-2 bg-white/5 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm">Dock Auto-Hide</div>
            <div className="text-xs text-white/70">Hide dock when not in use</div>
          </div>
          <button
            onClick={toggleDockAutoHide}
            className={`relative w-10 h-6 rounded-full transition-colors ${
              dockAutoHide ? 'bg-blue-500' : 'bg-white/20'
            }`}
          >
            <motion.div
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
              animate={{ x: dockAutoHide ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-white/20 my-3" />

      {/* Available Networks */}
      <div className="space-y-2 text-xs text-white/70 mb-3">
        <div className="font-medium text-white">Other Networks</div>
        <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded cursor-pointer">
          <div className="flex items-center space-x-2">
            <Wifi size={14} />
            <span>Guest Network</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
            <div className="w-1 h-2 bg-white/30 rounded-full"></div>
            <div className="w-1 h-2 bg-white/30 rounded-full"></div>
            <div className="w-1 h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded cursor-pointer">
          <div className="flex items-center space-x-2">
            <WifiOff size={14} />
            <span>Neighbor WiFi</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="w-1 h-1 bg-white/30 rounded-full"></div>
            <div className="w-1 h-1 bg-white/30 rounded-full"></div>
            <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-white/20 my-3" />

      {/* Network Settings */}
      <button className="w-full flex items-center space-x-2 text-left text-xs text-white/70 hover:text-white transition-colors p-2 hover:bg-white/5 rounded">
        <Settings size={14} />
        <span>Network Settings...</span>
      </button>
    </motion.div>
  );
};

export default WifiMenu;