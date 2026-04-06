import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const snapToGrid = (x, y, gridSize = 20) => {
  return {
    x: Math.round(x / gridSize) * gridSize,
    y: Math.round(y / gridSize) * gridSize,
  };
};

const defaultWallpapers = [
  '/wallpaper/red-and-purple-galaxy-sky.webp',
  '/wallpaper/night-mode-dark-sand-with-specks-and-sparkles.webp',
  '/wallpaper/minimalist-desktop-mountains-orange-blurry-soft-sky.webp',
  '/wallpaper/japanese-white-cherry-blossom-flowers.webp',
  '/wallpaper/elegance-hd-tree-leaves-close-up.webp',
  '/wallpaper/dark-mode-wavy-minimalist.webp',
  '/wallpaper/dark-mode-night-mode-minimalist-mountains-landscape.webp',
  '/wallpaper/big-sur-graphic-2-Cn3eVevS.webp',
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
