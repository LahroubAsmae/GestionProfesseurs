import React, { useState, useEffect } from "react";

const ListeProfesseurs = () => {
  const [professeurs, setProfesseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // État pour savoir si nous sommes en mode édition
  const [editProfessor, setEditProfessor] = useState({}); // État pour stocker les données du professeur à modifier

  // Fonction pour afficher le formulaire de modification
  const handleEditClick = (professor) => {
    setIsEditing(true); // Activer le mode édition
    setEditProfessor(professor); // Charger les données du professeur dans le formulaire
  };

  // Fonction pour gérer les modifications dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfessor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce professeur ?"
    );

    if (!isConfirmed) return; // Annule la suppression si l'utilisateur clique sur "Annuler"

    try {
      const response = await fetch(`http://localhost:5000/api/admin/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du professeur");
      }

      // Mise à jour de l'état pour supprimer le professeur de la liste
      setProfesseurs(professeurs.filter((prof) => prof._id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression");
    }
  };

  // Fonction pour envoyer les modifications au backend
  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/${editProfessor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editProfessor),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update professor");
      }

      const updatedProfessor = await response.json();
      setProfesseurs(
        professeurs.map((prof) =>
          prof._id === updatedProfessor._id ? updatedProfessor : prof
        )
      );
      setIsEditing(false); // Fermer le formulaire de modification après l'enregistrement
    } catch (err) {
      setError("Erreur lors de la mise à jour");
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // Annuler l'édition et fermer le formulaire
  };

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin");
        if (!response.ok) {
          throw new Error("Failed to fetch professors");
        }
        const data = await response.json();
        setProfesseurs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessors();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      {/* Formulaire de modification */}
      {isEditing && (
        <div className="p-4 border-b mb-4 bg-gray-100">
          <h3 className="text-xl font-semibold">Modifier le professeur</h3>
          <div>
            <label className="block mt-2">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={editProfessor.firstName}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block mt-2">Nom</label>
            <input
              type="text"
              name="lastName"
              value={editProfessor.lastName}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block mt-2">Email</label>
            <input
              type="email"
              name="email"
              value={editProfessor.email}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block mt-2">Téléphone</label>
            <input
              type="text"
              name="phone"
              value={editProfessor.phone}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block mt-2">Matières</label>
            <input
              type="text"
              name="subjects"
              value={editProfessor.subjects}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block mt-2">Statut</label>
            <input
              type="text"
              name="status"
              value={editProfessor.status}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            >
              Enregistrer
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded-md"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Liste des professeurs */}
      <table className="min-w-full table-auto text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-gray-600">Prénom</th>
            <th className="px-4 py-2 text-gray-600">Nom</th>
            <th className="px-4 py-2 text-gray-600">Email</th>
            <th className="px-4 py-2 text-gray-600">Téléphone</th>
            <th className="px-4 py-2 text-gray-600">Matières</th>
            <th className="px-4 py-2 text-gray-600">Statut</th>
            <th className="px-4 py-2 text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {professeurs.map((professor) => (
            <tr key={professor._id} className="border-b">
              <td className="px-4 py-2 text-gray-800">{professor.firstName}</td>
              <td className="px-4 py-2 text-gray-800">{professor.lastName}</td>
              <td className="px-4 py-2 text-gray-800">{professor.email}</td>
              <td className="px-4 py-2 text-gray-800">{professor.phone}</td>
              <td className="px-4 py-2 text-gray-800">{professor.subjects}</td>
              <td className="px-4 py-2 text-gray-800">{professor.status}</td>
              <td className="px-4 py-2 text-gray-800">
                <button
                  onClick={() => handleEditClick(professor)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(professor._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeProfesseurs;
