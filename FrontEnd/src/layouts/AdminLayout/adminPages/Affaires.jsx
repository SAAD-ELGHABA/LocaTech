import axios from "axios";
import {
  BadgeCheck,
  BadgePercent,
  Barcode,
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
  }, []);
  return isLoading ? (
    <div className="h-screen grid grid-cols-1 animate-pulse">
      <div className="bg-gray-300 h-16 w-1/4 rounded"></div>
      <div className="bg-gray-300 h-60 w-full rounded"></div>
      <div className="bg-gray-300 h-60 w-full rounded"></div>
    </div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : affaires.length > 0 ? (
    <div className="min-h-screen p-4">
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          <span>Affaires</span>
          <BadgePercent />
        </h2>
        <p className="text-gray-600">Liste de toutes les affaires</p>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {affaires.map((affaire) => (
          <div key={affaire.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-2 flex items-center space-x-2 justify-end">
              <span>Vérifié par </span>
              <span className="font-semibold">
                {affaire?.assistant?.nom} {affaire?.assistant?.prenom}
                {" (assistant) "}
              </span>
              <span className="text-xs text-gray-400">
                {affaire?.assistant?.email}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <div>
                <Link
                  to={`/bien/${affaire?.accord?.bien?.ville}/${affaire?.accord?.bien?.slag}`}
                >
                  <img
                    src={affaire?.accord?.bien?.images[0]}
                    alt="img-bien"
                    className=" object-cover"
                  />
                </Link>
              </div>
              <div className="flex flex-col space-y-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <img
                      src={affaire?.accord?.courtier?.user?.image}
                      alt="client-image"
                      className="h-8 w-8 rounded-full"
                    />
                    <BadgeCheck className="h-4 text-white fill-blue-600 ml-1 absolute -top-2 -right-3" />
                  </div>
                  <span>
                    <h6>
                      {affaire?.accord?.courtier?.user?.nom}{" "}
                      {affaire?.accord?.courtier?.user?.prenom}
                      {" (courtier)"}
                    </h6>
                    <p className="text-xs">
                      {affaire?.accord?.courtier?.user?.email}
                    </p>
                    <p className="text-xs">
                      {affaire?.accord?.courtier?.user?.telephone}
                    </p>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src={affaire?.accord?.user?.image}
                    alt="client-image"
                    className="h-8 w-8 rounded-full"
                  />
                  <span>
                    <h6>
                      {affaire?.accord?.user?.nom}{" "}
                      {affaire?.accord?.user?.prenom}
                    </h6>
                    <p className="text-xs">{affaire?.accord?.user?.email}</p>
                    <p className="text-xs">
                      {affaire?.accord?.user?.telephone}
                    </p>
                  </span>
                </div>
              </div>
              <div
                className={`py-2 px-4 flex items-center justify-center space-x-2
                      ${
                        affaire?.accord?.status === "accepted" ||
                        affaire?.accord?.status === "validé"
                          ? "text-green-500"
                          : affaire?.accord?.status === "rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }
                      `}
              >
                <span>
                  {affaire?.accord?.status === "accepted"
                    ? "accepté"
                    : affaire?.accord?.status === "rejected"
                    ? "rejeté"
                    : affaire?.accord?.status}
                </span>
                <TrendingUp
                  className={`${
                    affaire?.accord?.status === "accepted" ||
                    affaire?.accord?.status === "validé"
                      ? "rotate-0"
                      : affaire?.accord?.status === "rejected"
                      ? "rotate-180"
                      : "hidden"
                  }`}
                />
              </div>
              <div className="flex flex-col items-center justify-end space-y-2 text-xs">
                <Link
                  to={`/affaire/${affaire?.accord?.courtier?.id}/${affaire?.accord?.user?.id}/${affaire?.accord?.id}`}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center space-x-2 min-w-[120px] cursor-pointer"
                >
                  <Barcode className="h-4 w-4" />
                  <span>Voir Détails</span>
                </Link>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 min-w-[120px] cursor-pointer"
                  onClick={() => setSelectedAffaire(affaire?.id)}
                >
                  <ListCheck className="h-4 w-4" />
                  <span>Valider</span>
                </button>
                <button className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-2 min-w-[120px] justify-center cursor-pointer">
                  <Trash className="h-4 w-4" />
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
    <div>No affaires found</div>
  );
}

export default Affaires;
