import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNote } from "../redux/noteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Share from "./Share";
import { Copy, Edit3, Trash2, Share2, Search, Calendar } from "lucide-react";

const NotesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const notes = useSelector((state) => state.note.notes);
  const filteredData = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showShare, setShowShare] = useState({});

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[calc(100vh-120px)] relative z-10">
      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-12 relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
        </div>
        <input
          className="w-full pl-14 pr-6 py-4 bg-black/40 backdrop-blur-2xl rounded-2xl text-white outline-none border border-white/10 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] placeholder-gray-500 text-lg font-bold tracking-wide"
          type="search"
          placeholder="Search your notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Notes Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
        {filteredData.length > 0 ? (
          filteredData.map((note) => (
            <div
              key={note._id}
              className="group relative flex flex-col bg-black/30 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 transition-all duration-500 hover:bg-black/50 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(192,38,211,0.25)] hover:border-fuchsia-500/30 cursor-pointer overflow-hidden h-[300px]"
              onClick={() => navigate(`/note/${note._id}`)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-cyan-500/5 pointer-events-none" />
              
              {/* Date */}
              <div className="flex items-center gap-2 text-xs font-black text-cyan-400 uppercase tracking-widest mb-4 z-10 relative">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(note.createdAt)}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-white mb-3 truncate group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-400 transition-all duration-300 z-10 relative">
                {note.title}
              </h3>

              {/* Content Preview */}
              <p className="text-gray-300 text-base leading-relaxed line-clamp-4 flex-1 relative z-10 font-medium tracking-wide">
                {note.content}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#11011f] via-[#11011f]/90 to-transparent group-hover:from-black transition-colors z-10" />

              {/* Action Bar (Hover Revealed) */}
              <div 
                className="absolute bottom-0 left-0 right-0 p-6 bg-black/60 backdrop-blur-md border-t border-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-end gap-3 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  title="Edit"
                  className="p-3 rounded-xl text-gray-300 transition-all hover:bg-fuchsia-500/20 hover:text-fuchsia-400 hover:shadow-[0_0_20px_rgba(192,38,211,0.5)]"
                  onClick={() => navigate(`/?noteId=${note._id}`)}
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button
                  title="Copy"
                  className="p-3 rounded-xl text-gray-300 transition-all hover:bg-cyan-500/20 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  onClick={() => {
                    navigator.clipboard.writeText(note.content);
                    toast.success("Copied to clipboard!");
                  }}
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  title="Share"
                  className="p-3 rounded-xl text-gray-300 transition-all hover:bg-purple-500/20 hover:text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] relative"
                  onClick={() =>
                    setShowShare((prev) => ({
                      ...prev,
                      [note._id]: !prev[note._id],
                    }))
                  }
                >
                  <Share2 className="w-5 h-5" />
                  {showShare[note._id] && (
                    <div className="absolute bottom-full right-0 mb-4 animate-in fade-in slide-in-from-bottom-2">
                       <Share pasteId={note._id} />
                    </div>
                  )}
                </button>
                <button
                  title="Delete"
                  className="p-3 rounded-xl text-gray-300 transition-all hover:bg-rose-500/20 hover:text-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.5)]"
                  onClick={() => dispatch(removeNote(note))}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-16 text-center bg-black/20 backdrop-blur-xl border-2 border-dashed border-white/20 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] hover:border-fuchsia-500/50 hover:shadow-[0_0_50px_rgba(192,38,211,0.2)] transition-all duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-fuchsia-600/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <Search className="w-10 h-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3 tracking-wide">No notes found</h3>
            <p className="text-gray-400 max-w-md font-medium text-lg">
              We couldn't find any notes matching your search. Try a different keyword or create a new note.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesList;
