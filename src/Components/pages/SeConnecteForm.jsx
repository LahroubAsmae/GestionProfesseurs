import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ConnexionForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Données soumises :", data);
    alert("Inscription réussie !");
    navigate("/menu");
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <div className="container h-full px-6 py-3 flex flex-wrap items-center justify-center lg:justify-between">
        {/* Colonne gauche : Illustration */}
        <div className="hidden lg:block mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
          <img
            src="/Professor-rafiki.svg"
            className="w-full"
            alt="Illustration"
          />
        </div>

        {/* Colonne droite : Formulaire */}
        <div className="md:w-8/12 lg:w-5/12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Connexion</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Champ Email */}
            <div className="relative mb-6">
              <input
                type="text"
                {...register("email", { required: "L'email est requis" })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Champ Mot de passe */}
            <div className="relative mb-6">
              <input
                type="password"
                {...register("password", { required: "Le mot de passe est requis" })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Mot de passe"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Bouton d'inscription */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Se Connecter
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConnexionForm;