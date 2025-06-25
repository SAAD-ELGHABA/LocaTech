import React from "react";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-40 flex items-center justify-center z-50"
          onClick={onCancel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded shadow-xl p-8 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <AlertCircle className="w-16 h-16 text-red-500" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Se déconnecter ?
              </h2>
              <p className="text-gray-500">
                Êtes-vous sûr de vouloir vous déconnecter ?
              </p>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={onConfirm}
                  className="cursor-pointer px-3 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded transition-all duration-300 shadow-md"
                >
                  Oui, se déconnecter
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
