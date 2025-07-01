import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { LoaderCircle, Trash } from "lucide-react";
import { fetchCourtiers } from "../../../../functions/fetchCourtiers";
import { useDispatch, useSelector } from "react-redux";

function CourtierModal({
  setToggleCourtierModal,
  selectedRow,
  setSelectedRow,
}) {
  const courtier = useSelector((state) => state.AllCourtiersReducer).find(
    (courtier) => courtier.id === selectedRow
  );

  const [agences, setAgences] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const fetchAgences = async () => {
    try {
      const response = await axios.get(`/api/get-agences`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAgences(response.data?.agences || []);
    } catch (error) {
      console.error("Erreur:", error);
      return [];
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAgences();
  }, []);

  const [info, setInfo] = React.useState({
    nom: selectedRow ? courtier?.user?.nom : "",
    prenom: selectedRow ? courtier?.user?.prenom : "",
    email: selectedRow ? courtier?.user?.email : "",
    telephone: selectedRow ? courtier?.user?.telephone : "",
    agence: selectedRow ? courtier.agence_id : "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !info.nom ||
      !info.prenom ||
      !info.email ||
      !info.telephone ||
      !info.agence
    ) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `/api/add-courtiers`,
        {
          nom: info.nom,
          prenom: info.prenom,
          email: info.email,
          telephone: info.telephone,
          agence_id: info.agence,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status >= 200 && response.status <= 300) {
        console.log(response.data);
        fetchCourtiers(dispatch);
        toast.success(response.data.message);
        setToggleCourtierModal(false);
        setSelectedRow(null)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const [isDeleting, setIsDeleitng] = useState(false);
  const deleteCourtier = async (e) => {
    e.preventDefault();
    setIsDeleitng(true);
    try {
      const response = await axios.post(
        `/api/delete-courtier/${selectedRow}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      toast.success(response?.data?.message);
      fetchCourtiers(dispatch);
      setToggleCourtierModal(false);
      setSelectedRow(null)
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleitng(false);
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-40 flex items-center justify-center z-50"
        onClick={() => {
          setToggleCourtierModal(false);
          setSelectedRow(null);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex: 1006 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-xl p-7 w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ zIndex: 1006 }}
        >
          <div className=" flex items-center justify-between">
            <h2 className="text-xl font-bold ">
              {selectedRow ? "Modifier un Courtier" : " Ajouter un Courtier"}
            </h2>
            {selectedRow && (
              <span
                style={{
                  backgroundColor: courtier?.status?.["coleur-code"] || "black",
                }}
                className="text-white px-2 py-1 rounded"
              >
                {courtier?.status?.nom}
              </span>
            )}
          </div>
          <form
            className="max-w-md mx-auto p-6 bg-white rounded shadow text-sm"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  placeholder="Entrez le nom"
                  onChange={(e) => {
                    setInfo({
                      ...info,
                      nom: e.target.value,
                    });
                  }}
                  value={info.nom || ""}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Prénom
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  placeholder="Entrez le prénom"
                  onChange={(e) => {
                    setInfo({
                      ...info,
                      prenom: e.target.value,
                    });
                  }}
                  value={info.prenom || ""}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                placeholder="Entrez l'e-mail"
                onChange={(e) => {
                  setInfo({
                    ...info,
                    email: e.target.value,
                  });
                }}
                value={info.email || ""}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                placeholder="Entrez le numéro de téléphone"
                onChange={(e) => {
                  setInfo({
                    ...info,
                    telephone: e.target.value,
                  });
                }}
                value={info.telephone || ""}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Agence
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                onChange={(e) => {
                  setInfo({
                    ...info,
                    agence: e.target.value,
                  });
                }}
                value={info.agence || ""}
              >
                <option value="">Sélectionnez une agence</option>
                {agences.map((agence) => (
                  <option key={agence.id} value={agence.id}>
                    {agence.agence +
                      " - " +
                      agence.RC +
                      " - " +
                      agence.Numéro_ICE}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center text-white">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <span>Ajouter</span>
              )}
            </button>
            {selectedRow && (
              <button
                className="w-full text-red-500 py-3 rounded hover:text-red-600  transition-colors flex items-center space-x-2 justify-center cursor-pointer "
                onClick={(e) => deleteCourtier(e)}
              >
                <Trash className="h-5 w-5" />
                <span>
                  {isDeleting ? "suppression .." : "Supprimer ce courtier"}
                </span>
              </button>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CourtierModal;
