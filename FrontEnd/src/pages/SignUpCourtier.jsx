import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaGlobe, FaIdCard, FaBuilding, FaRegCalendarAlt, FaBriefcase, FaMapMarkerAlt, FaFileAlt, FaSearch } from 'react-icons/fa';
import SignUp from '../assets/login-signup-img.png';

const SignUpCourtier = () => {
  return (
    <div className="flex min-h-screen">
      {/* Formulaire à gauche */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10 bg-white">
        <img src="/logo.png" alt="LocaTech" className="h-12 mb-4" />
        <h2 className="text-2xl font-bold mb-6">Bienvenue</h2>
        <form className="w-full max-w-sm space-y-3">
          {[
            { label: 'Nom_Complet', icon: <FaUser /> },
            { label: 'SEO', icon: <FaSearch /> },
            { label: 'Email', icon: <FaEnvelope /> },
            { label: 'Nom_Agence_Rattachement', icon: <FaBuilding /> },
            { label: 'CIN', icon: <FaIdCard /> },
            { label: 'Tel', icon: <FaPhone /> },
            { label: 'Site_Web', icon: <FaGlobe /> },
            { label: 'Années_expérience', icon: <FaRegCalendarAlt /> },
            { label: 'Type_activité', icon: <FaBriefcase /> },
            { label: 'Zone_activité', icon: <FaMapMarkerAlt /> },
            { label: 'Licence_professionnelle', icon: <FaFileAlt /> },
            { label: 'Brève_présentation', icon: <FaFileAlt /> },
            { label: 'Password', icon: <FaLock />, type: 'password' },
          ].map((field, index) => (
            <div key={index} className="relative">
              <input
                type={field.type || 'text'}
                placeholder={field.label}
                className="w-full border border-gray-300 rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <div className="absolute left-3 top-2.5 text-gray-500">{field.icon}</div>
            </div>
          ))}
          <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
            se connecter
          </button>
        </form>
        <p className="text-center text-sm mt-2">
              J'ai déjà{" "}
              <Link to="/login" className="font-semibold text-red-600 hover:underline">
                Un Compte
              </Link>
        </p>
      </div>

      {/* Image à droite */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={SignUp}
          alt="Riad"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignUpCourtier;
