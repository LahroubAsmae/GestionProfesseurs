import React, { useState } from 'react';
import Navbar from './Navbar';
import SignupForm from './SeConnecteForm.jsx';
import InscriptionForm from './InscriptionForm.jsx';
import Footer from './Footer.jsx';
import Accueil from './accueil.jsx';

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState('accueil'); // État pour gérer l'affichage

  const handleSignupClick = () => {
    setActiveComponent('signup'); // Affiche le formulaire d'inscription
  };

  const handleLoginClick = () => {
    setActiveComponent('login'); // Affiche le formulaire de connexion
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar onSignupClick={handleSignupClick} onLoginClick={handleLoginClick} />

      {/* Affichage conditionnel du composant actif */}
      {activeComponent === 'accueil' && <Accueil />}
      {activeComponent === 'signup' && <InscriptionForm />}
      {activeComponent === 'login' && <SignupForm />}

      <Footer />
    </div>
  );
};

export default Homepage;
