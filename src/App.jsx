import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="app">
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paste" element={<Paste />} />
        <Route path="/viewPaste/:id" element={<ViewPaste />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
