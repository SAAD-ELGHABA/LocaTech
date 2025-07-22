import axios from "axios";
import {
  BadgeCheck,
  BadgePercent,
  Barcode,
  CircleOff,
  ListCheck,
  Trash,
  TrendingUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AffaireDetails from "../AdminComponents/AffaireDetails";
import ValiderAffaire from "../AdminComponents/ValiderAffaire";
function Affaires() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [affaires, setAffaires] = useState([]);
  const [selectedAffaire, setSelectedAffaire] = useState(null);
  const fetchAffaires = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/get-affaires", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAffaires(response.data?.affaires || []);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch affaires");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAffaires();
  }, [selectedAffaire]);
  return isLoading ? (
    <div className="h-screen grid grid-cols-1 animate-pulse">
      <div className="bg-gray-300 h-16 w-1/4 rounded"></div>
      <div className="bg-gray-300 h-60 w-full rounded"></div>
      <div className="bg-gray-300 h-60 w-full rounded"></div>
    </div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : affaires.length > 0 ? (
    <div className="min-h-screen p-4 bg-gray-50">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
          <span>Affaires</span>
          <BadgePercent className="h-6 w-6 text-red-600" />
        </h2>
        <p className="text-gray-600">Liste de toutes les affaires</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-6">
        {affaires.map((affaire) => (
          <div
            key={affaire.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
          >
            <div className="text-sm text-gray-500 flex lg:flex-row flex-col lg:items-center justify-end space-x-2">
              <span>Vérifié par</span>
              <span className="font-semibold truncate lg:max-w-xs lg:text-right">
                {affaire?.assistant?.nom} {affaire?.assistant?.prenom}{" "}
                (assistant)
              </span>
              <span className="text-xs text-gray-400 truncate lg:max-w-xs lg:text-right">
                {affaire?.assistant?.email}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <Link
                to={`/bien/${affaire?.accord?.bien?.ville}/${affaire?.accord?.bien?.slag}`}
                className="block rounded overflow-hidden shadow-sm"
              >
                <img
                  src={affaire?.accord?.bien?.images[0]}
                  alt="Bien"
                  className="w-full h-48 object-cover"
                />
              </Link>

              <div className="flex flex-col space-y-6 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={affaire?.accord?.courtier?.user?.image}
                      alt="Courtier"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <BadgeCheck className="h-5 w-5 text-blue-600 absolute -top-1 -right-1" />
                  </div>
                  <div className="truncate">
                    <h6 className="font-semibold truncate">
                      {affaire?.accord?.courtier?.user?.nom}{" "}
                      {affaire?.accord?.courtier?.user?.prenom} (courtier)
                    </h6>
                    <p className="text-xs truncate">
                      {affaire?.accord?.courtier?.user?.email}
                    </p>
                    <p className="text-xs truncate">
                      {affaire?.accord?.courtier?.user?.telephone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <img
                    src={affaire?.accord?.user?.image}
                    alt="Client"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="truncate">
                    <h6 className="font-semibold truncate">
                      {affaire?.accord?.user?.nom}{" "}
                      {affaire?.accord?.user?.prenom}
                    </h6>
                    <p className="text-xs truncate">
                      {affaire?.accord?.user?.email}
                    </p>
                    <p className="text-xs truncate">
                      {affaire?.accord?.user?.telephone}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`py-2 px-4 flex items-center justify-center space-x-2 text-lg font-semibold
              ${
                affaire?.accord?.status === "accepted" ||
                affaire?.accord?.status === "validé"
                  ? "text-green-600"
                  : affaire?.accord?.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
              >
                <span className="capitalize">
                  {affaire?.accord?.status === "accepted"
                    ? "accepté"
                    : affaire?.accord?.status === "rejected"
                    ? "rejeté"
                    : affaire?.accord?.status}
                </span>
                <TrendingUp
                  className={`h-6 w-6 transition-transform duration-300 ${
                    affaire?.accord?.status === "accepted" ||
                    affaire?.accord?.status === "validé"
                      ? "rotate-0"
                      : affaire?.accord?.status === "rejected"
                      ? "rotate-180"
                      : "hidden"
                  }`}
                />
              </div>

              <div className="flex flex-col items-center justify-end space-y-3 text-xs">
                <Link
                  to={`/admin/affaire/${affaire?.accord?.courtier?.id}/${affaire?.accord?.user?.id}/${affaire?.accord?.id}`}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center space-x-2 w-full lg:min-w-[120px] justify-center"
                >
                  <Barcode className="h-5 w-5" />
                  <span>Voir Détails</span>
                </Link>

                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 w-full lg:min-w-[120px]"
                  onClick={() => setSelectedAffaire(affaire?.id)}
                >
                  <ListCheck className="h-5 w-5" />
                  <span>Valider</span>
                </button>

                <button
                  className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-2 min-w-[120px] justify-center"
                  onClick={() => {
                    /* your delete handler */
                  }}
                >
                  <Trash className="h-5 w-5" />
                  <span>Supprimer</span>
                </button>
              </div>
            </div>

            {selectedAffaire === affaire.id && (
              <ValiderAffaire
                affaireId={selectedAffaire}
                setSelectedAffaire={setSelectedAffaire}
                courtierId={affaire?.accord?.courtier?.id}
                clientId={affaire?.accord?.user?.id}
                accordId={affaire?.accord?.id}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <CircleOff className="h-20 w-20" />
      <h3>No affaires found</h3>
    </div>
  );
}

export default Affaires;
