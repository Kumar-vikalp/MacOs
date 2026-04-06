import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Settings, Lock } from 'lucide-react';
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

  // Reusable component for macOS style menu items
  const MenuItem = ({ children, onClick, active = false }) => (
    <div 
      onClick={onClick}
      className="group flex items-center justify-between px-2 py-[5px] rounded-[5px] cursor-default select-none hover:bg-[#007aff] hover:text-white transition-colors duration-75"
    >
      {children}
    </div>
  );

  const Separator = () => <div className="h-[1px] bg-black/5 dark:bg-white/10 my-1 mx-1" />;

  const SectionHeader = ({ children }) => (
    <div className="text-[11px] font-bold text-black/40 dark:text-white/40 px-2 py-1 uppercase tracking-wider">
      {children}
    </div>
  );

  return (
    <motion.div
      ref={menuRef}
      className="absolute top-[32px] right-2 w-[300px] bg-[#ececed]/80 dark:bg-[#1e1e1e]/75 backdrop-blur-3xl border border-[#c8c8c8] dark:border-[#3c3c3c] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-1.5 text-[13px] font-normal text-black dark:text-white ring-1 ring-black/5"
      initial={{ opacity: 0, scale: 0.98, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {/* WiFi Master Toggle */}
      <div className="flex items-center justify-between px-2 py-1.5">
        <span className="font-semibold text-[14px]">Wi-Fi</span>
        <button
          className="relative w-[34px] h-[18px] bg-[#34c759] rounded-full p-[2px] transition-colors"
        >
          <div className="ml-auto w-[14px] h-[14px] bg-white rounded-full shadow-sm" />
        </button>
      </div>

      <Separator />

      {/* Connected Network Detail */}
      <SectionHeader>Known Networks</SectionHeader>
      <MenuItem>
        <div className="flex items-center gap-2.5">
          <Wifi size={16} className="text-[#007aff] group-hover:text-white" />
          <div className="flex flex-col">
            <span className="font-medium">Home Network</span>
            <span className="text-[10px] opacity-60 group-hover:text-white/80">WPA2 Personal</span>
          </div>
        </div>
        <div className="flex items-end gap-[1px] h-3">
          <div className="w-[3px] h-[10px] bg-current rounded-full" />
          <div className="w-[3px] h-[10px] bg-current rounded-full" />
          <div className="w-[3px] h-[10px] bg-current rounded-full" />
          <div className="w-[3px] h-[6px] bg-current opacity-30 rounded-full group-hover:opacity-100" />
        </div>
      </MenuItem>

      <Separator />

      {/* Dock Toggle (Integrated with Store) */}
      <MenuItem onClick={toggleDockAutoHide}>
        <div className="flex flex-col">
          <span className="font-medium">Dock Auto-Hide</span>
          <span className="text-[10px] opacity-60 group-hover:text-white/80">
            {dockAutoHide ? 'Currently hidden' : 'Always visible'}
          </span>
        </div>
        <div className={`w-8 h-4 rounded-full relative transition-colors ${dockAutoHide ? 'bg-[#34c759]' : 'bg-gray-400/40'}`}>
          <motion.div 
            className="absolute top-[2px] w-3 h-3 bg-white rounded-full left-[2px]"
            animate={{ x: dockAutoHide ? 14 : 0 }}
          />
        </div>
      </MenuItem>

      <Separator />

      {/* Other Networks Section */}
      <SectionHeader>Other Networks</SectionHeader>
      <MenuItem>
        <div className="flex items-center gap-2.5">
          <Wifi size={16} className="opacity-60 group-hover:opacity-100" />
          <span>Guest Network</span>
        </div>
        <Lock size={12} className="opacity-40 group-hover:opacity-100" />
      </MenuItem>

      <MenuItem>
        <div className="flex items-center gap-2.5">
          <WifiOff size={16} className="opacity-60 group-hover:opacity-100" />
          <span>Neighbor WiFi</span>
        </div>
      </MenuItem>

      <Separator />

      {/* Settings Link */}
      <MenuItem>
        <div className="flex items-center gap-2.5">
          <Settings size={16} className="opacity-60 group-hover:opacity-100" />
          <span>Wi-Fi Settings...</span>
        </div>
      </MenuItem>
    </motion.div>
  );
};

export default WifiMenu;