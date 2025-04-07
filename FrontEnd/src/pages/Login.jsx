import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import asideimg from "../assets/login-signup-img.png";
import { Link } from "react-router-dom";
import GoogleLanding from "../components/GoogleLanding";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center  bg-white">
        <div className="max-w-md w-full space-y-6">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-500">
              <span className="text-green-500">Loca</span>Tech
            </h1>
            <p className="mt-2 text-lg font-semibold">Bienvenue</p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Adresse email
              </label>
              <input
                type="email"
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
                  type="password"
                  placeholder="Veuillez entrer votre mot de passe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                  <AiOutlineEye size={20} />{" "}
                  {/* Using the react-icons eye icon */}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Se connecter
            </button>
          </form>

          {/* Links */}
          <div className="text-center text-sm text-gray-600">
            <a href="#" className="hover:underline">
              Mot de passe oublié !
            </a>
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
            © LocaTech - Les{" "}
            <a href="#" className="underline">
              Conditions générales
            </a>{" "}
            et{" "}
            <a href="#" className="underline">
              mentions légales
            </a>{" "}
            et la{" "}
            <a href="#" className="underline">
              Politique de confidentialité
            </a>{" "}
            de Digital
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
