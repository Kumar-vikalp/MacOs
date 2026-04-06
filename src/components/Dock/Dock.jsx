import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MacOSDock from '../ui/mac-os-dock';
import useWindowStore from '../../store/windowStore';
import useDesktopStore from '../../store/desktopStore';

const Dock = () => {
  const { openWindow, getOpenApps } = useWindowStore();
  const { dockAutoHide } = useDesktopStore();
  const [isHidden, setIsHidden] = useState(false);
  const openApps = getOpenApps();

  const dockApps = [
    { id: 'finder', name: 'Finder', icon: '/icons/finder.png', component: 'Finder' },
    { id: 'launchpad', name: 'Launchpad', icon: '/icons/launchpad.png', component: 'Launchpad' },
    { id: 'safari', name: 'Safari', icon: '/icons/safari.png', component: 'Safari' },
    { id: 'applemusic', name: 'Apple Music', icon: '/icons/music.png', component: 'AppleMusic' },
    { id: 'notes', name: 'Notes', icon: '/icons/notes.png', component: 'Notes' },
    { id: 'calculator', name: 'Calculator', icon: '/icons/calculator.png', component: 'Calculator' },
    { id: 'calendar', name: 'Calendar', icon: '/icons/calendar.png', component: 'Calendar' },
    { id: 'photos', name: 'Photos', icon: '/icons/photos.png', component: 'Photos' },
    { id: 'settings', name: 'System Settings', icon: '/icons/settings.png', component: 'Settings' },
    { id: 'appletv', name: 'Apple TV', icon: '/icons/appletv.png', component: 'AppleTv' },
    { id: 'terminal', name: 'Terminal', icon: '/icons/terminal.png', component: 'Terminal' },
    { id: 'developer', name: 'Developer', icon: '/icons/github.png', component: 'Developer' },
    { id: 'weather', name: 'Weather', icon: '/icons/weather.png', component: 'Weather' }, // New Weather app
    { id: 'trash', name: 'Trash', icon: '/icons/trash.png', component: 'Trash' },
  ];

  const handleAppClick = (app) => {
    const appData = dockApps.find(a => a.id === app);
    if (appData) {
      openWindow(appData.id, appData.name, appData.component);
    }
  };

  // Auto-hide dock when in fullscreen
  useEffect(() => {
    if (!dockAutoHide) {
      setIsHidden(false);
      return;
    }

    const handleMouseMove = (e) => {
      const threshold = 50;
      const shouldHide = e.clientY < window.innerHeight - threshold;
      setIsHidden(shouldHide);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [dockAutoHide]);

  return (
    <motion.div
      className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: (dockAutoHide && isHidden) ? 80 : 0, 
        opacity: (dockAutoHide && isHidden) ? 0.3 : 1 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <MacOSDock
        apps={dockApps}
        onAppClick={handleAppClick}
        openApps={openApps}
        className=""
      />
    </motion.div>
  );
};

export default Dock;
