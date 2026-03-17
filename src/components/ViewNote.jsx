import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Copy, ArrowLeft, Calendar, Edit3 } from "lucide-react";
import toast from "react-hot-toast";

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const notes = useSelector((state) => state.note.notes);
  const note = notes.find((p) => p._id === id);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'
    });
  };

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center relative z-10">
        <div className="w-24 h-24 bg-black/40 border border-white/10 shadow-[0_0_30px_rgba(244,63,94,0.3)] rounded-full flex items-center justify-center mb-6">
          <span className="text-5xl drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">📝</span>
        </div>
        <h2 className="text-4xl font-black text-white mb-4 tracking-wide">Note not found</h2>
        <p className="text-gray-400 text-lg mb-8 font-medium">This note may have been deleted or the link is incorrect.</p>
        <button 
          onClick={() => navigate('/notes')}
          className="px-8 py-3.5 bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white rounded-2xl transition-all shadow-[0_0_20px_rgba(192,38,211,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] font-bold tracking-widest uppercase"
        >
          Back to Notes
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto min-h-[calc(100vh-120px)] animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-all duration-300 font-bold tracking-widest uppercase"
        >
          <div className="p-3 rounded-2xl bg-black/40 group-hover:bg-cyan-500/20 border border-white/10 group-hover:border-cyan-400/30 transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          </div>
          <span>Back</span>
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/?noteId=${note._id}`)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black/40 hover:bg-fuchsia-500/20 border border-white/10 hover:border-fuchsia-400/30 text-gray-300 hover:text-fuchsia-400 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(192,38,211,0.4)]"
          >
            <Edit3 className="w-5 h-5" />
            <span className="text-sm font-bold tracking-widest uppercase">Edit</span>
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(note.content);
              toast.success("Note content copied!");
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black/40 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/30 text-gray-300 hover:text-cyan-400 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            <Copy className="w-5 h-5" />
            <span className="text-sm font-bold tracking-widest uppercase">Copy</span>
          </button>
        </div>
      </div>

      {/* Paper/Document Container */}
      <div className="bg-[#030014]/50 backdrop-blur-3xl rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/10 p-8 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-fuchsia-500/20 blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          
          {/* Header */}
          <header className="mb-12 pb-12 border-b border-white/10">
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-white to-cyan-300 leading-tight mb-8 tracking-tight drop-shadow-md">
              {note.title}
            </h1>
            <div className="flex items-center gap-3 text-cyan-300 bg-cyan-950/40 w-fit px-5 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(note.createdAt)}</span>
            </div>
          </header>

          {/* Body */}
          <div className="prose prose-invert prose-xl max-w-none prose-p:leading-relaxed prose-p:text-gray-200 prose-p:font-medium prose-headings:text-white prose-headings:font-black">
            {note.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6 text-xl">
                {paragraph || '\u00A0'}
              </p>
            ))}
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default ViewNote;
