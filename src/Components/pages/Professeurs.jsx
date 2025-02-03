import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

const schema = yup.object().shape({
  nom: yup.string().required("Le nom est obligatoire"),
  prenom: yup.string().required("Le prénom est obligatoire"),
  email: yup.string().email("Email invalide").required("Champ requis"),
  telephone: yup.string()
    .matches(/^\+?[0-9]{10}$/, "Numéro invalide (10 chiffres)")
    .required("Champ requis"),
  matieres: yup.array().min(1, "Sélectionnez au moins une matière").required("Champ requis"),
  statut: yup.string().required("Champ requis"),
  photo: yup.mixed()
    .required("Une photo est requise")
    .test("fileSize", "Fichier trop lourd (max 5Mo)", value => value && value.size <= 5000000)
    .test("fileType", "Format non supporté (JPEG/PNG)", value => value && ["image/jpeg", "image/png"].includes(value.type))
});

const ProfesseurForm = () => {
  const { register, control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.png'] },
    maxFiles: 1,
    onDrop: (files) => {
      setValue("photo", files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  });

  const optionsMatières = [
    { value: "maths", label: "Mathématiques" },
    { value: "physique", label: "Physique" },
    { value: "informatique", label: "Informatique" }
  ];

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Nom *</label>
          <input {...register("nom")} className="w-full border rounded-md p-2" />
          {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Prénom *</label>
          <input {...register("prenom")} className="w-full border rounded-md p-2" />
          {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email *</label>
          <input type="email" {...register("email")} className="w-full border rounded-md p-2" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Téléphone *</label>
          <input {...register("telephone")} className="w-full border rounded-md p-2" placeholder="06********" />
          {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Matières enseignées *</label>
          <Controller
            name="matieres"
            control={control}
            render={({ field }) => (
              <Select {...field} isMulti options={optionsMatières} className="w-full" />
            )}
          />
          {errors.matieres && <p className="text-red-500 text-sm">{errors.matieres.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Statut *</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input type="radio" value="permanent" {...register("statut")} className="mr-2" /> Permanent
            </label>
            <label className="flex items-center">
              <input type="radio" value="vacataire" {...register("statut")} className="mr-2" /> Vacataire
            </label>
          </div>
          {errors.statut && <p className="text-red-500 text-sm">{errors.statut.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Photo de profil *</label>
          <div {...getRootProps()} className="border-2 border-dashed p-4 text-center cursor-pointer rounded-md">
            <input {...getInputProps()} />
            {preview ? (
              <img src={preview} alt="Prévisualisation" className="w-32 mx-auto" />
            ) : (
              <p className="text-gray-500">Glissez-déposez une image ici, ou cliquez pour sélectionner</p>
            )}
          </div>
          {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Enregistrer</button>
      </form>
    </div>
  );
};

export default ProfesseurForm;