import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#030014]/50 border-b border-fuchsia-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo / App Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(192,38,211,0.6)]">
              <span className="text-white font-black text-2xl leading-none tracking-tighter">K</span>
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-400 drop-shadow-[0_0_10px_rgba(192,38,211,0.3)] tracking-tight">
              Keep Notes
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-3 sm:gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 tracking-wide uppercase ${
                  isActive
                    ? "bg-white/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] border border-cyan-400/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-transparent"
                }`
              }
            >
              Add Note
            </NavLink>
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 tracking-wide uppercase ${
                  isActive
                    ? "bg-white/10 text-fuchsia-300 shadow-[0_0_20px_rgba(192,38,211,0.2)] border border-fuchsia-400/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-transparent"
                }`
              }
            >
              My Notes
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
