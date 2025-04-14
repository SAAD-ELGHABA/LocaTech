import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MapFromUrl from "./MapFormUrl";
import {
  faArrowTurnUp,
  faCalendar,
  faChevronLeft,
  faCopy,
  faMapPin,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MesBiens from "../layouts/CourtierLayout/Courtierpages/MesBiens";
import brocheDeLocalisation from "../assets/broche-de-localisation.gif";

import { toast } from "sonner";
import axios from "axios";
function DetailsBien() {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);
  const Biens = useSelector((state) => state.BienReducer);
  const BienDetails = Biens.find((b) => b.id == id);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleDeleteBien = (id) => {
    toast("Êtes-vous sûr de vouloir supprimer ce bien ?", {
      action: {
        label: "Confirmer",
        onClick: async () => {
          try {
            const response = await axios.post(`/api/delete-Bien/${id}`);
            toast.success("Bien supprimé avec succès");
            dispatch({
              type: "SET_LOADING",
              payload: true,
            });
            console.log(response);
          } catch (error) {
            toast.error("Erreur lors de la suppression");
            console.error(error);
          }
        },
      },
      cancel: {
        label: "Annuler",
      },
    });
  };
  if (!BienDetails)
    return <div className="text-center mt-10">Aucun bien trouvé</div>;

  return (
    <div className="flex flex-col mt-5 space-y-4">
      <div className="mx-8">
        <span>
          <Link
            to={"/MesBiens"}
            className="flex items-center space-x-2 hover:text-[#a4161a]"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>retour</span>
          </Link>
        </span>
      </div>
      <div className="flex items-start justify-between mx-8 ">
        <div className="flex-1 flex justify-center items-center max-h-[500px] overflow-hidden">
          <img
            src={BienDetails.images[selectedIndex]}
            alt="indice-image"
            className="max-h-[400px] rounded object-contain"
          />
        </div>

        <div className="overflow-y-auto flex flex-col space-y-2 max-h-[400px] p-2">
          {BienDetails.images.map((img, index) => (
            <img
              src={img}
              alt={`thumbnail-${index}`}
              key={index}
              className={`h-[100px] w-auto object-contain cursor-pointer rounded ${
                index === selectedIndex ? "ring-2 ring-[#a4161a]" : ""
              }`}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>
      <hr className="border-[#b1a7a6]" />
      <div className="mx-8 flex items-start justify-between">
        <div className="w-3/5 flex flex-col space-y-2.5">
          <div>
            <h1 className="text-lg font-bold">.{BienDetails.title}</h1>
            <div>
              <p className="text-sm">{BienDetails.description}</p>
            </div>
          </div>
          <div className="flex justify-between me-4">
            <div className="flex space-x-2 items-center font-semibold">
              <img src={brocheDeLocalisation} alt="" className="h-6" />
              <span>{BienDetails.ville}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span>superficie :</span>
              <span className="font-semibold">{BienDetails.superficier}</span>
            </div>
            <div className="font-semibold">${BienDetails.budget}.00</div>
          </div>
          <div className="flex justify-between me-4 items-end">
            <div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faArrowTurnUp} className="rotate-90" />
                <span>Type de bien :</span>{" "}
                <span className="font-semibold">{BienDetails.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faArrowTurnUp} className="rotate-90" />
                <span>Type d'affaire :</span>{" "}
                <span className="font-semibold">{BienDetails.typeAffaire}</span>
              </div>
            </div>
            <div>
              <span
                className={`px-2 py-1 rounded text-white ${
                  BienDetails.status === "recente" ? "bg-green-500" : ""
                }`}
              >
                {BienDetails.status}
              </span>
            </div>
          </div>
          <div className="flex items-center  me-4 py-1 px-1 text-sm">
            <div className="bg-[#b1a7a648] border rounded-l-xl border-[#b1a7a6] px-3 py-1">
              <FontAwesomeIcon icon={faMapPin} />
            </div>
            <span className=" border-t border-b px-2 py-1 border-[#b1a7a6]">
              <a
                href={BienDetails.mapUrl}
                target="blank_"
                className="hover:text-[#ba181b]"
              >
                {BienDetails.mapUrl.length > 70
                  ? BienDetails.mapUrl.substring(0, 70) + "..."
                  : ""}
              </a>
            </span>
            <span
              onClick={() => {
                navigator.clipboard.writeText(BienDetails.mapUrl);
                toast.success("URL map a été copié avec succès !");
              }}
              className="cursor-pointer text-[#161a1d] bg-[#b1a7a648] border rounded-e-xl border-[#b1a7a6] px-3 py-1"
            >
              <FontAwesomeIcon icon={faCopy} />
            </span>
          </div>
        </div>
        <div className="w-2/5">
          <MapFromUrl mapUrl={BienDetails.mapUrl} />
        </div>
      </div>
      <div className=" mx-8 flex justify-between text-sm">
        <div className="flex items-center">
          <div>
            <p>Action :</p>
          </div>
          <button
            onClick={() => {
              dispatch({
                type: "SHOW_CREATEBIENTOGGLE",
                payload: true,
              });
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: BienDetails,
              });
            }}
            className="px-2 py-2 cursor-pointer flex space-x-4 items-center"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            className="px-2 py-2  cursor-pointer text-red-500 flex space-x-4 items-center"
            onClick={() => handleDeleteBien(BienDetails.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <FontAwesomeIcon icon={faCalendar} />
          <p>{new Date(BienDetails.created_at).toLocaleString()}</p>
        </div>
      </div>
      <hr className="border-[#b1a7a6]" />
      <MesBiens />
    </div>
  );
}

export default DetailsBien;
