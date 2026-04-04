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
