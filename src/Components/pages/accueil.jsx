import React from 'react';

function Accueil() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 text-center">
      <img
            src="/Education-bro.svg"
            className="w-full"
            alt="Illustration"
          />
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          Bienvenue, Chers Professeurs
        </h1>
        <p className="text-xl text-gray-600">
        Ne luttez pas pour être un meilleur enseignant que tout le monde. Soyez simplement un meilleur enseignant que vous ne l'auriez jamais cru.
        </p>
      </div>
    </div>
  );
}

export default Accueil;