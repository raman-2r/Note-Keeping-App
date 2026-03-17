import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote } from "../redux/noteSlice";
import { Copy, Save, Share2, Eye } from "lucide-react";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allNotes = useSelector((state) => state.note.notes);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (noteId) {
      const note = allNotes.find((p) => p._id === noteId);
      if (note) {
        setTitle(note.title);
        setValue(note.content);
      }
    }
  }, [noteId, allNotes]);

  function handleSaveNote() {
    if (!title.trim() && !value.trim()) return;

    const note = {
      title: title || "Untitled Note",
      content: value,
      _id: noteId || Date.now().toString(35),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (noteId) {
      dispatch(updateNote(note));
    } else {
      dispatch(addNote(note));
    }
    setTitle("");
    setValue("");
    navigate('/notes');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] w-full">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div
        className={`w-full max-w-3xl transition-all duration-700 ease-out relative z-10 ${isFocused ? 'scale-[1.03]' : 'scale-100'
          }`}
      >
        <div className="bg-[#030014]/40 backdrop-blur-3xl rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 flex flex-col transition-all duration-500 hover:shadow-[0_0_60px_rgba(192,38,211,0.2)] hover:border-fuchsia-500/30">

          {/* Header Area */}
          <div className="px-8 py-6 border-b border-white/10 bg-black/40 flex justify-between items-center gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 to-cyan-500/5" />
            <input
              className="flex-1 bg-transparent text-3xl md:text-4xl font-extrabold text-white placeholder-gray-500 outline-none transition-all placeholder:font-bold tracking-tight relative z-10"
              type="text"
              placeholder="Add a Title.."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button
              onClick={handleSaveNote}
              disabled={!title.trim() && !value.trim()}
              className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 disabled:from-gray-800 disabled:to-gray-900 disabled:text-gray-600 text-white rounded-2xl shadow-[0_0_20px_rgba(192,38,211,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] disabled:shadow-none transition-all duration-300 font-bold tracking-widest uppercase relative z-10"
            >
              <span>{noteId ? "Update" : "Save"}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>

          {/* Editor Area */}
          <div className="p-8 h-[400px] md:h-[500px]">
            <textarea
              className="w-full h-full bg-transparent text-gray-200 text-xl md:text-2xl leading-relaxed outline-none resize-none placeholder-gray-600 custom-scrollbar font-medium"
              placeholder="What's on your mind?..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>

          <div className="px-8 py-4 border-t border-white/10 bg-black/40 text-sm font-bold tracking-widest uppercase text-fuchsia-400/80 flex justify-end">
            {value.length} characters <span className="text-cyan-400/80 mx-2">•</span> {value.split(/\s+/).filter(w => w.length > 0).length} words
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
