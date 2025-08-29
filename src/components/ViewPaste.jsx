import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === id);

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900 text-white overflow-hidden flex justify-center items-center">
      {/* Main Content Wrapper */}
      <div className="w-full max-w-2xl px-6">
        {paste ? (
          <div className="bg-gray-800 text-gray-200 rounded-2xl p-6 shadow-lg h-[80vh] flex flex-col">
            {/* Title & Copy Button */}
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
              <p className="text-2xl font-semibold">{paste.title}</p>
              <button
                className="text-sky-400 text-xl transition-all hover:text-sky-300 hover:scale-110"
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied to clipboard!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                  });
                }}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="mt-6 break-words leading-8 text-lg text-gray-300 overflow-auto pr-2 flex-grow max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {paste.content}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-xl text-center">
            🚀 Paste not found!
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewPaste;
