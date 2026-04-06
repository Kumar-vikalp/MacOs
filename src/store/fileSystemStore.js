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
                'Project Proposal.txt': {
                  type: 'file',
                  name: 'Project Proposal.txt',
                  content: 'Project Proposal: macOS Web Simulator\n\nObjective:\nCreate a comprehensive web-based macOS simulator that provides users with an authentic desktop experience.\n\nKey Features:\n- Window management system\n- Dock with app icons\n- Menu bar with system controls\n- File system simulation\n- Multiple applications (Finder, Notes, Calculator, etc.)\n\nTechnical Stack:\n- React 18 with TypeScript\n- Framer Motion for animations\n- Zustand for state management\n- Tailwind CSS for styling\n\nTimeline:\n- Phase 1: Core system (4 weeks)\n- Phase 2: Applications (6 weeks)\n- Phase 3: Polish and testing (2 weeks)',
                  extension: 'txt',
                },
                'Meeting Minutes': {
                  type: 'folder',
                  name: 'Meeting Minutes',
                  children: {
                    'Q1 Review.txt': {
                      type: 'file',
                      name: 'Q1 Review.txt',
                      content: 'Q1 2024 Review Meeting\nDate: March 28, 2024\n\nAttendees:\n- John Smith (Project Manager)\n- Sarah Johnson (Lead Developer)\n- Mike Chen (UI/UX Designer)\n\nKey Achievements:\n✓ Completed core window management system\n✓ Implemented 8 functional applications\n✓ Added authentic macOS styling\n✓ Integrated state management\n\nNext Quarter Goals:\n• Add more applications\n• Improve performance\n• Add keyboard shortcuts\n• Enhance accessibility',
                      extension: 'txt',
                    }
                  }
                }
              },
            },
            'Downloads': {
              type: 'folder',
              name: 'Downloads',
              children: {
                'macOS Wallpapers.zip': {
                  type: 'file',
                  name: 'macOS Wallpapers.zip',
                  content: 'Binary file content (wallpaper collection)',
                  extension: 'zip',
                },
                'React Documentation.pdf': {
                  type: 'file',
                  name: 'React Documentation.pdf',
                  content: 'Binary file content (React documentation)',
                  extension: 'pdf',
                }
              },
            },
            'Pictures': {
              type: 'folder',
              name: 'Pictures',
              children: {
                'Nature Photos': {
                  type: 'folder',
                  name: 'Nature Photos',
                  children: {
                    'Mountain Sunset.jpg': {
                      type: 'file',
                      name: 'Mountain Sunset.jpg',
                      content: 'Binary image data',
                      extension: 'jpg',
                      url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
                    },
                    'Forest Path.jpg': {
                      type: 'file',
                      name: 'Forest Path.jpg',
                      content: 'Binary image data',
                      extension: 'jpg',
                      url: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
                    }
                  }
                },
                'Screenshots': {
                  type: 'folder',
                  name: 'Screenshots',
                  children: {
                    'Desktop Screenshot.png': {
                      type: 'file',
                      name: 'Desktop Screenshot.png',
                      content: 'Binary image data',
                      extension: 'png',
                      url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
                    }
                  }
                }
              },
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
