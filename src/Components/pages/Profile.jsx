import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [professor, setProfessor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subjects: "",
    status: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/professor/profile/${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfessor(response.data.professor);
        setFormData({
          firstName: response.data.professor.firstName,
          lastName: response.data.professor.lastName,
          email: response.data.professor.email,
          phone: response.data.professor.phone,
          subjects: response.data.professor.subjects,
          status: response.data.professor.status,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token manquant, veuillez vous reconnecter.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/professor/update`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfessor(response.data.professor);
      setIsEditing(false);
      alert("Profil mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      alert(
        "Erreur lors de la mise à jour du profil : " +
          error.response?.data?.message || error.message
      );
    }
  };

  if (!professor) return <div>Chargement du profil...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded w-full sm:w-96 mx-auto mt-10">
      <h2 className="text-xl mb-4 text-center font-semibold">
        Profil du Professeur
      </h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="firstName"
            >
              Prénom
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="lastName"
            >
              Nom
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="mt-1 p-2 w-full border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="phone"
            >
              Téléphone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="subjects"
            >
              Matières
            </label>
            <input
              type="text"
              id="subjects"
              name="subjects"
              value={formData.subjects}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="status"
            >
              Statut
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            >
              <option value="permanent">Permanent</option>
              <option value="vacataire">Vacataire</option>
            </select>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <p>
            <strong>Prénom :</strong> {professor.firstName}
          </p>
          <p>
            <strong>Nom :</strong> {professor.lastName}
          </p>
          <p>
            <strong>Email :</strong> {professor.email}
          </p>
          <p>
            <strong>Téléphone :</strong> {professor.phone}
          </p>
          <p>
            <strong>Matières :</strong> {professor.subjects}
          </p>
          <p>
            <strong>Statut :</strong> {professor.status}
          </p>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Modifier
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
