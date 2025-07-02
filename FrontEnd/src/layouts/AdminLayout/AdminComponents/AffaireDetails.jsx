import axios from "axios";
import { Building, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function AffaireDetails() {
  const { courtierId, clientId, accordId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [affaireDetails, setAffaireDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("courtier");

  const fetchAffaireDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/get-affaire/${courtierId}/${clientId}/${accordId}`
      );
      setAffaireDetails(response.data.affaire);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAffaireDetails();
  }, []);

  const tabs = ["courtier", "client", "assistant", "bien"];

  return isLoading ? (
    <div className="h-screen grid grid-cols-1 animate-pulse gap-4 p-4">
      <div className="bg-gray-300 h-16 w-1/4 rounded"></div>
      <div className="bg-gray-300 h-96 w-full rounded"></div>
    </div>
  ) : (
    <div className="min-h-screen p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Détails de l'affaire</h1>
      </div>

      <div className="flex space-x-4 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 ${
              activeTab === tab
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        {activeTab === "courtier" && (
          <div className="flex space-x-4">
            <img
              src={affaireDetails?.accord?.courtier?.user?.image}
              alt="courtier-img"
              className="w-40 h-40 rounded-full"
            />
            <div className="grid lg:grid-cols-2">
              <div>
                <h2 className="text-xl font-bold mb-2">Courtier Information</h2>
                <div>
                  {affaireDetails?.accord?.courtier?.user?.nom}{" "}
                  {affaireDetails?.accord?.courtier?.user?.prenom} (courtier)
                </div>
                <div>{affaireDetails?.accord?.courtier?.user?.email}</div>
                <div>{affaireDetails?.accord?.courtier?.user?.telephone}</div>
                <div>
                  {affaireDetails?.accord?.courtier?.Années_expérience} ans
                </div>
                <div>{affaireDetails?.accord?.courtier?.Type_activité}</div>
                <div>{affaireDetails?.accord?.courtier?.SEO}</div>
                <div>
                  {affaireDetails?.accord?.courtier?.Licence_professionnelle}
                </div>
                <div>
                  {affaireDetails?.accord?.courtier?.Brève_présentation}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Agence Information</h3>
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>
                    {affaireDetails?.accord?.courtier?.agence?.agence}
                  </span>
                </div>
                <div>{affaireDetails?.accord?.courtier?.agence?.email}</div>
                <div>{affaireDetails?.accord?.courtier?.agence?.telephone}</div>
                <div>{affaireDetails?.accord?.courtier?.agence?.Adresse}</div>
                <div>
                  Niveau d'évaluation:{" "}
                  {
                    affaireDetails?.accord?.courtier?.agence?.evaluation
                      ?.evaluation
                  }
                </div>
                <div>
                  {affaireDetails?.accord?.courtier?.agence?.Type_activité}
                </div>
                <div>
                  {affaireDetails?.accord?.courtier?.agence?.Types_biens}
                </div>
                <div>
                  {affaireDetails?.accord?.courtier?.agence?.Zone_activité}
                </div>
                <div>{affaireDetails?.accord?.courtier?.agence?.siteWeb}</div>
                <div>{affaireDetails?.accord?.courtier?.agence?.SEO}</div>
                <div>
                  {
                    affaireDetails?.accord?.courtier?.agence
                      ?.Lien_Google_Reviews
                  }
                </div>
                <div>
                  Numéro ICE :{" "}
                  {affaireDetails?.accord?.courtier?.agence?.Numéro_ICE}
                </div>
                <div>RC : {affaireDetails?.accord?.courtier?.agence?.RC}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "client" && (
          <div className="flex space-x-4">
            <img
              src={affaireDetails?.accord?.user?.image}
              alt="client-img"
              className="w-40 h-40 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold mb-2">Client Information</h2>
              <div>
                {affaireDetails?.accord?.user?.nom}{" "}
                {affaireDetails?.accord?.user?.prenom} (Client)
              </div>
              <div>{affaireDetails?.accord?.user?.email}</div>
              <div>{affaireDetails?.accord?.user?.telephone}</div>
              <div>{affaireDetails?.accord?.user?.adresse}</div>
            </div>
          </div>
        )}

        {activeTab === "assistant" && (
          <div className="flex space-x-4">
            <img
              src={affaireDetails?.assistant?.image}
              alt="assistant-img"
              className="w-40 h-40 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold mb-2">Assistant Information</h2>
              <div>
                {affaireDetails?.assistant?.nom}{" "}
                {affaireDetails?.assistant?.prenom} (Assistant)
              </div>
              <div>{affaireDetails?.assistant?.email}</div>
              <div>{affaireDetails?.assistant?.telephone}</div>
            </div>
          </div>
        )}

        {activeTab === "bien" && (
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-2">Bien Information</h2>
              <Link
                to={`/bien/${affaireDetails?.accord?.bien?.ville}/${affaireDetails?.accord?.bien?.slag}`}
                className="flex items-center text-red-500 hover:text-red-600 space-x-1"
              >
                <span>Voir l'annonce</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
            <div>ID : {affaireDetails?.accord?.bien?.id}</div>
            <div>Ville : {affaireDetails?.accord?.bien?.ville}</div>
            <div>
              Quartier :{" "}
              {affaireDetails?.accord?.bien?.quartier
                ? affaireDetails?.accord?.bien?.quartier
                : "non mentionné"}
            </div>
            <div>
              Prix initiale :{" "}
              <span className="text-[#f56565] font-bold">
                {new Intl.NumberFormat("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(affaireDetails?.accord?.bien?.budget)}{" "}
                MAD
              </span>
            </div>
            <div>Type : {affaireDetails?.accord?.bien?.type}</div>
            <div>
              Type d'affaire :{" "}
              {affaireDetails?.accord?.bien?.typeAffaire === "acheter"
                ? "Pour achat"
                : "Pour location"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AffaireDetails;
