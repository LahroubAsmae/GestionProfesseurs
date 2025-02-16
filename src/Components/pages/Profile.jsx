import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subjects: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    axios
      .get(`http://localhost:5000/api/professor/profile/${email}`)
      .then((response) => {
        setFormData(response.data.professor);
        localStorage.setItem("id", response.data.professor._id);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du profil :", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("id");
      const response = await axios.put(
        `http://localhost:5000/api/professor/update/${id}`,
        formData
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

  return (
    <div className="p-6 bg-white shadow-md rounded w-full sm:w-96 mx-auto mt-10">
      <h2 className="text-xl mb-4 text-center font-semibold">
        Profil du Professeur
      </h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor={key}
              >
                {key}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                disabled={key === "email"}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>
          ))}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 ml-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Annuler
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
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
