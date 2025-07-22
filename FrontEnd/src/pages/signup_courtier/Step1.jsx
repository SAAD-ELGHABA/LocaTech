import { steps } from "framer-motion";
import React, { useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
function Step1({ setStep }) {
  const step1 = useSelector((state) => state.CourtierSignUpReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleStep1 = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.nom || !data.prenom || !data.email || !data.telephone) {
      toast.error("tous les champs sont obligatoires dans cette étape ");
      setLoading(false);
      return;
    } else {
      setStep(2);
      dispatch({
        type: "STEP1",
        payload: {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          telephone: data.telephone,
        },
      });
    }
    const validateEmail = (email) => {
      setLoading(false);
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhoneNumber = (phone) => {
      const phoneRegex = /^\d{10}$/;
      setLoading(false);
      return phoneRegex.test(phone);
    };
    if (!validateEmail(data.email)) {
      toast.error("Veuillez entrer une adresse email valide !");
      setLoading(false);
      return;
    }

    if (!validatePhoneNumber(data.telephone)) {
      toast.error(
        "Veuillez entrer un numéro de téléphone valide (10 chiffres) !"
      );
      setLoading(false);
      return;
    }
  };

  return (
    <div className="mt-5 px-4">
      <form
        onSubmit={handleStep1}
        className="w-full max-w-2xl mx-auto flex flex-col space-y-4"
      >
        <p className="text-center font-medium text-lg mb-2">
          Informations personnelles
        </p>

        {/* Nom */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label htmlFor="nom" className="md:w-1/4 font-medium">
            Nom :
          </label>
          <input
            id="nom"
            placeholder="Entrer votre nom"
            type="text"
            name="nom"
            value={step1.step1.nom || ""}
            onChange={(e) =>
              dispatch({
                type: "STEP1",
                payload: {
                  ...step1.step1,
                  nom: e.target.value,
                },
              })
            }
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>

        {/* Prénom */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label htmlFor="prenom" className="md:w-1/4 font-medium">
            Prénom :
          </label>
          <input
            id="prenom"
            placeholder="Entrer votre prénom"
            type="text"
            name="prenom"
            value={step1.step1.prenom || ""}
            onChange={(e) =>
              dispatch({
                type: "STEP1",
                payload: {
                  ...step1.step1,
                  prenom: e.target.value,
                },
              })
            }
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label htmlFor="email" className="md:w-1/4 font-medium">
            Email :
          </label>
          <input
            id="email"
            placeholder="Entrer votre email"
            type="email"
            name="email"
            value={step1.step1.email || ""}
            onChange={(e) =>
              dispatch({
                type: "STEP1",
                payload: {
                  ...step1.step1,
                  email: e.target.value,
                },
              })
            }
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>

        {/* Téléphone */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label htmlFor="telephone" className="md:w-1/4 font-medium">
            Téléphone :
          </label>
          <input
            id="telephone"
            placeholder="Entrer votre téléphone"
            type="tel"
            name="telephone"
            value={step1.step1.telephone || ""}
            onChange={(e) =>
              dispatch({
                type: "STEP1",
                payload: {
                  ...step1.step1,
                  telephone: e.target.value,
                },
              })
            }
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-full md:w-1/3 bg-red-500 hover:bg-red-600 py-2 rounded text-white text-sm"
          >
            Suivant
          </button>
        </div>
      </form>
    </div>
  );
}

export default Step1;
