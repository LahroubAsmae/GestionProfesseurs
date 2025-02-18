import React from "react";

const Navbar = ({ onLoginClick }) => {
  return (
    <div className="w-full bg-blue-500 shadow-lg ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Project Name */}
          <div className="flex items-center">
            <span className="ml-2 text-xl font-bold text-white">
              Espace Professeurs
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onLoginClick}
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-0 focus:border-0 border-0 transition-colors"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
