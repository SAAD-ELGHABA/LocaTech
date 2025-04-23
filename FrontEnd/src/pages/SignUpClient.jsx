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
    <div className="flex h-screen items-center">
      <div className="w-2/3 mx-auto rounded shadow bg-white p-8">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Link to={"/"} className="flex items-center">
            <Logo/>
            </Link>
          </div>
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
              <label className="w-24 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                placeholder="Enter email"
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
