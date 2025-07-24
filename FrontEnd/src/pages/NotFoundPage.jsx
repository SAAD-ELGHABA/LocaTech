import React from "react";
import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-7xl font-bold text-red-600">404</h1>
      <p className="text-2xl mt-4 font-semibold text-gray-800">Page non trouvée</p>
      <p className="text-gray-500 mt-2">La page que vous recherchez n'existe pas ou a été déplacée.</p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md"
      >
        <ArrowLeftCircle className="w-5 h-5" />
        Retour à l'accueil
      </button>
    </div>
  );
}

export default NotFound;
