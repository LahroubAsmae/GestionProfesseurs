import React, { useState } from "react";
import Navbar from "./Navbar";
import SignupForm from "./SeConnecteForm.jsx";
import Footer from "./Footer.jsx";
import Accueil from "./accueil.jsx";

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState("accueil"); // État pour gérer l'affichage

  const handleLoginClick = () => {
    setActiveComponent("login"); // Affiche le formulaire de connexion
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar onLoginClick={handleLoginClick} />

      {/* Affichage conditionnel du composant actif */}
      {activeComponent === "accueil" && <Accueil />}
      {activeComponent === "login" && <SignupForm />}

      <Footer />
    </div>
  );
};

export default Homepage;
