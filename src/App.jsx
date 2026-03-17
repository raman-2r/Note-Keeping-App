import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import NotesList from "./components/NotesList";
import ViewNote from "./components/ViewNote";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] bg-[length:400%_400%] animate-gradient-xy font-sans text-white transition-colors duration-500">
      <Nav />
      <main className="pt-24 pb-10 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<NotesList />} />
          <Route path="/note/:id" element={<ViewNote />} />
        </Routes>
      </main>
      <ToastContainer 
        theme="dark" 
        position="bottom-right" 
        toastClassName="!bg-black/80 !backdrop-blur-xl !border !border-fuchsia-500/30 !text-white !shadow-[0_0_20px_rgba(192,38,211,0.3)] !rounded-2xl"
      />
    </div>
  );
}

export default App;
