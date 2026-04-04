import React, { useRef, useEffect } from 'react';
import useDesktopStore from '../../store/desktopStore';
import useFileSystemStore from '../../store/fileSystemStore';
import useWindowStore from '../../store/windowStore'; // Import useWindowStore

const ContextMenu = ({ x, y, onClose }) => {
  const menuRef = useRef(null);
  const { toggleWallpaperModal } = useDesktopStore();
  const { createFolder } = useFileSystemStore();
  const { closeAllWindows, openWindow } = useWindowStore(); // Get actions from window store

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleNewFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      createFolder(folderName);
    }
    onClose();
  };

  const handleChangeWallpaper = () => {
    toggleWallpaperModal();
    onClose();
  };

  const handleCloseAllWindows = () => {
    closeAllWindows();
    onClose();
  };

  const handleOpenDeveloper = () => {
    openWindow('developer', 'Developer', 'Developer');
    onClose();
  };

  const menuItems = [
    { label: 'New Folder', action: handleNewFolder },
    { divider: true },
    { label: 'Change Wallpaper', action: handleChangeWallpaper },
    { label: 'Get Info', action: () => console.log('Get Info') },
    { divider: true },
    { label: 'Arrange By', submenu: ['Name', 'Date Modified', 'Size', 'Kind'] },
    { divider: true }, // New divider
    { label: 'Close All Windows', action: handleCloseAllWindows }, // New button
    { label: 'Developer', action: handleOpenDeveloper }, // New button
  ];

  return (
    <div
      ref={menuRef}
      className="fixed glassmorphism rounded-lg shadow-lg py-1 text-white text-sm z-50 min-w-48"
      style={{ left: x, top: y }}
    >
      {menuItems.map((item, index) => (
        item.divider ? (
          <div key={index} className="h-px bg-white/20 my-1" />
        ) : (
          <button
            key={index}
            onClick={item.action}
            className="w-full text-left px-4 py-2 hover:bg-white/20 transition-colors"
          >
            {item.label}
          </button>
        )
      ))}
    </div>
  );
};

export default ContextMenu;
