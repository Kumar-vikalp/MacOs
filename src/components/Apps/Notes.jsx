import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2, FiSearch, FiChevronRight } from "react-icons/fi";
import { BsFolder2, BsTrash, BsTag } from "react-icons/bs";
import useNotesStore from '../../store/notesStore'; // Import existing store

const defaultFolders = [
  { id: "all", label: "All iCloud", color: "#FFC542" },
  { id: "notes", label: "Notes", color: "#FFC542" },
  { id: "personal", label: "Personal", color: "#FFC542" },
  { id: "work", label: "Work", color: "#FFC542" },
  { id: "deleted", label: "Recently Deleted", color: "#FF4C4C" },
];

const defaultTags = ["#receipt", "#shopping", "#todo", "#work"];

const Notes = ({ windowId }) => { // Renamed from Blogs to Notes
  const { 
    notes, 
    selectedNoteId, 
    createNote, 
    updateNote, 
    deleteNote, 
    selectNote, 
    getSelectedNote 
  } = useNotesStore();

  const [selectedFolder, setSelectedFolder] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const activeNote = getSelectedNote();

  useEffect(() => {
    if (activeNote) {
      setEditTitle(activeNote.title);
      setEditContent(activeNote.content);
    } else {
      setEditTitle("");
      setEditContent("");
    }
  }, [activeNote]);

  const visibleNotes = notes.filter((n) => {
    // Assuming 'deleted' status is managed by the store or added to notes
    // For now, filtering based on a hypothetical 'deleted' property
    if (selectedFolder === "deleted") return n.deleted;
    if (selectedFolder !== "all" && n.folder !== selectedFolder) return false; // Assuming notes have a 'folder' property
    if (n.deleted) return false;
    if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !n.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleNewNote = () => {
    const newNoteId = createNote(); // createNote now returns the new note's ID
    selectNote(newNoteId);
  };

  const handleDeleteNote = (id) => {
    // This needs to be adapted if the store handles 'deleted' status
    // For now, it will permanently delete
    deleteNote(id);
  };

  const handlePermanentDelete = (id) => {
    deleteNote(id);
  };

  const handleUpdateNote = (id, title, content) => {
    updateNote(id, { title, content });
  };

  const folderCount = (folderId) => {
    // This logic needs to be adapted if notes have a 'folder' property
    if (folderId === "all") return notes.filter((n) => !n.deleted).length;
    if (folderId === "deleted") return notes.filter((n) => n.deleted).length;
    return notes.filter((n) => n.folder === folderId && !n.deleted).length;
  };

  return (
    <div className="flex h-full bg-[#1c1c1e] text-white overflow-hidden rounded-b-xl font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif]">
      {/* Sidebar */}
      <div className="w-48 shrink-0 bg-[#2c2c2e] border-r border-white/10 flex flex-col">
        {/* Folders header */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">iCloud</p>
        </div>
        <div className="flex-1 overflow-y-auto px-2">
          {defaultFolders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[13px] mb-0.5 transition-colors ${
                selectedFolder === folder.id
                  ? "bg-[#FFC542]/20 text-[#FFC542]"
                  : "hover:bg-white/5 text-white/80"
              }`}
            >
              <div className="flex items-center gap-2">
                {folder.id === "deleted" ? (
                  <BsTrash className="w-3.5 h-3.5 text-red-400" />
                ) : (
                  <BsFolder2 className="w-3.5 h-3.5" style={{ color: folder.color }} />
                )}
                <span className="truncate">{folder.label}</span>
              </div>
              <span className="text-[11px] text-white/30">{folderCount(folder.id)}</span>
            </button>
          ))}

          {/* Tags */}
          <div className="mt-4 mb-2">
            <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider px-2">Tags</p>
          </div>
          {defaultTags.map((tag) => (
            <button
              key={tag}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] mb-0.5 hover:bg-white/5 text-white/60 transition-colors"
            >
              <BsTag className="w-3 h-3" />
              <span>{tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Note List */}
      <div className="w-56 shrink-0 bg-[#242426] border-r border-white/10 flex flex-col">
        {/* Search + New */}
        <div className="p-2 border-b border-white/10 flex items-center gap-1.5">
          <div className="flex-1 flex items-center gap-1.5 bg-white/10 rounded-md px-2 py-1">
            <FiSearch className="w-3 h-3 text-white/40 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[12px] text-white placeholder-white/30 outline-none w-full"
            />
          </div>
          <button
            onClick={handleNewNote}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-[#FFC542] transition-colors shrink-0"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>

        {/* Folder title */}
        <div className="px-3 py-1.5">
          <p className="text-[11px] font-semibold text-white/40">
            {defaultFolders.find((f) => f.id === selectedFolder)?.label || "Notes"}{" "}
            <span className="text-white/20">{visibleNotes.length}</span>
          </p>
        </div>

        {/* Notes list */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {visibleNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-white/20 text-[12px]">
                <p>No Notes</p>
              </div>
            ) : (
              visibleNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => selectNote(note.id)}
                  className={`px-3 py-2 cursor-pointer border-b border-white/5 group relative transition-colors ${
                    selectedNoteId === note.id
                      ? "bg-[#FFC542]/15"
                      : "hover:bg-white/5"
                  }`}
                >
                  <p className="text-[13px] font-medium text-white truncate">{note.title || "New Note"}</p>
                  <p className="text-[11px] text-white/40 truncate mt-0.5">
                    {note.content?.split("\n")[0] || "No additional text"}
                  </p>
                  <p className="text-[10px] text-white/20 mt-0.5">
                    {new Date(note.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectedFolder === "deleted"
                        ? handlePermanentDelete(note.id)
                        : handleDeleteNote(note.id);
                    }}
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-red-400 transition-all"
                  >
                    <FiTrash2 className="w-3 h-3" />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col bg-[#1c1c1e] overflow-hidden">
        {activeNote && !activeNote.deleted ? (
          <>
            <div className="px-6 pt-4 pb-2 border-b border-white/10">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                  handleUpdateNote(activeNote.id, e.target.value, editContent);
                }}
                className="w-full bg-transparent text-[20px] font-semibold text-white outline-none placeholder-white/20"
                placeholder="Title"
              />
              <p className="text-[11px] text-white/30 mt-1">
                {new Date(activeNote.updatedAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <textarea
              value={editContent}
              onChange={(e) => {
                setEditContent(e.target.value);
                handleUpdateNote(activeNote.id, editTitle, e.target.value);
              }}
              className="flex-1 bg-transparent text-[14px] text-white/85 outline-none resize-none px-6 py-4 leading-relaxed placeholder-white/20"
              placeholder="Start writing..."
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-white/20">
            <div className="w-16 h-16 rounded-2xl bg-[#FFC542]/10 flex items-center justify-center">
              <BsFolder2 className="w-8 h-8 text-[#FFC542]/40" />
            </div>
            <p className="text-[14px]">No Note Selected</p>
            <button
              onClick={handleNewNote}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#FFC542]/20 hover:bg-[#FFC542]/30 text-[#FFC542] rounded-lg text-[13px] transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              New Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
