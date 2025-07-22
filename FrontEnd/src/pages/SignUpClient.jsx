import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Logo from "../components/Logo";

const SignUpClient = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

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

    if (!data.nom || !data.prenom || !data.telephone || !data.email) {
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
        localStorage.setItem("token", response.data.token);
        nav("/resend_verification_email");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-3xl rounded bg-white p-6 sm:p-10">
        <div className="text-center mb-6">
          <Link to="/" className="flex justify-center">
            <Logo />
          </Link>
          <p className="mt-2 text-lg font-semibold">Bienvenue</p>
        </div>

        <form className="space-y-6 text-sm" onSubmit={handleRegister}>
          {/* Nom + Prénom */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full">
              <label className="text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                name="nom"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Entrez votre nom"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-gray-700 mb-1">Prénom</label>
              <input
                type="text"
                name="prenom"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Entrez votre prénom"
              />
            </div>
          </div>

          {/* Email + Téléphone */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full">
              <label className="text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Entrez votre email"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-gray-700 mb-1">Téléphone</label>
              <input
                type="text"
                name="telephone"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Entrez votre téléphone"
              />
            </div>
          </div>

          {/* Footer: Link + Submit */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
            <span className="text-sm">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-red-500 hover:underline">
                Se connecter
              </Link>
            </span>

            <button
              type="submit"
              className={`text-sm w-full md:w-1/3 py-3 px-4 bg-red-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 flex items-center justify-center ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-600 cursor-pointer"
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
