import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const constrainToViewport = (x, y, width, height) => {
  const maxX = window.innerWidth - width;
  const maxY = window.innerHeight - height - 80; // Account for dock
  
  return {
    x: Math.max(0, Math.min(x, maxX)),
    y: Math.max(24, Math.min(y, maxY)), // Account for menu bar
    width,
    height
  };
};

const useWindowStore = create(
  persist(
    (set, get) => ({
      windows: [],
      activeWindowId: null,
      nextZIndex: 1000,

      openWindow: (appId, title, component, options = {}) => {
        const existingWindow = get().windows.find(w => w.appId === appId && !w.isMinimized);
        
        if (existingWindow) {
          set(state => ({
            activeWindowId: existingWindow.id,
            windows: state.windows.map(w => 
              w.id === existingWindow.id 
                ? { ...w, zIndex: state.nextZIndex, isMinimized: false }
                : w
            ),
            nextZIndex: state.nextZIndex + 1
          }));
          return;
        }

        const windowId = `${appId}-${Date.now()}`;
        const defaultOptions = {
          width: 800,
          height: 600,
          x: Math.random() * 300 + 200,
          y: Math.random() * 200 + 150,
          minWidth: 300,
          minHeight: 200,
          isResizable: true,
          isMinimized: false,
          isMaximized: false,
        };

        const newWindow = {
          id: windowId,
          appId,
          title,
          component,
          zIndex: get().nextZIndex,
          ...defaultOptions,
          ...options,
        };

        // Constrain to viewport
        const constrained = constrainToViewport(newWindow.x, newWindow.y, newWindow.width, newWindow.height);
        Object.assign(newWindow, constrained);
        set(state => ({
          windows: [...state.windows, newWindow],
          activeWindowId: windowId,
          nextZIndex: state.nextZIndex + 1,
        }));
      },

      closeWindow: (windowId) => {
        set(state => ({
          windows: state.windows.filter(w => w.id !== windowId),
          activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
        }));
      },

      minimizeWindow: (windowId) => {
        set(state => ({
          windows: state.windows.map(w => 
            w.id === windowId ? { ...w, isMinimized: true } : w
          ),
          activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
        }));
      },

      maximizeWindow: (windowId) => {
        set(state => ({
          windows: state.windows.map(w => 
            w.id === windowId 
              ? { 
                  ...w, 
                  isMaximized: !w.isMaximized,
                  prevPosition: w.isMaximized ? w.prevPosition : { x: w.x, y: w.y, width: w.width, height: w.height }
                } 
              : w
          ),
        }));
      },

      focusWindow: (windowId) => {
        set(state => ({
          activeWindowId: windowId,
          windows: state.windows.map(w => 
            w.id === windowId 
              ? { ...w, zIndex: state.nextZIndex, isMinimized: false }
              : w
          ),
          nextZIndex: state.nextZIndex + 1,
        }));
      },

      updateWindow: (windowId, updates) => {
        set(state => ({
          windows: state.windows.map(w => 
            w.id === windowId ? { 
              ...w, 
              ...constrainToViewport(
                updates.x !== undefined ? updates.x : w.x,
                updates.y !== undefined ? updates.y : w.y,
                updates.width !== undefined ? updates.width : w.width,
                updates.height !== undefined ? updates.height : w.height
              )
            } : w
          ),
        }));
      },

      getOpenApps: () => {
        return [...new Set(get().windows.map(w => w.appId))];
      },
    }),
    {
      name: 'macos-windows',
      partialize: (state) => ({
        windows: state.windows.map(w => ({
          ...w,
          component: undefined, // Don't persist React components
        })),
      }),
    }
  )
);

export default useWindowStore;