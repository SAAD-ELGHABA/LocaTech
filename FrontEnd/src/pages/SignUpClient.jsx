import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const SignUpClient = () => {
  const [villes, setVilles] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getVilles = async () => {
      try {
        const response = await axios.get("/api/ville");
        if (response.status >= 200) {
          setVilles(response.data.villes);
        } else {
          toast.error("Error fetching cities");
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    getVilles();
  }, []);

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhoneNumber = (phone) => {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
    };

    if (data.age <= 0) {
      toast.error("L'âge doit être supérieur à 0 !");
      return;
    }

    if (!validateEmail(data.email)) {
      toast.error("Veuillez entrer une adresse email valide !");
      return;
    }

    if (!validatePhoneNumber(data.telephone)) {
      toast.error(
        "Veuillez entrer un numéro de téléphone valide (10 chiffres) !"
      );
      return;
    }

    if (data.password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères !");
      return;
    }
    if (
      !data.nom ||
      !data.prenom ||
      !data.password ||
      !data.age ||
      !data.email ||
      !data.ville ||
      !data.adresse ||
      !data.telephone ||
      !data.CIN
    ) {
      toast.error("Veuillez remplir tous les champs !");
      return;
    }
    try {
      const response = await axios.post("/api/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 200) {
        toast.success(response.data.message);
        console.log(response);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-screen items-center">
      <div className="w-2/3 mx-auto rounded shadow bg-white p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">
            <span className="text-green-500">Loca</span>Tech
          </h1>
          <p className="mt-2 text-lg font-semibold">Bienvenue</p>
        </div>
        <form className="p-6 text-sm space-y-4" onSubmit={handleRegister}>
          <div className="flex gap-6">
            <div className="flex items-center w-1/2">
              <label className="w-24 text-gray-700">Nom</label>
              <input
                type="text"
                name="nom"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Enter nom"
              />
            </div>
            <div className="flex items-center w-1/2">
              <label className="w-24 text-gray-700">Prenom</label>
              <input
                type="text"
                name="prenom"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Enter prenom"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center w-1/2">
              <label className="w-24 text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Enter age"
              />
            </div>
            <div className="flex items-center w-1/2">
              <label className="w-24 text-gray-700">CIN</label>
              <input
                type="text"
                name="CIN"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Enter CIN"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center w-1/2">
              <label className="w-24 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Enter email"
              />
            </div>
            <div className="flex items-center w-1/2">
              <label className="w-24 text-gray-700">Ville</label>
              <select
                name="ville"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
              >
                <option value="">Select ville</option>
                {villes.length >= 0 &&
                  villes.map((ville) => (
                    <option key={ville.id} value={ville.id}>
                      {ville.nom}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center w-1/2">
              <label className="w-24 text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Enter password"
              />
            </div>
            <div className="flex items-center w-1/2">
              <label className="w-24 text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Confirm password"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center w-1/2">
              <label className="w-24 text-gray-700">Adresse</label>
              <input
                type="text"
                name="adresse"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Enter adresse"
              />
            </div>
            <div className="flex items-center w-1/2">
              <label className="w-24 text-gray-700">Telephone</label>
              <input
                type="text"
                name="telephone"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Enter telephone"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center w-1/2">
              <label className="w-24 text-gray-700">Sexe</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sexe"
                    value="male"
                    className="mr-2"
                    defaultChecked
                  />
                  Homme
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sexe"
                    value="female"
                    className="mr-2"
                  />
                  Femme
                </label>
              </div>
            </div>
          </div>
          <div className="text-right pt-4 flex justify-between items-center">
            <span className="space-x-2 flex">
              <p>Already have an account?</p>
              <Link
                to="/login"
                className="text-sm hover:underline text-green-500"
              >
                Log in
              </Link>
            </span>
            <button
              type="submit"
              className={` text-sm w-1/3 py-3 px-4 bg-red-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600 cursor-pointer"
              }`}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : (
                "S'inscrire"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// InputField component
const InputField = ({ placeholder, icon, type = "text" }) => (
  <div className="relative">
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border rounded-md py-2 px-10 focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-none"
    />
    <span className="absolute left-3 top-3 text-gray-400 text-sm">{icon}</span>
  </div>
);

export default SignUpClient;
