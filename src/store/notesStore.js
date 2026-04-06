import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useNotesStore = create(
  persist(
    (set, get) => ({
      notes: [
        {
          id: '1',
          title: 'Welcome to Notes',
          content: 'This is your first note! You can create, edit, and delete notes here.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          folder: 'notes', // Added folder property
          deleted: false, // Added deleted property
        },
        {
          id: '2',
          title: 'Meeting Notes - Project Alpha',
          content: 'Discussed the new project timeline and deliverables:\n\n• Phase 1: Research and planning (2 weeks)\n• Phase 2: Development (6 weeks)\n• Phase 3: Testing and deployment (2 weeks)\n\nNext meeting: Friday at 2 PM\nAction items:\n- Finalize requirements document\n- Set up development environment\n- Create project repository',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          folder: 'notes',
          deleted: false,
        },
        {
          id: '3',
          title: 'Shopping List',
          content: 'Groceries needed:\n\n✓ Milk\n✓ Bread\n• Eggs\n• Apples\n• Chicken breast\n• Rice\n• Olive oil\n• Tomatoes\n• Onions\n• Cheese\n\nDon\'t forget to check if we need more coffee!',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          folder: 'notes',
          deleted: false,
        },
        {
          id: '4',
          title: 'Book Recommendations',
          content: 'Books to read this year:\n\n📚 Fiction:\n• "The Seven Husbands of Evelyn Hugo" by Taylor Jenkins Reid\n• "Klara and the Sun" by Kazuo Ishiguro\n• "Project Hail Mary" by Andy Weir\n\n📖 Non-Fiction:\n• "Atomic Habits" by James Clear\n• "Sapiens" by Yuval Noah Harari\n• "The Psychology of Money" by Morgan Housel\n\nCurrently reading: "Dune" by Frank Herbert',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          folder: 'notes',
          deleted: false,
        },
      ],
      selectedNoteId: '1',

      createNote: () => {
        const newNote = {
          id: Date.now().toString(),
          title: 'New Note',
          content: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          folder: 'notes', // Default folder
          deleted: false,
        };

        set(state => ({
          notes: [newNote, ...state.notes],
          selectedNoteId: newNote.id,
        }));

        return newNote.id; // Return the ID of the new note
      },

      updateNote: (id, updates) => {
        set(state => ({
          notes: state.notes.map(note =>
            note.id === id
              ? { ...note, ...updates, updatedAt: new Date().toISOString() }
              : note
          ),
        }));
      },

      deleteNote: (id) => {
        set(state => {
          const newNotes = state.notes.filter(note => note.id !== id);
          const newSelectedId = newNotes.length > 0 ? newNotes[0].id : null;
          
          return {
            notes: newNotes,
            selectedNoteId: state.selectedNoteId === id ? newSelectedId : state.selectedNoteId,
          };
        });
      },

      selectNote: (id) => {
        set({ selectedNoteId: id });
      },

      getSelectedNote: () => {
        const { notes, selectedNoteId } = get();
        return notes.find(note => note.id === selectedNoteId) || null;
      },
    }),
    {
      name: 'macos-notes',
    }
  )
);

export default useNotesStore;
