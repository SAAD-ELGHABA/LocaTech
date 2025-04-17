// src/pages/Merci.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Merci = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-red-500 mb-12">Merci !</h1>
      <p className="text-gray-700 text-center max-w-md mb-10">
        Nous vous remercions de votre demande. Un membre de notre équipe dévouée vous contactera sous peu.
      </p>
      <button
        onClick={() => navigate('/Apropos')}
        className="bg-black text-white px-6 py-2  hover:bg-gray-800 transition cursor-pointer"
      >
        Retourner
      </button>
    </div>
  );
};

export default Merci;
