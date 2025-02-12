import React from 'react';

const Navbar = ({ onSignupClick,onLoginClick }) => {
  return (
    <div className="w-full bg-blue-500 shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Project Name */}
          <div className="flex items-center">
            <span className="ml-2 text-xl font-bold text-white">Gestion Professeurs</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onSignupClick}  // Passe la fonction ici pour gérer l'affichage du formulaire
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              S'inscrire
            </button>
            <button 
             onClick={onLoginClick} 
            className="px-4 py-2 text-sm font-medium text-white border border-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
