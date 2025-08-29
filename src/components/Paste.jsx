import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Share from "./share";

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showShare, setShowShare] = useState({});

  return (
    <div className="min-h-screen flex flex-col items-center text-white bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900 p-6">
      {/* Search Input */}
      <input
        className="p-3 w-full max-w-lg bg-gray-800 rounded-xl text-white outline-none 
          focus:ring-2 focus:ring-blue-500 transition-all shadow-md placeholder-gray-400"
        type="search"
        placeholder="🔍 Search for pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Pastes Container */}
      <div className="bg-gray-800 text-gray-200 mt-6 rounded-2xl w-full max-w-4xl p-5 shadow-lg">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="relative border border-gray-700 rounded-xl p-5 mb-5 bg-gray-700 shadow-md"
            >
              {/* Date in Top-Right Corner */}
              <p className="absolute top-3 right-4 text-sm text-gray-400">
                {new Date(paste.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {/* Title */}
              <p className="p-4 text-2xl font-semibold border-b border-gray-500 text-white">
                {paste.title}
              </p>

              {/* Content */}
              <div className="mt-4 break-words leading-8 text-lg text-gray-300">
                {paste.content}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <button className="px-4 py-2 bg-sky-500 text-white rounded-lg transition-all hover:bg-sky-400 hover:shadow-md">
                  <a href={`/?pasteId=${paste._id}`}>Edit</a>
                </button>
                <button
                  className="px-4 py-2 bg-amber-500 text-black font-semibold rounded-lg transition-all hover:bg-amber-400 hover:shadow-md"
                  onClick={() => navigate(`/viewPaste/${paste._id}`)}
                >
                  View
                </button>
                <button
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg transition-all hover:bg-teal-400 hover:shadow-md"
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard!", {
                      position: "top-right",
                      autoClose: 3000,
                      theme: "dark",
                    });
                  }}
                >
                  Copy
                </button>
                <button
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg transition-all hover:bg-rose-400 hover:shadow-md"
                  onClick={() => dispatch(removeFromPastes(paste))}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-violet-500 text-white rounded-lg transition-all hover:bg-violet-400 hover:shadow-md"
                  onClick={() =>
                    setShowShare((prev) => ({
                      ...prev,
                      [paste._id]: !prev[paste._id],
                    }))
                  }
                >
                  Share
                </button>
              </div>

              {/* Share Component */}
              {showShare[paste._id] && <Share pasteId={paste._id} />}
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-400 py-6">
            🚀 No pastes found! Start by creating one.
          </p>
        )}
      </div>
    </div>
  );
};

export default Paste;
