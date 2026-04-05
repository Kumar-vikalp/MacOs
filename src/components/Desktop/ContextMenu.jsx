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
      className="fixed bg-[#f4f5f5]/80 dark:bg-[#1c1c1e]/80 backdrop-blur-[40px] border border-white/20 dark:border-white/10 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] py-1 text-black dark:text-white text-[13px] z-50 min-w-[220px]"
      style={{ left: x, top: y }}
    >
      {menuItems.map((item, index) => (
        item.divider ? (
          <div key={index} className="h-px bg-black/10 dark:bg-white/10 my-1 mx-0" />
        ) : (
          <button
            key={index}
            onClick={item.action}
            className="w-full flex text-left px-3 py-1 hover:bg-[#007AFF] hover:text-white transition-colors rounded-sm mx-1"
            style={{ width: 'calc(100% - 8px)' }}
          >
            {item.label}
          </button>
        )
      ))}
    </div>
  );
};

export default ContextMenu;
