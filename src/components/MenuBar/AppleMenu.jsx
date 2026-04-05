import React, { useRef, useEffect } from 'react';

const AppleMenu = ({ onClose }) => {
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

  const menuItems = [
    { label: 'About This Mac', action: () => console.log('About This Mac') },
    { divider: true },
    { label: 'System Settings...', action: () => console.log('System Settings') },
    { label: 'App Store...', action: () => console.log('App Store') },
    { divider: true },
    { label: 'Recent Items', action: () => console.log('Recent Items') },
    { divider: true },
    { label: 'Force Quit...', action: () => console.log('Force Quit') },
    { divider: true },
    { label: 'Sleep', action: () => console.log('Sleep') },
    { label: 'Restart...', action: () => console.log('Restart') },
    { label: 'Shut Down...', action: () => console.log('Shut Down') },
  ];

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-0 mt-1 w-56 bg-[#f4f5f5]/80 dark:bg-[#1c1c1e]/80 backdrop-blur-[40px] border border-white/20 dark:border-white/10 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] py-1 text-sm text-black dark:text-white animate-fade-in"
    >
      {menuItems.map((item, index) => (
        item.divider ? (
          <div key={index} className="h-px bg-white/20 my-1" />
        ) : (
          <button
            key={index}
            onClick={() => {
              item.action();
              onClose();
            }}
            className="w-full text-left px-4 py-1 hover:bg-white/20 transition-colors"
          >
            {item.label}
          </button>
        )
      ))}
    </div>
  );
};

export default AppleMenu;