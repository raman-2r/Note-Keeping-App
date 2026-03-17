import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { Copy, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

const Share = ({ pasteId }) => {
  const shareUrl = `${window.location.origin}/note/${pasteId}`;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied!", {
      position: "bottom-center",
      className: "!bg-black/90 !backdrop-blur-xl !border !border-cyan-500/30 !text-white !shadow-[0_0_20px_rgba(34,211,238,0.3)] !rounded-2xl !font-bold"
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-5 flex flex-col gap-5 border border-white/10 rounded-3xl bg-[#030014]/80 backdrop-blur-3xl text-white shadow-[0_0_40px_rgba(0,0,0,0.8)] w-[320px] z-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 pointer-events-none" />
      <h4 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 px-1 uppercase tracking-widest relative z-10">Share this note</h4>
      
      {/* Copy Input */}
      <div className="flex items-center gap-2 bg-black/50 p-1.5 rounded-2xl border border-white/10 relative z-10 hover:border-cyan-500/30 transition-colors group">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="bg-transparent text-sm font-medium text-gray-300 px-3 py-1.5 w-full outline-none truncate group-hover:text-cyan-100 transition-colors"
        />
        <button
          className={`p-2.5 shrink-0 rounded-xl transition-all shadow-md ${
            copied ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          }`}
          onClick={handleCopy}
        >
          {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Social Share Buttons */}
      <div className="flex justify-center gap-6 pt-2 pb-1 relative z-10">
        <FacebookShareButton url={shareUrl} className="hover:-translate-y-1 hover:scale-110 transition-all hover:drop-shadow-[0_0_15px_rgba(24,119,242,0.6)]">
          <FacebookIcon size={44} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} className="hover:-translate-y-1 hover:scale-110 transition-all hover:drop-shadow-[0_0_15px_rgba(29,161,242,0.6)]">
          <TwitterIcon size={44} round />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} className="hover:-translate-y-1 hover:scale-110 transition-all hover:drop-shadow-[0_0_15px_rgba(37,211,102,0.6)]">
          <WhatsappIcon size={44} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default Share;
