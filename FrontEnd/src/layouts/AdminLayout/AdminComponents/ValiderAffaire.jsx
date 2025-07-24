import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { CaseUpper, LoaderCircle, TicketCheck, TicketX } from "lucide-react";
import writtenNumber from "written-number";
import Achat from "./validation Affaire/Achat";
import Louer from "./validation Affaire/Louer";
import { toast } from "sonner";
import { sendNotification } from "../../../functions/NotificationSender";
import { useSelector } from "react-redux";
writtenNumber.defaults.lang = "fr";

function ValiderAffaire({
  affaireId,
  setSelectedAffaire,
  courtierId,
  clientId,
  accordId,
}) {
  const modalRef = useRef(null);
  const [height, setHeight] = useState(600);
  const [isResizing, setIsResizing] = useState(false);
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

  const [valideAffaireData, setValideAffaireData] = useState({
    bienId: affaireDetails?.accord?.bien?.id,
    affaire_id: affaireDetails?.id,
    budget_Numbre: affaireDetails?.accord?.bien?.budget,
    budget_Lettre: null,
    Commentaire: "",
    commission_locatech: 3,
    impôts: 1.5,
    frauis_dossier: 1.1,
    nombre_mois: 1,
  });

  useEffect(() => {
    if (affaireDetails) {
      const budget = affaireDetails.accord?.bien?.budget || 0;

      let budgetLettre = writtenNumber(budget);
      budgetLettre =
        budgetLettre.charAt(0).toUpperCase() + budgetLettre.slice(1);

      setValideAffaireData((prev) => ({
        ...prev,
        bienId: affaireDetails.accord?.bien?.id,
        affaire_id: affaireDetails.id,
        budget_Numbre: budget,
        budget_Lettre: budgetLettre,
      }));
    }
  }, [affaireDetails]);

  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (e) => {
    if (!isResizing) return;
    const windowHeight = window.innerHeight;
    const newHeight = Math.min(windowHeight - e.clientY, windowHeight - 100);
    setHeight(newHeight);
  };

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);
  const user = useSelector((state) => state.userReducer.userInfo);

  const handleTransaction = async (e, status) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/api/register-transaction/${status}`,
        valideAffaireData,
        {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
        }
      );
      console.log(response);
      await sendNotification(
        user?.id,
        affaireDetails?.accord?.courtier?.user?.id,
        "Validation de Transaction",
        `La transaction pour l'affaire ${affaireId} a été ${status.toLowerCase()}.`,
        {
          link: `/transactions/${response?.data?.transaction?.slug}`,
        }
      );
      await sendNotification(
        user?.id,
        affaireDetails?.accord?.user?.id,
        "Validation de Transaction",
        `La transaction pour l'affaire ${affaireId} a été ${status.toLowerCase()}.`,
        {
          link: `/transactions/${response?.data?.transaction?.slug}`,
        }
      );
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {affaireId && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end justify-center"
          style={{ zIndex: 1006 }}
          onClick={() => setSelectedAffaire(null)}
        >
          <motion.div
            ref={modalRef}
            className="bg-white p-8 rounded-t-xl shadow-2xl w-[98%] max-w-[98%] overflow-y-auto custom-scrollbar relative "
            style={{ height: `${height}px`, maxHeight: "95vh" }}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute top-0 left-0 w-full h-2 bg-gray-300 hover:bg-gray-400 cursor-ns-resize"
              onMouseDown={startResizing}
              style={{ zIndex: 10 }}
            />

            {isLoading ? (
              <div className="h-full grid lg:grid-cols-2 gap-4 animate-pulse">
                <div className="bg-gray-300 h-full w-full rounded"></div>
                <div className="bg-gray-300 h-full w-full rounded"></div>
              </div>
            ) : (
              <div className="space-y-6 ">
                <div className="text-center mb-4">
                  <h1 className="text-xl lg:text-2xl font-extrabold uppercase">
                    Validation de Transaction Immobilière
                  </h1>
                  <p className="text-sm text-gray-500">
                    Numéro d'affaire : {affaireId} | Accord ID : {accordId}
                  </p>
                </div>

                <div className="flex lg:flex-row flex-col-reverse gap-2">
                  <div className="text-sm lg:sticky top-0 self-start">
                    {affaireDetails?.accord?.bien?.typeAffaire === "acheter" ? (
                      <Achat
                        setValideAffaireData={setValideAffaireData}
                        valideAffaireData={valideAffaireData}
                      />
                    ) : (
                      <Louer
                        setValideAffaireData={setValideAffaireData}
                        valideAffaireData={valideAffaireData}
                      />
                    )}
                  </div>
                  <div className="text-base text-gray-700 ">
                    <div className="grid lg:grid-cols-2 gap-6 border border-gray-300 rounded-lg p-4 mb-2">
                      <div>
                        <h3 className="font-bold mb-2">Courtier</h3>
                        <p>
                          Nom et prénom :{" "}
                          <span className="font-bold">
                            {affaireDetails?.accord?.courtier?.user?.nom}{" "}
                            {affaireDetails?.accord?.courtier?.user?.prenom}
                          </span>
                        </p>
                        <p>
                          Téléphone :{" "}
                          {affaireDetails?.accord?.courtier?.user?.telephone}{" "}
                        </p>
                        <p>
                          E-mail :{" "}
                          {affaireDetails?.accord?.courtier?.user?.email}{" "}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Client</h3>
                        <p>
                          Nom et prénom :{" "}
                          <span className="font-bold">
                            {affaireDetails?.accord?.user?.nom}{" "}
                            {affaireDetails?.accord?.user?.prenom}
                          </span>
                        </p>
                        <p>
                          Téléphone : {affaireDetails?.accord?.user?.telephone}
                        </p>
                        <p>E-mail : {affaireDetails?.accord?.user?.email}</p>
                      </div>
                    </div>
                    <div className="border-t border-b border-gray-300 py-4 mb-4">
                      <p className="text-base">
                        Type de transaction :{" "}
                        <span className="font-bold uppercase">
                          {affaireDetails?.accord?.bien?.typeAffaire ===
                          "acheter"
                            ? "VENTE"
                            : "LOCATION"}
                        </span>
                      </p>
                      <p className="text-base">
                        Bien :{" "}
                        <span className="font-bold">
                          {affaireDetails?.accord?.bien?.type} à{" "}
                          {affaireDetails?.accord?.bien?.ville}{" "}
                          {affaireDetails?.accord?.bien?.quartier}
                        </span>
                      </p>
                    </div>
                    <div className="border-t border-b p-4 border-gray-300 mb-2 text-sm">
                      <h3 className="text-lg font-bold">
                        Dépendances de la transaction
                      </h3>
                      <div className="flex items-center justify-between">
                        <span>Commission par MAD</span>
                        <span className="text-[#f56565] font-bold text-xs">
                          {new Intl.NumberFormat("de-DE", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            (valideAffaireData?.commission_locatech *
                              valideAffaireData?.budget_Numbre) /
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
                            (valideAffaireData?.impôts *
                              valideAffaireData?.budget_Numbre) /
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
                            (valideAffaireData?.frauis_dossier *
                              valideAffaireData?.budget_Numbre) /
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
                            (valideAffaireData?.frauis_dossier *
                              valideAffaireData?.budget_Numbre) /
                              100 +
                              (valideAffaireData?.impôts *
                                valideAffaireData?.budget_Numbre) /
                                100 +
                              valideAffaireData?.budget_Numbre *
                                valideAffaireData?.nombre_mois
                          )}{" "}
                          MAD
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 border-t border-gray-300 pt-4 my-4">
                      <h4 className="font-bold mb-2">Conditions & Services</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>
                          Les informations ci-dessus sont confidentielles et
                          destinées uniquement aux parties concernées.
                        </li>
                        <li>
                          La transaction est régie par les lois en vigueur et
                          les termes de l’accord signé.
                        </li>
                        <li>
                          Les frais de courtage, les taxes et services associés
                          sont à la charge des parties selon les clauses du
                          contrat.
                        </li>
                        <li>
                          Aucune information ne sera partagée sans consentement
                          écrit.
                        </li>
                      </ul>
                    </div>

                    <div className="text-sm text-gray-600 border-t border-gray-300 pt-4">
                      <h4 className="font-bold mb-2">Confidentialité</h4>
                      <p>
                        Toutes les données personnelles sont traitées
                        conformément à notre politique de confidentialité. Les
                        parties s’engagent à respecter la discrétion nécessaire.
                      </p>
                    </div>

                    <p className="text-xs text-center text-gray-400 pt-2">
                      Merci pour votre confiance.
                    </p>
                  </div>
                </div>
                <div className="w-full space-x-4 flex justify-between lg:justify-end bg-white py-2 px-8 text-xs lg:text-sm">
                  <button
                    className="px-10 py-2.5 rounded border border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 flex items-center space-x-2 cursor-pointer"
                    onClick={(e) =>
                      handleTransaction(e, "Transaction non réussie")
                    }
                  >
                    <TicketX className="h-5 w-5" />
                    <span>Refuser </span>
                  </button>
                  <button
                    className="px-10 py-2.5 rounded bg-red-500 hover:bg-red-600 text-white flex items-center space-x-2 cursor-pointer"
                    onClick={(e) => handleTransaction(e, "Transaction réussie")}
                  >
                    {isLoading ? (
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                    ) : (
                      <TicketCheck className="h-5 w-5" />
                    )}
                    <span>Valider </span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ValiderAffaire;
