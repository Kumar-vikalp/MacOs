import React, { useEffect, useState, useRef } from "react";
import Dock from "../components/Dock/Dock"; // Corrected import path
import Window from "../components/Window/Window"; // Corrected import path
import useWindowStore from "../store/windowStore"; // Corrected import path
import MenuBar from "../components/MenuBar/MenuBar"; // Corrected import path
import ContextMenu from "../components/Desktop/ContextMenu"; // Corrected import path
import { AnimatePresence, motion } from "framer-motion";
import { FiFolder, FiFile } from "react-icons/fi";
import useDesktopStore from "../store/desktopStore"; // Import existing store
import useFileSystemStore from "../store/fileSystemStore"; // Import existing store

export default function Desktop({ setStage, isLocked = false }) {
  const { windows, openWindow } = useWindowStore();
  const { 
    wallpaper, 
    desktopIcons, // This will be replaced by desktopFolders and desktopFiles
    setWallpaper, 
    showContextMenu, 
    hideContextMenu, 
    contextMenu: desktopContextMenu, // Rename to avoid conflict
    updateIconPosition, // Will be adapted for desktopFolders/Files
    addDesktopIcon, // Will be adapted for desktopFolders/Files
    removeDesktopIcon // Will be adapted for desktopFolders/Files
  } = useDesktopStore();
  const { createFolder, createFile } = useFileSystemStore();

  const [showIcons, setShowIcons] = useState(() => {
    return localStorage.getItem("desktop_show_icons") !== "false";
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editName, setEditName] = useState("");
  const [draggingItem, setDraggingItem] = useState(null);
  const [itemContextMenu, setItemContextMenu] = useState(null);

  // Combine desktopFolders and desktopFiles from useDesktopStore
  // For now, let's use a simplified structure based on the old desktopIcons
  // This will need to be updated when useDesktopStore is refactored
  const allDesktopItems = (desktopIcons || []).map(icon => ({
    id: icon.id,
    name: icon.name,
    type: icon.type,
    x: icon.x,
    y: icon.y
  }));

  useEffect(() => {
    // Listen for wallpaper changes from Gallery
    const handleWallpaperChange = (e) => {
      const newWallpaper = e?.detail || localStorage.getItem("desktop_wallpaper");
      if (newWallpaper) setWallpaper(newWallpaper);
    };

    // Listen for folder creation (from ContextMenu or Finder)
    const handleFolderCreated = (e) => {
      const newFolder = e.detail;
      // Add to desktopIcons in desktopStore
      addDesktopIcon({
        id: newFolder.name, // Use name as ID for desktop icon
        name: newFolder.name,
        type: 'folder',
        x: 100, // Default position
        y: 100
      });
      setEditingItem(newFolder.name);
      setEditName(newFolder.name);
    };

    // Listen for file creation (from Finder)
    const handleFileCreated = (e) => {
      const newFile = e.detail;
      // Add to desktopIcons in desktopStore
      addDesktopIcon({
        id: newFile.name, // Use name as ID for desktop icon
        name: newFile.name,
        type: 'file',
        x: 100, // Default position
        y: 100
      });
    };

    // Listen for icons toggle
    const handleIconsChanged = () => {
      setShowIcons(localStorage.getItem("desktop_show_icons") !== "false");
    };

    window.addEventListener('wallpaperChanged', handleWallpaperChange);
    window.addEventListener('os_folder_created', handleFolderCreated);
    window.addEventListener('os_file_created', handleFileCreated);
    window.addEventListener('desktopIconsChanged', handleIconsChanged);
    
    // Also listen for storage events (for cross-tab support)
    window.addEventListener('storage', (e) => {
      if (e.key === 'desktop_wallpaper' && e.newValue) {
        setWallpaper(e.newValue);
      }
    });
    
    return () => {
      window.removeEventListener('wallpaperChanged', handleWallpaperChange);
      window.removeEventListener('os_folder_created', handleFolderCreated);
      window.removeEventListener('os_file_created', handleFileCreated);
      window.removeEventListener('desktopIconsChanged', handleIconsChanged);
    };
  }, [addDesktopIcon, setWallpaper]);

  const handleDragStart = (e, item) => {
    e.stopPropagation();
    setDraggingItem(item.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropItem = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggingItem) return;
    
    const x = e.clientX - 40; // Center the icon
    const y = e.clientY - 40;
    
    updateIconPosition(draggingItem, x, y); // Update position in desktopStore
    setDraggingItem(null);
  };

  const handleDesktopDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggingItem) return;
    
    const x = e.clientX - 40;
    const y = e.clientY - 40;
    
    updateIconPosition(draggingItem, x, y); // Update position in desktopStore
    setDraggingItem(null);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    // Only show context menu when clicking on the desktop background
    if (e.target === e.currentTarget || e.target.classList.contains('desktop-area')) {
      showContextMenu(e.clientX, e.clientY);
    }
  };

  const handleOpenFinder = (path) => {
    openWindow("finder", "Finder", "Finder", { initialPath: path });
  };

  const handleOpenTerminal = () => {
    openWindow("terminal", "Terminal", "Terminal");
  };

  const handleItemDoubleClick = (item) => {
    if (item.type === "folder") {
      openWindow("finder", "Finder", "Finder", { initialPath: `/${item.name}` });
    } else if (item.type === "file") {
      // Assuming TextEdit can open generic files
      openWindow("textedit", `TextEdit - ${item.name}`, "TextEdit", { filePath: `/${item.name}` });
    }
  };

  const handleItemRename = (item) => {
    setEditingItem(item.id);
    setEditName(item.name);
  };

  const handleRenameSubmit = (item) => {
    if (editName.trim()) {
      // Update name in desktopStore
      updateIconPosition(item.id, item.x, item.y, editName.trim()); // Assuming updateIconPosition can take a new name
    }
    setEditingItem(null);
    setEditName("");
  };

  const handleDeleteItem = (item) => {
    removeDesktopIcon(item.id); // Remove from desktopStore
  };

  return (
    <div
      className="relative w-screen h-screen max-w-screen max-h-screen overflow-hidden bg-cover bg-center desktop-area"
      style={{
        backgroundImage: `url(${wallpaper})`,
      }}
      onContextMenu={handleContextMenu}
      onClick={() => {
        hideContextMenu();
        setItemContextMenu(null);
        setSelectedItem(null);
      }}
      onDragOver={handleDragOver}
      onDrop={handleDesktopDrop}
    >
      {/* Only show MenuBar, Windows, and Dock when NOT locked */}
      {!isLocked && (
        <>
          <div className="absolute left-0 right-0 top-0 z-40">
            <MenuBar /> {/* Use existing MenuBar */}
          </div>

          {/* Desktop Icons */}
          {showIcons && (
            <div className="absolute inset-0 pointer-events-none">
              {allDesktopItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  draggable
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    absolute pointer-events-auto flex flex-col items-center justify-center w-20 p-2 rounded-lg cursor-grab active:cursor-grabbing
                    ${selectedItem === item.id ? "bg-blue-500/40" : "hover:bg-white/10"}
                    transition-colors
                  `}
                  style={{
                    left: `${item.x || 16 + index * 100}px`,
                    top: `${item.y || 32 + index * 100}px`,
                  }}
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={() => setDraggingItem(null)}
                  onDrop={(e) => handleDropItem(e, item)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item.id);
                  }}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedItem(item.id);
                    setItemContextMenu({ itemId: item.id, x: e.clientX, y: e.clientY });
                  }}
                >
                  {item.type === "folder" ? (
                    <img
                      src="https://s3.macosicons.com/macosicons/icons/GecwaBmkFQ/lowResPngFile_c3ef21fe8fabfd9d23fcc3ab3134dcf9_GecwaBmkFQ.png"
                      alt="folder"
                      className="w-14 h-14 drop-shadow-lg object-contain"
                      onError={(e) => {
                        e.target.src = 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/50cce92fe1e8a5b82de86e1c98146ba1_low_res_Folder_Common.png';
                      }}
                    />
                  ) : (
                    <FiFile className="w-14 h-14 text-white/80 drop-shadow-lg" />
                  )}
                  
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={() => handleRenameSubmit(item)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRenameSubmit(item);
                        if (e.key === "Escape") {
                          setEditingItem(null);
                          setEditName("");
                        }
                      }}
                      className="w-full text-center text-xs text-white bg-blue-500/50 rounded px-1 py-0.5 outline-none"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="text-xs text-white text-center mt-1 drop-shadow-md line-clamp-2 break-all">
                      {item.name}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          <Dock />
        </>
      )}

      {/* Windows always render (even when locked) so audio/video keeps playing */}
      <div style={{ 
        opacity: isLocked ? 0 : 1, 
        pointerEvents: isLocked ? 'none' : 'auto',
        transition: 'opacity 0.3s ease'
      }}>
        {windows.map((w) => (
          <Window window={w} key={w.id}> {/* Use existing Window component */}
            {/* Render app component inside Window */}
            {/* This part needs to be handled by WindowManager, not directly here */}
          </Window>
        ))}
      </div>

      {!isLocked && (
        <>

          {/* Context Menu */}
          <AnimatePresence>
            {desktopContextMenu && (
              <ContextMenu
                x={desktopContextMenu.x}
                y={desktopContextMenu.y}
                onClose={hideContextMenu}
                onOpenFinder={handleOpenFinder}
                onOpenTerminal={handleOpenTerminal}
              />
            )}
          </AnimatePresence>

          {/* Item Context Menu */}
          <AnimatePresence>
            {itemContextMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="fixed bg-white/95 backdrop-blur-md rounded-lg shadow-lg overflow-hidden z-50"
                style={{
                  left: `${itemContextMenu.x}px`,
                  top: `${itemContextMenu.y}px`,
                }}
                onMouseLeave={() => setItemContextMenu(null)}
              >
                <button
                  onClick={() => {
                    const item = allDesktopItems.find(i => i.id === itemContextMenu.itemId);
                    if (item) {
                      handleItemRename(item);
                      setItemContextMenu(null);
                    }
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-900 hover:bg-blue-500/20 transition-colors"
                >
                  Rename
                </button>
                <button
                  onClick={() => {
                    const item = allDesktopItems.find(i => i.id === itemContextMenu.itemId);
                    if (item) {
                      handleDeleteItem(item);
                      setItemContextMenu(null);
                    }
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-500/20 transition-colors border-t border-gray-200"
                >
                  Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
