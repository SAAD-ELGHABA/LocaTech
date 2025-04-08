import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import asideimg from "../assets/login-signup-img.png";
import { Link } from "react-router-dom";
import GoogleLanding from "../components/GoogleLanding";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const LoginPage = () => {
  const [showpwtd, setShowPwt] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.email || !data.password) {
      toast.error("Veuillez remplir tous les champs !");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/login", data, {
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
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex ">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2  flex mt-32 justify-center  ">
        <div className="max-w-md w-full space-y-2">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-500">
              <span className="text-green-500">Loca</span>Tech
            </h1>
            <p className="mt-2 text-lg font-semibold">Bienvenue</p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium mb-1">
                Adresse email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Veuillez entrer votre adresse email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showpwtd ? "text" : "password"}
                  placeholder="Veuillez entrer votre mot de passe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPwt(!showpwtd)}
                >
                  {showpwtd ? (
                    <AiOutlineEye className="text-gray-500" />
                  ) : (
                    <AiOutlineEye className="text-gray-300" />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className={`text-sm w-full py-3 px-4  text-white font-semibold rounded-lg  focus:outline-none focus:ring-2  transition duration-200 flex items-center justify-center ${
                isloading
                  ? "cursor-not-allowed bg-red-300"
                  : "cursor-pointer bg-red-500 hover:bg-red-600 focus:ring-red-400"
              }`}
            >
              {isloading ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : (
                "Connexion"
              )}
            </button>
          </form>

          {/* Links */}
          <div className="text-center text-sm text-gray-600">
            <Link to={"/forgot-password"} className="hover:underline">
              Mot de passe oublié !
            </Link>
          </div>

          <div className="text-center text-sm text-gray-600">
            Vous n’avez pas encore de compte ?{" "}
            <Link to={"/register"} className="font-semibold hover:underline">
              Créer un compte
            </Link>
          </div>

          {/* Separator */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-sm text-gray-500">ou</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Button */}
          <div className="w-full flex items-center justify-center">
            <GoogleLanding />
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-gray-500 mt-6">
            © LocaTech - Les Conditions générales et mentions légales et la
            Politique de confidentialité  de Digital
          </p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url(accueil 1.png)", // Replace with actual path
        }}
      >
        <img src={asideimg} alt="aside image" />
      </div>
    </div>
  );
};

export default LoginPage;
