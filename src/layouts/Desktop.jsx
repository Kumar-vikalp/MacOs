import React, { useEffect, useState } from "react";
import Dock from "../components/Dock/Dock";
import Window from "../components/Window/Window";
import useWindowStore from "../store/windowStore";
import MenuBar from "../components/MenuBar/MenuBar";
import ContextMenu from "../components/Desktop/ContextMenu";
import WallpaperModal from "../components/Desktop/WallpaperModal"; // New Import
import { AnimatePresence, motion } from "framer-motion";
import { FiFile } from "react-icons/fi";
import useDesktopStore from "../store/desktopStore";
import useFileSystemStore from "../store/fileSystemStore";

export default function Desktop({ setStage, isLocked = false }) {
  const { windows, openWindow } = useWindowStore();
  const { 
    wallpaper, 
    desktopFolders, // Use desktopFolders and desktopFiles from store
    desktopFiles,
    setWallpaper, 
    showContextMenu, 
    hideContextMenu, 
    contextMenu: desktopContextMenu, 
    updateDesktopItemPosition, // Updated to use new method
    addDesktopFolder, 
    addDesktopFile, 
    removeDesktopItem,
    showWallpaperModal,   // Added from store
    toggleWallpaperModal  // Added from store
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

  const allDesktopItems = [
    ...desktopFolders.map(folder => ({ ...folder, type: 'folder' })),
    ...desktopFiles.map(file => ({ ...file, type: 'file' }))
  ];

  useEffect(() => {
    const handleWallpaperChange = (e) => {
      const newWallpaper = e?.detail || localStorage.getItem("desktop_wallpaper");
      if (newWallpaper) setWallpaper(newWallpaper);
    };

    const handleFolderCreated = (e) => {
      const newFolder = e.detail;
      addDesktopFolder({ // Use addDesktopFolder
        id: newFolder.name,
        name: newFolder.name,
        x: 100,
        y: 100
      });
      setEditingItem(newFolder.name);
      setEditName(newFolder.name);
    };

    const handleIconsChanged = () => {
      setShowIcons(localStorage.getItem("desktop_show_icons") !== "false");
    };

    window.addEventListener('wallpaperChanged', handleWallpaperChange);
    window.addEventListener('os_folder_created', handleFolderCreated);
    window.addEventListener('desktopIconsChanged', handleIconsChanged);
    
    return () => {
      window.removeEventListener('wallpaperChanged', handleWallpaperChange);
      window.removeEventListener('os_folder_created', handleFolderCreated);
      window.removeEventListener('desktopIconsChanged', handleIconsChanged);
    };
  }, [addDesktopFolder, setWallpaper]);

  // Interaction Handlers
  const handleDragStart = (e, item) => {
    e.stopPropagation();
    setDraggingItem(item.id);
  };

  const handleDesktopDrop = (e) => {
    e.preventDefault();
    if (!draggingItem) return;
    const x = e.clientX - 40;
    const y = e.clientY - 40;
    updateDesktopItemPosition(draggingItem, x, y); // Use new updateDesktopItemPosition
    setDraggingItem(null);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget || e.target.classList.contains('desktop-area')) {
      showContextMenu(e.clientX, e.clientY);
    }
  };

  const handleItemDoubleClick = (item) => {
    if (item.type === "folder") {
      openWindow("finder", "Finder", "Finder", { initialPath: `/${item.name}` });
    } else {
      openWindow("textedit", `TextEdit - ${item.name}`, "TextEdit", { filePath: `/${item.name}` });
    }
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center desktop-area"
      style={{ backgroundImage: `url(${wallpaper})` }}
      onContextMenu={handleContextMenu}
      onClick={() => {
        hideContextMenu();
        setItemContextMenu(null);
        setSelectedItem(null);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDesktopDrop}
    >
      {!isLocked && (
        <>
          <div className="absolute left-0 right-0 top-0 z-40">
            <MenuBar />
          </div>

          {showIcons && (
            <div className="absolute inset-0 pointer-events-none">
              {allDesktopItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  draggable
                  className={`absolute pointer-events-auto flex flex-col items-center justify-center w-20 p-2 rounded-lg ${selectedItem === item.id ? "bg-blue-500/40" : "hover:bg-white/10"}`}
                  style={{ left: `${item.x || 16}px`, top: `${item.y || 32}px` }}
                  onDragStart={(e) => handleDragStart(e, item)}
                  onClick={(e) => { e.stopPropagation(); setSelectedItem(item.id); }}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                >
                  {item.type === "folder" ? (
                    <img src="https://s3.macosicons.com/macosicons/icons/GecwaBmkFQ/lowResPngFile_c3ef21fe8fabfd9d23fcc3ab3134dcf9_GecwaBmkFQ.png" className="w-14 h-14 object-contain" alt="folder" />
                  ) : (
                    <FiFile className="w-14 h-14 text-white/80" />
                  )}
                  <span className="text-xs text-white text-center mt-1 drop-shadow-md">{item.name}</span>
                </motion.div>
              ))}
            </div>
          )}
          <Dock />
        </>
      )}

      {/* Window Layer */}
      {/* WindowManager is now rendered conditionally in App.tsx */}

      {!isLocked && (
        <>
          {/* Main Context Menu */}
          <AnimatePresence>
            {desktopContextMenu && (
              <ContextMenu
                x={desktopContextMenu.x}
                y={desktopContextMenu.y}
                onClose={hideContextMenu}
              />
            )}
          </AnimatePresence>

          {/* Wallpaper Selection Modal */}
          <AnimatePresence>
            {showWallpaperModal && (
              <WallpaperModal onClose={() => toggleWallpaperModal(false)} />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
