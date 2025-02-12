import React, { useState } from 'react';
import Navbar from './Navbar';
import SignupForm from './SeConnecteForm.jsx'; // Importation du formulaire
import InscriptionForm from './InscriptionForm.jsx';

const Homepage = () => {
  const [isSignupVisible, setIsSignupVisible] = useState(false);  
  const [isLoginVisible, setIsLoginVisible] = useState(false);  

  const handleSignupClick = () => {
    setIsSignupVisible(true);
    setIsLoginVisible(false); // Masquer l'autre formulaire si nécessaire
  };

  const handleLoginClick = () => {
    setIsSignupVisible(false); // Masquer l'autre formulaire si nécessaire
    setIsLoginVisible(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Passe chaque fonction séparément en prop */}
      <Navbar onSignupClick={handleSignupClick} onLoginClick={handleLoginClick} />
    
      {/* Affiche le bon formulaire selon l'état */}
      {isSignupVisible &&<InscriptionForm /> }
      {isLoginVisible && <SignupForm /> }
    </div>
  );
};

export default Homepage;
