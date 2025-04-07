import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaLock,
} from "react-icons/fa";

const SignUpClient = () => {
  return (
    <div className="flex h-screen">
      {/* Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <img src="/logo.png" alt="LocaTech" className="mx-auto h-12" />
            <h1 className="text-2xl font-semibold">Bienvenue</h1>
          </div>
          <form className="space-y-4">
            <InputField placeholder="Nom" icon={<FaUser />} />
            <InputField placeholder="Prenom" icon={<FaUser />} />
            <InputField placeholder="Email" icon={<FaEnvelope />} />
            <InputField placeholder="Age" icon={<FaCalendar />} />
            <InputField placeholder="CIN" icon={<FaIdCard />} />
            <InputField placeholder="Tel" icon={<FaPhone />} />
            <InputField placeholder="Adresse" icon={<FaMapMarkerAlt />} />
            <InputField placeholder="Ville" icon={<FaCity />} />
            <InputField placeholder="Password" type="password" icon={<FaLock />} />

            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition">
              se connecter
            </button>

            <p className="text-center text-sm mt-2">
              J'ai déjà{" "}
              <Link to="/login" className="font-semibold text-red-600 hover:underline">
                Un Compte
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Image Side */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src="/assets/riad.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
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
      className="w-full border rounded-md py-2 px-10 focus:outline-none focus:ring-2 focus:ring-red-400"
    />
    <span className="absolute left-3 top-2.5 text-gray-400 text-lg">
      {icon}
    </span>
  </div>
);

export default SignUpClient;
