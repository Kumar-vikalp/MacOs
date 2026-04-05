import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MenuDropdown = ({ config, xOffset = 0, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    // Use setTimeout to prevent immediate close if the open trigger was a click
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!config || !config.menu) return null;

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.1 }}
      className="fixed top-6 bg-[#f4f5f5]/80 dark:bg-[#1c1c1e]/80 backdrop-blur-[40px] border border-white/20 dark:border-white/10 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] py-1 min-w-[220px] z-50 text-black dark:text-white"
      style={{ left: `${xOffset}px` }}
    >
      {Object.entries(config.menu).map(([key, item]) => (
        <React.Fragment key={key}>
          <div
            className={`px-3 py-1 text-[13px] flex justify-between items-center ${
              item.disabled 
                ? 'opacity-50 cursor-default' 
                : 'hover:bg-[var(--system-color-primary)] hover:text-white cursor-pointer rounded-sm mx-1'
            }`}
          >
            <span>{item.title}</span>
            {item.menu && <span className="text-[10px]">▶</span>}
          </div>
          {item.breakAfter && (
            <div className="h-[1px] bg-black/10 dark:bg-white/10 my-1 mx-0" />
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default MenuDropdown;
