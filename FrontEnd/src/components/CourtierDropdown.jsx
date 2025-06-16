import axios from "axios";
import {
  CircleAlert,
  CircleCheckBig,
  CircleX,
  TrendingUp,
  Loader2,
} from "lucide-react";

import React, { useState, useEffect, useRef } from "react";
import { sendNotification } from "../functions/NotificationSender";
import { useSelector } from "react-redux";
import { getAccordBienConv } from "../functions/getAccordBienConv";

const CourtierDropdown = ({ bienId, user_id }) => {
  const user = useSelector((state) => state.userReducer.userInfo);
  const currentCourtier = useSelector((state) => state.ActuelCourtierReducer);
  const [accordBien, setAccordBien] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [statusData, setStatusData] = useState({
    status: "",
    commentaire: "",
    bienId,
    courtierId: currentCourtier?.id,
    user_id,
  });
  const [loading, setLoading] = useState(false);

  const handleAccord = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/accord-rapport", statusData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setIsOpen(false);
      setStatusData({
        status: "",
        commentaire: "",
      });
      await sendNotification(
        user?.id,
        "",
        "Rapport d'acccord",
        `Le rapport d’accord a été validé. Vous pouvez consulter les détails et les prochaines étapes.`,
        {
          link: "/control-accord",
        }
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const getAccordBien = async () => {
      const response = await getAccordBienConv(bienId);
      setAccordBien(response);
    };
    getAccordBien();
  }, [bienId]);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 rounded cursor-pointer flex items-center space-x-3 hover:bg-gray-800 text-sm text-white bg-gray-700"
      >
        <TrendingUp
          className={`h-4 w-4 ${
            accordBien && accordBien === "rejected"
              ? "text-red-500"
              : accordBien && accordBien === "accepted"
              ? "text-green-500"
              : accordBien
              ? "text-yellow-500"
              : ""
          }`}
        />
        {accordBien ? (
          <span
            className={` ${
              accordBien && accordBien === "rejected"
                ? "text-red-500"
                : accordBien && accordBien === "accepted"
                ? "text-green-500"
                : "text-yellow-500"
            }`}
          >
            {accordBien}
          </span>
        ) : (
          <span>Le status d'accord</span>
        )}
      </button>

      {isOpen && (
        <div
          style={{ zIndex: "1004" }}
          className="fixed top-0 left-0 w-[100vw] h-screen bg-[#00000096] flex justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white text-gray-900 rounded-lg w-[30%] h-auto shadow-lg z-50 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">
              Sélectionnez le statut :
            </h2>

            <ul className="border border-gray-400 rounded overflow-hidden mb-4">
              <li
                className={`px-4 py-2 hover:bg-green-100 cursor-pointer border-b border-gray-400 flex items-center space-x-1 ${
                  statusData?.status === "accepted" && "bg-green-100"
                }`}
                onClick={() =>
                  setStatusData({ ...statusData, status: "accepted" })
                }
              >
                <CircleCheckBig className="h-4 w-4" />
                <span>L'affaire a été conclue</span>
              </li>
              <li
                className={`px-4 py-2 hover:bg-red-100 cursor-pointer flex items-center space-x-1 border-b border-gray-400 ${
                  statusData?.status === "rejected" && "bg-red-100"
                }`}
                onClick={() =>
                  setStatusData({ ...statusData, status: "rejected" })
                }
              >
                <CircleX className="h-4 w-4" />
                <span>L'affaire a été refusée</span>
              </li>
              <li
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-1 ${
                  statusData?.status === "autre" && "bg-gray-100"
                }`}
                onClick={() =>
                  setStatusData({ ...statusData, status: "autre" })
                }
              >
                <CircleAlert className="h-4 w-4" />
                <span>Autre</span>
              </li>
            </ul>

            <textarea
              value={statusData.commentaire}
              onChange={(e) =>
                setStatusData({ ...statusData, commentaire: e.target.value })
              }
              className="w-full h-24 border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 resize-none"
              placeholder="Ajoutez un commentaire (facultatif)..."
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={handleAccord}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center min-w-[100px]"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  "Confirmer"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourtierDropdown;
