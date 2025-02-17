import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import api from "../Api/professeurApi"; // Si tu utilises un fichier API

const ProfesseurForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".png"] },
    maxFiles: 1,
    onDrop: (files) => {
      setValue("profilePicture", files[0]);
      setPreview(URL.createObjectURL(files[0]));
    },
  });

  const optionsMatières = [
    { value: "maths", label: "Mathématiques" },
    { value: "physique", label: "Physique" },
    { value: "informatique", label: "Informatique" },
  ];

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "subjects") {
          // Convertir les valeurs des matières en tableau de chaînes (non objets)
          formData.append(key, JSON.stringify(data[key].map((m) => m.value)));
        } else {
          formData.append(key, data[key]);
        }
      });

      console.log("Données envoyées :", Object.fromEntries(formData.entries()));

      await api.post("/admin", formData);
      alert("Professeur ajouté !");
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout :",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg w-full bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Nom *</label>
          <input
            {...register("firstName", { required: "Le nom est obligatoire" })}
            className="w-full border rounded-md p-2"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Prénom *</label>
          <input
            {...register("lastName", { required: "Le prénom est obligatoire" })}
            className="w-full border rounded-md p-2"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email *</label>
          <input
            type="email"
            {...register("email", { required: "Champ requis" })}
            className="w-full border rounded-md p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Téléphone *</label>
          <input
            {...register("phone", {
              required: "Champ requis",
              pattern: /^\+?[0-9]{10}$/,
            })}
            className="w-full border rounded-md p-2"
            placeholder="06********"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Matières enseignées *
          </label>
          <Controller
            name="subjects"
            control={control}
            rules={{ required: "Sélectionnez au moins une matière" }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={optionsMatières}
                className="w-full"
              />
            )}
          />
          {errors.subjects && (
            <p className="text-red-500 text-sm">{errors.subjects.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Statut *</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="permanent"
                {...register("status", { required: "Champ requis" })}
                className="mr-2"
              />{" "}
              Permanent
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="vacataire"
                {...register("status", { required: "Champ requis" })}
                className="mr-2"
              />{" "}
              Vacataire
            </label>
          </div>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
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
          {errors.profilePicture && (
            <p className="text-red-500 text-sm">
              {errors.profilePicture.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default ProfesseurForm;
