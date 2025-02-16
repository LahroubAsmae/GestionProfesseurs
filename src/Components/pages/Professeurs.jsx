import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const ProfesseurForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subjects: "",
    status: "",
    profilePicture: null,
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".png"] },
    maxFiles: 1,
    onDrop: (files) => {
      setFormData({ ...formData, profilePicture: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    },
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!validateEmail(formData.email)) {
      setMessage({ text: "Email invalide", type: "error" });
      return;
    }
    if (!validatePhone(formData.phone)) {
      setMessage({ text: "Numéro de téléphone invalide", type: "error" });
      return;
    }

    // Préparation des données pour l'envoi
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    try {
      setLoading(true);

      // Vérifier si le professeur existe déjà
      const checkResponse = await axios.get(
        `http://localhost:5000/api/admin?email=${formData.email}`
      );
      if (checkResponse.data.exists) {
        setMessage({ text: "Ce professeur existe déjà !", type: "error" });
        setLoading(false);
        return;
      }

      // Envoyer les données au backend
      const response = await axios.post(
        "http://localhost:5000/api/admin/addprofessor", // Utilisez la route correcte
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Afficher un message de succès
      setMessage({ text: "Professeur ajouté avec succès !", type: "success" });

      // Réinitialiser le formulaire
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subjects: "",
        status: "",
        profilePicture: null,
      });
      setPreview(null);
    } catch (error) {
      // Gérer les erreurs
      setMessage({
        text: "Erreur lors de l'ajout du professeur.",
        type: "error",
      });
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100 py-6">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <form
          onSubmit={handleSubmit}
          className="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-4">
            Ajouter un professeur
          </h2>
          {message.text && (
            <p
              className={`text-center ${
                message.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {message.text}
            </p>
          )}
          {["firstName", "lastName", "email", "phone"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 font-medium">
                {field === "firstName"
                  ? "Prénom"
                  : field === "lastName"
                  ? "Nom"
                  : field === "email"
                  ? "Email"
                  : "Téléphone"}
              </label>
              <input
                type="text"
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Matières *
            </label>
            <select
              id="subjects"
              value={formData.subjects}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Sélectionner une matière</option>
              {["Mathématiques", "Physique", "Informatique", "Français"].map(
                (subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Statut *</label>
            <select
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Sélectionner un statut</option>
              <option value="Permanent">Permanent</option>
              <option value="Vacataire">Vacataire</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Photo de profil *
            </label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed p-4 text-center cursor-pointer rounded-md"
            >
              <input {...getInputProps()} />
              {preview ? (
                <img
                  src={preview}
                  alt="Prévisualisation"
                  className="w-32 mx-auto"
                />
              ) : (
                <p className="text-gray-500">
                  Glissez-déposez une image ici, ou cliquez pour sélectionner
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            {loading ? "Ajout..." : "Ajouter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfesseurForm;
