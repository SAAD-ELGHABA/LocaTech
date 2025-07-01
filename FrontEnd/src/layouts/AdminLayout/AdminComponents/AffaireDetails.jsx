import axios from "axios";
import { Building, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
function AffaireDetails() {
  const { courtierId, clientId, accordId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [affaireDetails, setAffaireDetails] = useState(null);
  const fetchAffaireDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/get-affaire/${courtierId}/${clientId}/${accordId}`
      );
      console.log(response.data);
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
  return isLoading ? (
    <div>
      <div className="h-screen grid grid-cols-1 animate-pulse">
        <div className="bg-gray-300 h-16 w-1/4 rounded"></div>
        <div className="bg-gray-300 h-60 w-full rounded"></div>
        <div className="bg-gray-300 h-60 w-full rounded"></div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen p-4 grid gap-4">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold">Voir les details de l'annonce</span>
        <Link
          className="flex items-center space-x-1 cursor-pointer text-red-500 px-4 py-2 rounded hover:text-red-600 transition-colors"
          to={`/bien/${affaireDetails?.accord?.bien?.ville}/${affaireDetails?.accord?.bien?.slag}`}
        >
          <span>Voir</span>
          <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 flex items-start space-x-4">
        <div>
          <img
            src={affaireDetails?.assistant?.image}
            alt="assistant-img"
            className="w-40 h-40 rounded-full"
          />
        </div>
        <div>
          <div>
            <h1 className="text-xl font-bold mb-2">Assistant Information</h1>
          </div>
          <div>
            {affaireDetails?.assistant?.nom} {affaireDetails?.assistant?.prenom}{" "}
            (assistant)
          </div>
          <div>{affaireDetails?.assistant?.email} </div>
          <div>{affaireDetails?.assistant?.telephone} </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 flex items-start space-x-4">
        <div>
          <img
            src={affaireDetails?.accord?.courtier?.user?.image}
            alt="courtier-img"
            className="w-40 h-40 rounded-full"
          />
        </div>
        <div>
          <div className="text-xl font-bold mb-2">
            <h1>Courtier Information</h1>
          </div>
          <div>
            {affaireDetails?.accord?.courtier?.user?.nom}{" "}
            {affaireDetails?.accord?.courtier?.user?.prenom} (courtier)
          </div>
          <div>{affaireDetails?.accord?.courtier?.user?.email} </div>
          <div>{affaireDetails?.accord?.courtier?.user?.telephone} </div>
          <div>
            {affaireDetails?.accord?.courtier?.Années_expérience} {" ans"}
          </div>
          <div>{affaireDetails?.accord?.courtier?.Type_activité} </div>
          <div>{affaireDetails?.accord?.courtier?.SEO} </div>
          <div>
            {affaireDetails?.accord?.courtier?.Licence_professionnelle}{" "}
          </div>
          <div>{affaireDetails?.accord?.courtier?.Brève_présentation} </div>
        </div>
        <div>
          <div className="text-xl font-bold mb-2">
            <h1>Agence Information</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>{affaireDetails?.accord?.courtier?.agence?.agence} </span>
          </div>
          <div>{affaireDetails?.accord?.courtier?.agence?.email} </div>
          <div>{affaireDetails?.accord?.courtier?.agence?.telephone} </div>
          <div>{affaireDetails?.accord?.courtier?.agence?.Adresse} </div>
          <div>
            Niveau d'évaluation:{" "}
            {affaireDetails?.accord?.courtier?.agence?.evaluation?.evaluation}{" "}
          </div>
          <div>{affaireDetails?.accord?.courtier?.agence?.Type_activité} </div>
          <div>{affaireDetails?.accord?.courtier?.agence?.Types_biens} </div>
          <div>{affaireDetails?.accord?.courtier?.agence?.Zone_activité} </div>
          <div>{affaireDetails?.accord?.courtier?.agence?.siteWeb} </div>
          <div>{affaireDetails?.accord?.courtier?.agence?.SEO} </div>
          <div>
            {affaireDetails?.accord?.courtier?.agence?.Lien_Google_Reviews}{" "}
          </div>
          <div>Numéro ICE : {" "} {affaireDetails?.accord?.courtier?.agence?.Numéro_ICE} </div>
          <div> RC : {" "} {affaireDetails?.accord?.courtier?.agence?.RC} </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 flex items-start space-x-4">
        <div>
          <img
            src={affaireDetails?.accord?.user?.image}
            alt="client-img"
            className="w-40 h-40 rounded-full"
          />
        </div>
        <div>
          <div>
            <h1 className="text-xl font-bold mb-2">Client Information</h1>
          </div>
          <div>
            {affaireDetails?.accord?.user?.nom} {affaireDetails?.accord?.user?.nom}{" "}
            (Client)
          </div>
          <div>{affaireDetails?.accord?.user?.email} </div>
          <div>{affaireDetails?.accord?.user?.telephone} </div>
          <div>{affaireDetails?.accord?.user?.adresse} </div>
        </div>
      </div>
    </div>
  );
}

export default AffaireDetails;
