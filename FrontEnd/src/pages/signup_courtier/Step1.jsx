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

    <div className="mt-5">
      <form
        onSubmit={handleStep1}
        className="w-2/3 mx-auto flex justify-center flex-col  space-y-4"
      >
        <p className="text-center font-medium">Informations personneles </p>

        <div className="flex items-center space-x-2 justify-center">
          <label htmlFor="" className="w-1/6">
            Nom :{" "}
          </label>
          <input
            placeholder="entrer votre nom"
            type="text"
            name="nom"
            id=""
            value={step1.step1.nom && step1.step1.nom}
            onChange={(e) => {
              dispatch({
                type: "STEP1",
                payload: {
                  ...step1.step1,
                  nom: e.target.value,
                },
              });
            }}
            className="w-3/6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>
        <div className="flex items-center space-x-2 justify-center">
          <label htmlFor="" className="w-1/6">
            Prenom :{" "}
          </label>
          <input
            placeholder="entrer votre prenom"
            type="text"
            name="prenom"
            id=""
            value={step1.step1.prenom && step1.step1.prenom}
            onChange={(e) => {
              dispatch({
                type: "STEP1",
                payload: {
                  ...step1.step1,
                  prenom: e.target.value,
                },
              });
            }}
            className="w-3/6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>
        <div className="flex items-center space-x-2 justify-center">
          <label htmlFor="" className="w-1/6">
            Email :{" "}
          </label>
          <input
            placeholder="entrer votre email"
            type="text"
            name="email"
            id=""
            value={step1.step1.email && step1.step1.email}
            onChange={(e) => {
              dispatch({
                type: "STEP1",
                payload: {
                  ...step1.step1,
                  email: e.target.value,
                },
              });
            }}
            className="w-3/6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>
        <div className="flex items-center space-x-2 justify-center">
          <label htmlFor="" className="w-1/6">
            Telephone :{" "}
          </label>
          <input
            placeholder="entrer votre telephone"
            type="number"
            name="telephone"
            id=""
            value={step1.step1.telephone && step1.step1.telephone}
            onChange={(e) => {
              dispatch({
                type: "STEP1",
                payload: {
                  ...step1.step1,
                  telephone: e.target.value,
                },
              });
            }}
            className="w-3/6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>
        <div className="flex justify-center my-4">
          <button className="w-1/3 mx-auto bg-red-500 hover:bg-red-600 py-2 rounded text-white text-sm cursor-pointer">
            Suivant
          </button>
        </div>
      </form>
    </div>
  );
}

export default Step1;
