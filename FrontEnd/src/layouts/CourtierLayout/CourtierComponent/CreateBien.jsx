import {
  faScroll,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Images from "./images";
import Info from "./Info";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { file } from "jszip";
import { uploadToCloudinary } from "../../../lib/cloudinary";
import axios from "axios";
import { useNavigate } from "react-router";
function CreateBien() {
  const [frame, setFrame] = useState("images");
  const dispatch = useDispatch();
  const createBien = useSelector((state) => state.CreateBienReducer);
  const userCourtier = useSelector((state) => state.userReducer.user);
  const files = useSelector((state) => state.filesReducer);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const handleValidBien = async () => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    setIsLoading(true);
    if (
      !createBien.title ||
      !createBien.description ||
      !createBien.budget ||
      !createBien.superficier ||
      !createBien.mapUrl ||
      !createBien.ville ||
      !createBien.type ||
      !files
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      setIsLoading(false);
      return;
    }

    try {
      const existingImages = createBien.images || [];
      const uploadedUrls = await uploadToCloudinary(files);
      const urls = [...existingImages, ...uploadedUrls];

      const newBien = {
        ...createBien,
        images: urls,
        courtier_id: userCourtier.user.id,
      };

      console.log(newBien);

      const response = await axios.post("/api/CreateBien", newBien, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status <= 300) {
        toast.success("Annonce validée avec succès !");
        console.log(response);
        nav("/courtier-index");
        dispatch({
          type: "RESET_CREATE_BIEN",
        });
        dispatch({
          type: "RESET_FILES",
        });
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        dispatch({
          type: "SHOW_CREATEBIENTOGGLE",
          payload: false,
        });
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la soumission.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-[#161a1d93] h-screen w-full top-0 left-0 flex items-center justify-center z-50">
      <motion.section
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-[90%] h-[90%] bg-white rounded shadow-3xl"
      >
        <div className="flex justify-between mx-8 mt-4">
          <div>
            <h1 className="flex space-x-3 items-center">
              <p className="text-lg font-semibold">Creé une nouvelle annonce</p>
              <span>
                <FontAwesomeIcon icon={faScroll} />
              </span>
            </h1>
          </div>
          <div>
            <button
              className="cursor-pointer text-xl"
              onClick={() => {
                dispatch({
                  type: "SHOW_CREATEBIENTOGGLE",
                  payload: false,
                });
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
        <div className="flex space-x-4 text-sm ms-8 mt-2">
          <button
            onClick={() => setFrame("images")}
            className={`px-2 py-1 cursor-pointer ${
              frame === "images" && "bg-[#f5f3f4]"
            }`}
          >
            les images
          </button>
          <button
            onClick={() => setFrame("info")}
            className={`px-2 py-1 cursor-pointer ${
              frame === "info" && "bg-[#f5f3f4]"
            }`}
          >
            les informations
          </button>
        </div>
        <div className="border border-gray-200 h-[75%]">
          {frame === "images" ? (
            <Images />
          ) : frame === "info" ? (
            <Info />
          ) : (
            <Images />
          )}
        </div>
        <div className="flex justify-end mt-4 mx-8 text-sm">
          <div className="flex space-x-4 text-white">
            <button
              className="bg-[#a4161a] px-4 py-2 rounded cursor-pointer"
              onClick={handleValidBien}
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : (
                "Valider"
              )}
            </button>
            <button
              onClick={() => {
                toast.info("réinitialiser toutes les champs");
                dispatch({
                  type: "RESET_CREATE_BIEN",
                });
                dispatch({
                  type: "RESET_FILES",
                });
              }}
              className="bg-[#f5f3f4] text-gray-700 px-4 py-2 rounded cursor-pointer border border-gray-700"
            >
              réinitialiser
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default CreateBien;
