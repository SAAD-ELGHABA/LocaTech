import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Loader2, Trash, X } from "lucide-react";
import { toast } from "sonner";
import { fetchAdmins } from "../../../../functions/fetchAdmins";
import { useDispatch, useSelector } from "react-redux";

function AdminModal({ setToggleModal, selectedAdminId, setSelectedAdminId }) {
  const admin = useSelector((state) => state.AdminsReducer)?.find(
    (a) => a?.id === selectedAdminId
  );

  const [formData, setFormData] = useState({
    nom: admin?.user?.nom || "",
    prenom: admin?.user?.prenom || "",
    email: admin?.user?.email || "",
    telephone: admin?.user?.telephone || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/handle-admins", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Admin ajouté avec succès !");
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
      });
      setToggleModal(false);
      fetchAdmins(dispatch);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Erreur lors de l'envoi des données"
      );
    } finally {
      setLoading(false);
    }
  };
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteCourtier = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      const response = await axios.post(
        `/api/delete-admin/${selectedAdminId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response?.data?.message);
      fetchAdmins(dispatch);
      setToggleModal(false);
      setSelectedAdminId(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50"
        onClick={() => {
          setToggleModal(false);
          setSelectedAdminId(null);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex: 1006 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-xl p-7 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex justify-end lg:hidden mb-2">
            <button
              className="bg-gray-200 rounded-full p-1"
              onClick={() => {
                setToggleModal(false);
                setSelectedAdminId(null);
              }}
            >
              <X />
            </button>
          </div>
          <h2 className="text-xl font-bold mb-4">
            {selectedAdminId ? "Modifier un Admin" : "Ajouter un Admin"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block font-medium mb-1">Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                placeholder="Entrez le nom"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Prénom</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                placeholder="Entrez le prénom"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                placeholder="Entrez l'e-mail"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Téléphone</label>
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
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center bg-red-500 text-white py-3 rounded hover:bg-red-600 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Envoi...
                  </>
                ) : selectedAdminId ? (
                  "Modifier"
                ) : (
                  "Ajouter"
                )}
              </button>
              {selectedAdminId && (
                <button
                  className="w-full text-red-500 py-3 rounded hover:text-red-600 transition-colors flex items-center space-x-2 justify-center cursor-pointer mt-2"
                  onClick={deleteCourtier}
                >
                  <Trash className="h-5 w-5" />
                  <span>
                    {isDeleting ? "Suppression..." : "Supprimer cet admin"}
                  </span>
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AdminModal;
