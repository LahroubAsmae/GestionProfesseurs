import { useState } from 'react'

import './App.css'
import ProfesseurForm from './Components/pages/Professeurs'
import ExcelUploader from './Components/pages/excel'

import Card from './Components/pages/Card'

function App() {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className='pl-120'>
    
    <div className="max-w-4xl mx-auto mt-10 p-6  bg-white shadow-lg rounded-lg ">
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 ">
      Gestion des Professeurs
    </h1>

    {/* Navigation : Choix en haut */}
    <div className="flex justify-center space-x-4 mb-6">
      <button
        className={`px-6 py-2 font-medium rounded-t-lg ${
          activeTab === "form" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => setActiveTab("form")}
      >
        Saisie Manuelle
      </button>
      <button
        className={`px-6 py-2 font-medium rounded-t-lg ${
          activeTab === "import" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => setActiveTab("import")}
      >
        Import Excel
      </button>
      <button
        className={`px-6 py-2 font-medium rounded-t-lg ${
          activeTab === "cartes" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => setActiveTab("cartes")}
      >
        Cartes Professionnelles
      </button>
    </div>

    {/* Affichage du contenu en dessous */}
    <div className=" p-6 rounded-b-lg shadow-inner ">
      {activeTab === "form" && <ProfesseurForm />}
      {activeTab === "import" && <ExcelUploader />}
      {activeTab === "cartes" && <Card />}
    </div>
  </div>
  </div>
    
  )
}

export default App;
