import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../utils/defaultProfile.png";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subjects: "",
    status: "",
    profilePicture: "",
  });
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(defaultProfile);
  const [savedImage, setSavedImage] = useState(""); // Stocke l’image récupérée de l'API

  useEffect(() => {
    const email = localStorage.getItem("email");
    axios
      .get(`http://localhost:5000/api/professor/profile/${email}`)
      .then((response) => {
        const {
          firstName,
          lastName,
          email,
          phone,
          subjects,
          status,
          profilePicture,
        } = response.data.professor;

        setFormData({
          firstName,
          lastName,
          email,
          phone,
          subjects,
          status,
          profilePicture,
        });

        // Stocker l'image récupérée sans l'afficher immédiatement
        if (
          profilePicture &&
          profilePicture !== "null" &&
          profilePicture !== "undefined"
        ) {
          setSavedImage(profilePicture);
        }
        localStorage.setItem("id", response.data.professor._id);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du profil :", error);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePicture: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("id");
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.put(
        `http://localhost:5000/api/professor/update/${id}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data.message);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert(
        "Échec de la mise à jour : " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    navigate("/Connection");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-800 to-blue-900 min-h-screen flex flex-col items-center justify-center p-4">
      <button
        onClick={handleLogout}
        className="mb-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 self-end"
      >
        Déconnexion
      </button>
      <div className="font-std mb-10 w-full max-w-md rounded-2xl bg-white p-10 text-gray-900 shadow-xl relative">
        <div className="flex flex-col items-center mb-5">
          <img
            src={imagePreview}
            alt="Profile Picture"
            className="rounded-full w-32 h-32 border-4 border-indigo-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
          />
          <h2 className="text-4xl font-bold text-blue-900 mb-3">
            Profil du Professeur
          </h2>
        </div>

        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Matières
              </label>
              <input
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Statut
              </label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image de Profil
              </label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700"
              >
                Enregistrer
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p>
              <strong>Prénom:</strong> {formData.firstName}
            </p>
            <p>
              <strong>Nom:</strong> {formData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Téléphone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Matières:</strong> {formData.subjects}
            </p>
            <p>
              <strong>Statut:</strong> {formData.status}
            </p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700"
              >
                Modifier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
