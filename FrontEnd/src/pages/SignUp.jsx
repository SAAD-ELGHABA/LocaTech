import React from "react";
import { Link } from "react-router-dom"; // Si vous utilisez React Router
import { FaGoogle } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { BiBriefcase } from "react-icons/bi";
import logo from "../assets/Location.png"; // Assurez-vous que le chemin est correct
import asideimg from "../assets/login-signup-img.png"; // Assurez-vous que le chemin est correct
import GoogleLanding from "../components/GoogleLanding"; // Assurez-vous que le chemin est correct
function SignUp() {
  return (
    <div className="bg-gray-900 min-h-screen w-full flex justify-center">
      <div className="bg-white w-1/3">
        <div className="w-full md:w-2/3 flex mt-32 justify-center flex-col mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-500">
              <span className="text-green-500">Loca</span>Tech
            </h1>
            <p className="mt-2 text-lg font-semibold">Bienvenue</p>
          </div>
          <h1 className="block w-full text-center text-xl font-bold text-gray-800 mb-6">
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
              OU
            </div>
          </div>

          <div className="space-y-2">
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
      <div
        className="hidden md:block w-2/3 bg-cover bg-center"
        style={{
          backgroundImage: "url(accueil 1.png)", // Replace with actual path
        }}
      >
        <img src={asideimg} alt="aside image" className="w-full"/>
      </div>
    </div>
  );
}

export default SignUp;
