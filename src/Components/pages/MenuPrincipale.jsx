import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfesseurForm from "./Professeurs";
import ExcelUploader from "./excel";
import Card from "./Card";
import Profile from "./Profile";

const MenuPrincipale = () => {
  const [activeTab, setActiveTab] = useState("form");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Suppression des données de session (ex: token)
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full p-6 bg-white shadow-lg rounded-lg relative">
        {/* Bouton Profil et Logout */}
        <div className="absolute top-4 right-4 block">
          <div className="inline relative">
            <button 
              type="button" 
              className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg" 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="pl-1">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{ display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentColor", strokeWidth: 3, overflow: "visible" }}
                >
                  <g fill="none" fillRule="nonzero">
                    <path d="m2 16h28"></path>
                    <path d="m2 24h28"></path>
                    <path d="m2 8h28"></path>
                  </g>
                </svg>
              </div>
              <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{ display: "block", height: "100%", width: "100%", fill: "currentColor" }}
                >
                  <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                </svg>
              </div>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setActiveTab("profile")}>Profile</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Gestion des Professeurs
        </h1>

        {/* 🔹 Menu Principal */}
        <div className="flex justify-center space-x-8 mb-4">
          <button
            className={`px-6 py-2 font-medium rounded-lg ${
              activeTab === "form" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("form")}
          >
            Saisie Manuelle
          </button>
          <button
            className={`px-6 py-2 font-medium rounded-lg ${
              activeTab === "import" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("import")}
          >
            Import Excel
          </button>
          <button
            className={`px-6 py-2 font-medium rounded-lg ${
              activeTab === "cartes" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("cartes")}
          >
            Cartes Professionnelles
          </button>
        </div>

        {/* 🔹 Contenu des onglets */}
        <div className="w-full h-full justify-center">
          <div className="mb-10">
            {activeTab === "form" && <ProfesseurForm />}
            {activeTab === "import" && <ExcelUploader />}
            {activeTab === "cartes" && <Card />}
            {activeTab === "profile" && <Profile />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPrincipale;