import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { LoaderCircle, Trash, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../../functions/fetchUsers";

function UsersModal({ setToggleModal, selectedUser, setSelectedUser }) {
  const user = useSelector((state) => state.usersReducer).find(
    (user) => user.id === selectedUser
  );

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [info, setInfo] = useState({
    nom: selectedUser ? user?.nom : "",
    prenom: selectedUser ? user?.prenom : "",
    email: selectedUser ? user?.email : "",
    telephone: selectedUser ? user?.telephone : "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!info.nom || !info.prenom || !info.email || !info.telephone) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `/api/handle-user`,
        {
          nom: info.nom,
          prenom: info.prenom,
          email: info.email,
          telephone: info.telephone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status >= 200 && response.status <= 300) {
        fetchUsers(dispatch);

        toast.success(response.data.message);
        setToggleModal(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteCourtier = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      const response = await axios.post(
        `/api/delete-user/${selectedUser}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response?.data?.message);
      fetchUsers(dispatch);
      setToggleModal(false);
      setSelectedUser(null);
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
          setSelectedUser(null);
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
          <div className="flex justify-end lg:hidden mb-2">
            <button
              className="bg-gray-200 rounded-full p-1"
              onClick={() => {
                setToggleModal(false);
                setSelectedUser(null);
              }}
            >
              <X />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold ">
              {selectedUser
                ? "Modifier un utilisateur"
                : "Ajouter un utilisateur"}
            </h2>
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
                  onChange={(e) => setInfo({ ...info, nom: e.target.value })}
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
                  onChange={(e) => setInfo({ ...info, prenom: e.target.value })}
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
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                value={info.email || ""}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                placeholder="Entrez le numéro de téléphone"
                onChange={(e) =>
                  setInfo({ ...info, telephone: e.target.value })
                }
                value={info.telephone || ""}
              />
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
                <span>{selectedUser ? "Modifier" : "Ajouter"}</span>
              )}
            </button>

            {selectedUser && (
              <button
                className="w-full text-red-500 py-3 rounded hover:text-red-600 transition-colors flex items-center space-x-2 justify-center cursor-pointer mt-2"
                onClick={deleteCourtier}
              >
                <Trash className="h-5 w-5" />
                <span>
                  {isDeleting ? "Suppression..." : "Supprimer cet utilisateur"}
                </span>
              </button>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default UsersModal;
