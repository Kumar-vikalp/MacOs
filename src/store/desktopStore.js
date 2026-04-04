import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const snapToGrid = (x, y, gridSize = 20) => {
  return {
    x: Math.round(x / gridSize) * gridSize,
    y: Math.round(y / gridSize) * gridSize,
  };
};

const defaultWallpapers = [
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
  '/wallpaper/sana\'sKitty.jpg', // Add your local wallpaper here
];


const useDesktopStore = create(
  persist(
    (set, get) => ({
      wallpaper: defaultWallpapers[0],
      wallpapers: defaultWallpapers,
      dockAutoHide: false, // New state for dock auto-hide
      desktopFolders: [ // New state for desktop folders
        { id: 'documents-folder', name: 'Documents', x: 50, y: 150 },
      ],
      desktopFiles: [ // New state for desktop files
        { id: 'welcome-file', name: 'Welcome.txt', type: 'file', x: 50, y: 250 },
      ],
      contextMenu: null,
      showWallpaperModal: false,

      setWallpaper: (wallpaper) => {
        set({ wallpaper });
      },

      // Updated to handle both folders and files
      updateDesktopItemPosition: (itemId, x, y, newName = null) => {
        const snapped = snapToGrid(x, y);
        set(state => ({
          desktopFolders: state.desktopFolders.map(item =>
            item.id === itemId ? { ...item, x: snapped.x, y: snapped.y, name: newName || item.name } : item
          ),
          desktopFiles: state.desktopFiles.map(item =>
            item.id === itemId ? { ...item, x: snapped.x, y: snapped.y, name: newName || item.name } : item
          ),
        }));
      },

      addDesktopFolder: (folder) => {
        set(state => ({
          desktopFolders: [...state.desktopFolders, { ...folder, x: folder.x || 50, y: folder.y || 50 }],
        }));
      },

      addDesktopFile: (file) => {
        set(state => ({
          desktopFiles: [...state.desktopFiles, { ...file, x: file.x || 50, y: file.y || 50 }],
        }));
      },

      removeDesktopItem: (itemId) => {
        set(state => ({
          desktopFolders: state.desktopFolders.filter(item => item.id !== itemId),
          desktopFiles: state.desktopFiles.filter(item => item.id !== itemId),
        }));
      },

      showContextMenu: (x, y) => {
        set({ contextMenu: { x, y } });
      },

      hideContextMenu: () => {
        set({ contextMenu: null });
      },

      toggleWallpaperModal: () => {
        set(state => ({ showWallpaperModal: !state.showWallpaperModal }));
      },

      toggleDockAutoHide: () => {
        set(state => ({ dockAutoHide: !state.dockAutoHide }));
      },

      // Removed old desktopIcons array and related methods
      // desktopIcons: [
      //   { id: 'macintosh-hd', name: 'Macintosh HD', type: 'drive', x: 50, y: 50 },
      //   { id: 'documents', name: 'Documents', type: 'folder', x: 50, y: 150 },
      //   { id: 'trash', name: 'Trash', type: 'trash', x: 50, y: 250 },
      // ],
      // updateIconPosition: (iconId, x, y) => {
      //   const snapped = snapToGrid(x, y);
      //   set(state => ({
      //     desktopIcons: state.desktopIcons.map(icon =>
      //       icon.id === iconId ? { ...icon, x: snapped.x, y: snapped.y } : icon
      //     ),
      //   }));
      // },
      // addDesktopIcon: (icon) => {
      //   set(state => ({
      //     desktopIcons: [...state.desktopIcons, icon],
      //   }));
      // },
      // removeDesktopIcon: (iconId) => {
      //   set(state => ({
      //     desktopIcons: state.desktopIcons.filter(icon => icon.id !== iconId),
      //   }));
      // },
    }),
    {
      name: 'macos-desktop',
    }
  )
);

export default useDesktopStore;
