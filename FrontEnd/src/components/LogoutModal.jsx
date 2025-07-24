import React from "react";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { fetchInitialData } from "../functions/fetchInitialData";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    setIsLoggingOut("logging out");
    try {
      await axios.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchInitialData(dispatch, null);
      navigate("/login");
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("token");
      localStorage.removeItem("currentConversationId");
      toast.success("Déconnexion réussie !");
    } catch (error) {
      toast.error("Échec de la déconnexion.");
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-40 flex items-center justify-center lg:z-50 z-[1007]"
          onClick={onCancel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ zIndex: 1006 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl p-7 w-full lg:max-w-lg max-w-sm"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ zIndex: 1006 }}
          >
            <div className="flex flex-col items-center text-center space-y-2 text-sm">
              <div className="w-full text-start">
                <h2 className="text-xl font-semibold text-gray-800">
                  Se déconnecter ?
                </h2>
                <p className="text-gray-500 ">
                  La déconnexion garantit la sécurité de votre compte en
                  terminant la session et en empêchant l’accès non autorisé à
                  vos informations.
                </p>
              </div>

              <div className="flex w-full space-x-2 mt-4 justify-end">
                <button
                  onClick={handleLogOut}
                  className="cursor-pointer px-3 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-all duration-300 shadow-md min-w-[180px] flex items-center justify-center"
                >
                  {isLoggingOut === "logging out" ? (
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  ) : (
                    <span>Oui, se déconnecter</span>
                  )}
                </button>
                <button
                  onClick={onCancel}
                  className="px-2 cursor-pointer bg-gray-300 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded transition-all duration-300 shadow-md"
                >
                  Annuler
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
