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
      className="absolute top-full left-0 mt-1 w-48 glassmorphism rounded-lg shadow-lg py-1 text-white text-sm animate-fade-in"
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