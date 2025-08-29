import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900 py-3">
      <nav className="relative bg-gray-800 bg-opacity-95 backdrop-blur-lg p-4 shadow-lg rounded-full mx-5 border border-gray-700">
        <ul className="flex justify-center gap-10">
          {[
            { path: "/", label: "Home 🏠" },
            { path: "/paste", label: "Paste ✍️" },
          ].map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative text-lg font-semibold px-6 py-2 rounded-lg tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-white bg-sky-500 shadow-md hover:bg-sky-400 px-7 py-3"
                      : "text-gray-300 hover:text-white hover:bg-gray-700 px-7 py-3"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
