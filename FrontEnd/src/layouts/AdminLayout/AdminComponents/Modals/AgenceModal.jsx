import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { fetchAgence } from "../../../../functions/fetchAgence";
import { useDispatch, useSelector } from "react-redux";
import LogoUser from "../../../../assets/logo-user.png";
function AgenceModal({
  setToggleModal,
  selectedAgenceId,
  setSelectedAgenceId,
}) {
  const agence = useSelector((state) => state.AgencesReducer)?.find(
    (agnc) => agnc?.id === selectedAgenceId
  );
  const [isChecked, setIschecked] = useState(false);
  const [formData, setFormData] = useState({
    nom: agence?.agence || "",
    telephone: agence?.telephone || "",
    RC: agence?.RC || "",
    Numéro_ICE: agence?.Numéro_ICE || "",
    email: agence?.email || "",
    evaluation_id: agence?.evaluation?.id || "",
  });
  const [evaluations, setEvaluations] = useState([]);
  const fetchEvaluations = async () => {
    try {
      const response = await axios.get("/api/get-evaluations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status >= 200 && response.status <= 300) {
        setEvaluations(response.data.evaluations || []);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des évaluations:", error);
      return [];
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    fetchEvaluations();
  }, []);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);

    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/toggle-agences", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message || "Agence ajoutée avec succès");
      setFormData({
        nom: "",
        telephone: "",
        RC: "",
        Numéro_ICE: "",
        email: "",
        evaluation: "",
      });
      setToggleModal(false);
      fetchAgence(dispatch);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Erreur lors de l'envoi des données");
    } finally {
      setLoading(false);
    }
  };
  const [isDeleting, setIsDeleitng] = useState(false);
  const deleteAgence = async (e) => {
    e.preventDefault();
    setIsDeleitng(true);
    try {
      const response = await axios.post(
        `/api/delete-agence/${selectedAgenceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      toast.success(response?.data?.message);
      fetchAgence(dispatch);
      setToggleModal(false);
      setSelectedAgenceId(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleitng(false);
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50"
        onClick={() => {
          setToggleModal(false);
          setSelectedAgenceId(null);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex: 1006 }}
      >
        <motion.div
          className={`bg-white rounded-xl shadow-xl p-7 w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar grid`}
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div>
            <h2 className="text-xl font-bold mb-4">
              {selectedAgenceId ? "Modifier une Agence" : "Ajouter une Agence"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nom Agence{selectedAgenceId}
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  placeholder="Entrez le nom de l'agence"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">E-mail</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  placeholder="Entrez l'e-mail"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Téléphone
                </label>
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  placeholder="Entrez le numéro de téléphone"
                />
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1 mb-4 md:mb-0">
                  <label className="block text-sm font-medium mb-1">
                    Registre du Commerce (RC)
                  </label>
                  <input
                    type="text"
                    name="RC"
                    value={formData.RC}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                    placeholder="Entrez le numéro RC"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Numéro ICE
                  </label>
                  <input
                    type="text"
                    name="Numéro_ICE"
                    value={formData.Numéro_ICE}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                    placeholder="Entrez le numéro ICE"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Évaluation
                </label>
                <select
                  name="evaluation_id"
                  value={formData.evaluation_id}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                >
                  <option value="">Sélectionnez une évaluation</option>
                  {evaluations.map((evalItem) => (
                    <option key={evalItem.id} value={evalItem.id}>
                      {evalItem.evaluation}
                    </option>
                  ))}
                </select>
              </div>
              {selectedAgenceId && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="check"
                    id="check"
                    checked={isChecked}
                    onChange={(e) => setIschecked(e?.target?.checked)}
                  />
                  <label htmlFor="check" className="text-red-500">
                    si vous supprimez cet agent, tous les courtiers qui lui sont
                    associés seront supprimés
                  </label>
                </div>
              )}
              <div className={`${selectedAgenceId && "flex"}`}>
                {selectedAgenceId && (
                  <button
                    className={`w-full  py-3 rounded   transition-colors flex items-center space-x-2 justify-center ${
                      isChecked
                        ? "cursor-pointer text-red-500 hover:text-red-600 "
                        : "cursor-not-allowed text-gray-500 "
                    }`}
                    onClick={(e) =>
                      isChecked ? deleteAgence(e) : e.preventDefault()
                    }
                  >
                    <Trash className="h-5 w-5" />
                    <span>
                      {isDeleting ? "suppression .." : "Supprimer cette agence"}
                    </span>
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center bg-red-500 text-white py-3 rounded hover:bg-red-600 transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" /> Envoi...
                    </>
                  ) : (
                    selectedAgenceId ? "Modifier":"Ajouter"
                  )}
                </button>
              </div>
            </form>
          </div>
          {selectedAgenceId && (
            <div className="my-6 border-t border-gray-300 pt-4">
              <h1 className="font-bold text-xl ">
                Courtier associé à cette agence
              </h1>
              {agence?.courtier?.length > 0 ? (
                agence?.courtier?.map((c, index) => (
                  <div key={index} className="flex items-center space-x-2 my-2">
                    <div>
                      <img
                        src={c?.user?.image || LogoUser}
                        alt="courtier-image"
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="text-sm text-gray-700">
                      <div className="font-medium">
                        <span>{c?.user?.nom}</span>
                        <span>{c?.user?.prenom}</span>
                      </div>
                      <span className="text-xs ">{c?.user?.email}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div>Aucun courtier</div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AgenceModal;
