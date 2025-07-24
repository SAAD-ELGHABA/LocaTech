import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
function TransactionDetails() {
  const { transactionSlag } = useParams();
  const user = useSelector((state) => state.userReducer.userInfo);
  const [transactionDetails, setTransactionDetails] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const fetchTransactionDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/transaction/${transactionSlag}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        console.log("Transaction details fetched successfully:", response.data);
        setTransactionDetails(response?.data?.transaction);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const nav = useNavigate();
  useEffect(() => {
    if (
      !user ||
      (user && user.role !== "courtier" && user.role !== "admin") ||
      !transactionSlag
    ) {
      nav("/login");
      return;
    }
    fetchTransactionDetails();
  }, []);
  return isLoading ? (
    <div className="min-h-screen animate-pulse my-20 mx-4">
      <div className="h-10 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="grid lg:grid-cols-2 gap-6 border border-gray-300 rounded-lg p-4 mb-2">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen my-26 mx-4">
      <div className="text-base text-gray-700 w-full lg:w-2/3 mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-4">Détails de la transaction</h2>
          <p className="text-sm text-gray-500 mb-2">
            Transaction: <span className="font-bold">{transactionSlag}</span>
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Date de création:{" "}
            <span className="font-bold">
              {new Date(transactionDetails?.created_at).toLocaleDateString(
                "fr-FR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>{" "}
            à{" "}
            <span className="font-bold">
              {new Date(transactionDetails?.created_at).toLocaleTimeString(
                "fr-FR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </span>
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 border border-gray-300 rounded-lg p-4 mb-2">
          <div>
            <h3 className="font-bold mb-2">Courtier</h3>
            <p>
              Nom et prénom :{" "}
              <span className="font-bold">
                {transactionDetails?.affaire?.accord?.courtier?.user?.nom}{" "}
                {transactionDetails?.affaire?.accord?.courtier?.user?.prenom}
              </span>
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Client</h3>
            <p>
              Nom et prénom :{" "}
              <span className="font-bold">
                {transactionDetails?.affaire?.accord?.user?.nom}{" "}
                {transactionDetails?.affaire?.accord?.user?.prenom}
              </span>
            </p>
          </div>
        </div>
        <div className="border-t border-b border-gray-300 py-4 mb-4">
          <p className="text-base">
            Type de transaction :{" "}
            <span className="font-bold uppercase">
              {transactionDetails?.affaire?.accord?.bien?.typeAffaire ===
              "acheter"
                ? "VENTE"
                : "LOCATION"}
            </span>
          </p>
          <p className="text-base">
            Bien :{" "}
            <span className="font-bold">
              {transactionDetails?.affaire?.accord?.bien?.type} à{" "}
              {transactionDetails?.affaire?.accord?.bien?.ville}{" "}
              {transactionDetails?.affaire?.accord?.bien?.quartier}
            </span>
          </p>
        </div>
        <div className="border-t border-b p-4 border-gray-300 mb-2 text-sm">
          <h3 className="text-lg font-bold">Dépendances de la transaction</h3>
          <div className="flex items-center justify-between">
            <span>Commission par MAD</span>
            <span className="text-[#f56565] font-bold text-xs">
              {new Intl.NumberFormat("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                (transactionDetails?.commission_locatech *
                  transactionDetails?.budget_Numbre) /
                  100
              )}{" "}
              MAD
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Impôts par MAD</span>
            <span className="text-[#f56565] font-bold text-xs">
              {new Intl.NumberFormat("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                (transactionDetails?.impôts *
                  transactionDetails?.budget_Numbre) /
                  100
              )}{" "}
              MAD
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Frais de dossier par MAD</span>
            <span className="text-[#f56565] font-bold text-xs">
              {new Intl.NumberFormat("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                (transactionDetails?.frauis_dossier *
                  transactionDetails?.budget_Numbre) /
                  100
              )}{" "}
              MAD
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <h4>
              Total hors de commission{" "}
              <span className="text-xs text-gray-500">
                (prix final + impôts + frauis dossier)
              </span>
            </h4>
            <span className="text-[#f56565] font-bold text-sm">
              {new Intl.NumberFormat("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                (transactionDetails?.frauis_dossier *
                  transactionDetails?.budget_Numbre) /
                  100 +
                  (transactionDetails?.impôts *
                    transactionDetails?.budget_Numbre) /
                    100 +
                  transactionDetails?.budget_Numbre *
                    transactionDetails?.nombre_mois
              )}{" "}
              MAD
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-600 border-t border-gray-300 pt-4 mb-4">
          <h4 className="font-semibold text-xl">Commentaire de l'admin </h4>
          <p>{transactionDetails?.Commentaire}</p>
        </div>
        <div className="text-sm text-gray-600 border-t border-gray-300 pt-4 my-4">
          <h4 className="font-bold mb-2">Conditions & Services</h4>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              Les informations ci-dessus sont confidentielles et destinées
              uniquement aux parties concernées.
            </li>
            <li>
              La transaction est régie par les lois en vigueur et les termes de
              l’accord signé.
            </li>
            <li>
              Les frais de courtage, les taxes et services associés sont à la
              charge des parties selon les clauses du contrat.
            </li>
            <li>
              Aucune information ne sera partagée sans consentement écrit.
            </li>
          </ul>
        </div>

        <div className="text-sm text-gray-600 border-t border-gray-300 pt-4">
          <h4 className="font-bold mb-2">Confidentialité</h4>
          <p>
            Toutes les données personnelles sont traitées conformément à notre
            politique de confidentialité. Les parties s’engagent à respecter la
            discrétion nécessaire.
          </p>
        </div>

        <p className="text-xs text-center text-gray-400 pt-2">
          Merci pour votre confiance.
        </p>
      </div>
    </div>
  );
}

export default TransactionDetails;
