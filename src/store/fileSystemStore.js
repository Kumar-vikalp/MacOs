import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFileSystemStore = create(
  persist(
    (set, get) => ({
      currentPath: '/',
      files: {
        '/': {
          type: 'folder',
          name: 'Macintosh HD',
          children: {
            'Documents': {
              type: 'folder',
              name: 'Documents',
              children: {
                'Welcome.txt': {
                  type: 'file',
                  name: 'Welcome.txt',
                  content: 'Welcome to macOS Web Simulator!\n\nThis is a fully functional desktop environment built with React.',
                  extension: 'txt',
                },
              },
            },
            'Downloads': {
              type: 'folder',
              name: 'Downloads',
              children: {},
            },
            'Pictures': {
              type: 'folder',
              name: 'Pictures',
              children: {},
            },
          },
        },
      },
      trash: {},

      navigateTo: (path) => {
        set({ currentPath: path });
      },

      getCurrentFolder: () => {
        const { files, currentPath } = get();
        const pathParts = currentPath.split('/').filter(Boolean);
        
        let current = files['/'];
        for (const part of pathParts) {
          if (current.children && current.children[part]) {
            current = current.children[part];
          } else {
            // If path part not found, return null or the last known folder
            return null; 
          }
        }
        
        return current;
      },

      // Modified createFile to accept a targetPath
      createFile: (name, content = '', extension = 'txt', targetPath = null) => {
        const path = targetPath || get().currentPath;
        set(state => {
          const newFiles = { ...state.files };
          const pathParts = path.split('/').filter(Boolean);
          
          let current = newFiles['/'];
          for (const part of pathParts) {
            if (current.children && current.children[part]) {
              current = current.children[part];
            } else {
              // Create folder if it doesn't exist in the path
              current.children[part] = { type: 'folder', name: part, children: {} };
              current = current.children[part];
            }
          }
          
          if (current.children) {
            current.children[name] = {
              type: 'file',
              name,
              content,
              extension,
            };
          }
          
          return { files: newFiles };
        });
      },

      // Modified createFolder to accept a targetPath
      createFolder: (name, targetPath = null) => {
        const path = targetPath || get().currentPath;
        set(state => {
          const newFiles = { ...state.files };
          const pathParts = path.split('/').filter(Boolean);
          
          let current = newFiles['/'];
          for (const part of pathParts) {
            if (current.children && current.children[part]) {
              current = current.children[part];
            } else {
              // Create folder if it doesn't exist in the path
              current.children[part] = { type: 'folder', name: part, children: {} };
              current = current.children[part];
            }
          }
          
          if (current.children) {
            current.children[name] = {
              type: 'folder',
              name,
              children: {},
            };
          }
          
          return { files: newFiles };
        });
      },

      deleteItem: (name) => {
        const { currentPath } = get();
        set(state => {
          const newFiles = { ...state.files };
          const pathParts = currentPath.split('/').filter(Boolean);
          
          let current = newFiles['/'];
          for (const part of pathParts) {
            if (current.children && current.children[part]) {
              current = current.children[part];
            }
          }
          
          if (current.children && current.children[name]) {
            const item = current.children[name];
            delete current.children[name];
            
            return {
              files: newFiles,
              trash: { ...state.trash, [name]: item },
            };
          }
          
          return state;
        });
      },

      updateFileContent: (name, content) => {
        const { currentPath } = get();
        set(state => {
          const newFiles = { ...state.files };
          const pathParts = currentPath.split('/').filter(Boolean);
          
          let current = newFiles['/'];
          for (const part of pathParts) {
            if (current.children && current.children[part]) {
              current = current.children[part];
            }
          }
          
          if (current.children && current.children[name]) {
            current.children[name].content = content;
          }
          
          return { files: newFiles };
        });
      },

      getFile: (path) => {
        const { files } = get();
        const pathParts = path.split('/').filter(Boolean);
        
        let current = files['/'];
        for (const part of pathParts) {
          if (current.children && current.children[part]) {
            current = current.children[part];
          } else {
            return null; // File or folder not found
          }
        }
        
        return current;
      },
    }),
    {
      name: 'macos-filesystem',
    }
  )
);

export default useFileSystemStore;
