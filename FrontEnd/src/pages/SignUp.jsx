import React from "react";
import { Link } from "react-router-dom"; // Si vous utilisez React Router
import { FaGoogle } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { BiBriefcase } from "react-icons/bi";
import Logo from "../components/Logo"; // Assurez-vous que le chemin est correct
import asideimg from "../assets/login-signup-img.png";
import GoogleLanding from "../components/GoogleLanding";
function SignUp() {
  return (
    <div className="bg-white min-h-screen w-full flex flex-col md:flex-row justify-center">
      <div className="bg-white w-[95%] mx-auto md:w-1/3 px-6 md:px-12 py-12 md:py-32">
        <div className="w-full flex flex-col justify-center mx-auto max-w-md">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Link to={"/"} className="flex items-center">
                <Logo />
              </Link>
            </div>
            <p className="text-lg font-semibold">Bienvenue</p>
          </div>

          <h1 className="w-full text-center text-xl font-bold text-gray-800 mb-6 mt-2">
            Créer un compte
          </h1>

          <div className="flex justify-center mb-4">
            <GoogleLanding />
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm text-gray-500">
              <p className="bg-white px-2">OU</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link to="/client-signup" className="block">
              <div className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-between">
                <div className="flex items-center">
                  <BsPersonFill className="mr-3 text-gray-500" />
                  <div>
                    <h3 className="font-semibold">Client</h3>
                    <p className="text-sm text-gray-500">
                      Acheter et louer mes biens
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </Link>

            <Link to="/courtier-signup" className="block">
              <div className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-between">
                <div className="flex items-center">
                  <BiBriefcase className="mr-3 text-gray-500" />
                  <div>
                    <h3 className="font-semibold">Courtier</h3>
                    <p className="text-sm text-gray-500">Déposer des biens</p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Right image aside (hidden on small screens) */}
      <div
        className="hidden md:block md:w-2/3 bg-cover bg-center"
        style={{
          backgroundImage: "url(accueil 1.png)", // Replace with actual path
        }}
      >
        <img
          src={asideimg}
          alt="aside image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default SignUp;
