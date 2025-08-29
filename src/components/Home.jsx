import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToPastes,
  resetAllPastes,
  updateToPastes,
} from "../redux/pasteSlice";
import Share from "./share";

const Home = () => {
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("");
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(35),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  const allPastes = useSelector((state) => state.paste.pastes);
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900">
      {/* Title Input & Button */}
      <div className="flex gap-4 w-full max-w-3xl">
        <input
          className="flex-1 p-3 bg-gray-700 text-white rounded-xl outline-none 
          focus:ring-2 focus:ring-blue-500 transition-all shadow-md placeholder-gray-400"
          type="text"
          placeholder="Enter the title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="px-6 py-3 bg-sky-500 text-white rounded-xl shadow-md transition-all 
          duration-300 hover:bg-sky-400 hover:scale-105"
          onClick={createPaste}
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      {/* Content Textarea */}
      <div className="mt-6 w-full max-w-3xl">
        <textarea
          className="w-full bg-gray-700 text-white rounded-xl p-4 min-h-[300px] outline-none 
          focus:ring-2 focus:ring-blue-500 transition-all shadow-md placeholder-gray-400"
          placeholder="Enter content..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
