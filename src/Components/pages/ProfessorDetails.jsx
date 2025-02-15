import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfessorDetails = () => {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/professors/${id}`);
        setProfessor(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du professeur :", error);
      }
    };

    fetchProfessor();
  }, [id]);

  if (!professor) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="professor-details">
      <h1>{professor.firstName} {professor.lastName}</h1>
      <p>Email: {professor.email}</p>
      <p>Téléphone: {professor.phone}</p>
      <p>Matières: {professor.subjects}</p>
      <p>Statut: {professor.status}</p>
      <img src={professor.profilePicture} alt="Photo de profil" />
    </div>
  );
};

export default ProfessorDetails;