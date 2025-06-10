import {
  faArrowsRotate,
  faEllipsisVertical,
  faImages,
  faInfo,
  faPen,
  faPlay,
  faPowerOff,
  faScroll,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import brocheDeLocalisation from "../../../assets/broche-de-localisation.gif";
// import locationIcon from "../../../assets/location-icon.png";
import axios from "axios";
import { ChartNoAxesCombined, ClockAlert, Hourglass } from "lucide-react";
import Interactions from "../CourtierComponent/Interactions";

function MesBiens() {
  // const MesBiens = useSelector((state) => state.BienReducer);
  const ActuelCourtierReducer = useSelector(
    (state) => state.ActuelCourtierReducer
  );

  const LoadinfGlobal = useSelector((state) => state.loadingReducer);
  const dispatch = useDispatch();

  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setActiveDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleBrouillerBien = (id) => {
    toast("Êtes-vous sûr de vouloir brouiller ce bien ?", {
      action: {
        label: "Confirmer",
        onClick: async () => {
          try {
            const response = await axios.post(`/api/brouiller-Bien/${id}`);
            toast.success("Bien a été ajouté aux brouillants avec succès");
            dispatch({
              type: "SET_LOADING",
              payload: true,
            });
            console.log(response);
          } catch (error) {
            toast.error("Erreur lors de la brouillant");
            console.error(error);
          }
        },
      },
      cancel: {
        label: "Annuler",
      },
    });
  };

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

  const handleActiverBien = (id) => {
    toast("Êtes-vous sûr de vouloir activer ce bien ?", {
      action: {
        label: "Confirmer",
        onClick: async () => {
          try {
            const response = await axios.post(`/api/activer-Bien/${id}`);
            toast.success("Bien activé avec succès");
            dispatch({
              type: "SET_LOADING",
              payload: true,
            });
            console.log(response);
          } catch (error) {
            toast.error("Erreur lors de l'activation");
            console.error(error);
          }
        },
      },
      cancel: {
        label: "Annuler",
      },
    });
  };
  const [toggleInteractions, setToggleInteractions] = useState(false);
  const statusReducer = useSelector((state) => state.statusReducer);
  const MesBiens = useSelector((state) => state.ActuelCourtierReducer?.biens);
  const [BienId, setBienId] = useState(null);
  return (
    <div>
      <div className="flex justify-between mx-8 mt-3">
        <h1 className="text-lg font-semibold flex items-center space-x-2">
          <span>Mes Biens ({MesBiens?.length > 0 && MesBiens?.length})</span>
          <FontAwesomeIcon icon={faScroll} />
        </h1>
        <button
          className="flex space-x-2 items-center cursor-pointer "
          onClick={() => {
            toast.loading("attendue...");
            dispatch({
              type: "SET_LOADING",
              payload: true,
            });
          }}
        >
          <FontAwesomeIcon icon={faArrowsRotate} />
          <span>rafraîchir</span>
        </button>
      </div>
      <div>
        {MesBiens.length > 0 ? (
          MesBiens.filter((bien) => bien.status_id !== 2)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((bien, index) => (
              <div
                key={index}
                className="border rounded border-[#b1a7a6] my-4 p-4 h-96 relative"
              >
                <div className="mx-4 flex justify-between my-2 relative">
                  <h1 className="text-lg font-bold">.{bien.title}</h1>
                  <div className="relative">
                    <button
                      ref={buttonRef}
                      className=" px-4 py-2 cursor-pointer hover:bg-red-50"
                      onClick={() =>
                        setActiveDropdownIndex(
                          activeDropdownIndex === index ? null : index
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>

                    {activeDropdownIndex === index && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-3 top-full w-50 bg-[#f5f3f4] border border-[#b1a7a6] rounded shadow z-10"
                      >
                        <ul className="text-sm text-gray-700">
                          <Link
                            to={`/bien/${bien.ville}/${bien.slag}`}
                            className="px-4 py-2 hover:bg-[#d3d3d3] cursor-pointer flex space-x-4 items-center"
                          >
                            <FontAwesomeIcon icon={faInfo} />
                            <span>Voir détails</span>
                          </Link>
                          <li
                            onClick={() => {
                              dispatch({
                                type: "SHOW_CREATEBIENTOGGLE",
                                payload: true,
                              });
                              dispatch({
                                type: "SET_CREATE_BIEN",
                                payload: bien,
                              });
                            }}
                            className="px-4 py-2 hover:bg-[#d3d3d3] cursor-pointer flex space-x-4 items-center"
                          >
                            <FontAwesomeIcon icon={faPen} />
                            <span>Modifier</span>
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-[#d3d3d3] cursor-pointer flex space-x-4 items-center"
                            onClick={() => handleBrouillerBien(bien.id)}
                          >
                            <FontAwesomeIcon icon={faPowerOff} />
                            <span>brouiller</span>
                          </li>
                          {bien.status === 6 && (
                            <li
                              className="px-4 py-2 hover:bg-[#d3d3d3] cursor-pointer flex space-x-4 items-center"
                              onClick={() => handleActiverBien(bien.id)}
                            >
                              <FontAwesomeIcon icon={faPlay} />
                              <span>Activer</span>
                            </li>
                          )}
                          <li
                            className="px-4 py-2 hover:bg-[#d3d3d3] text-green-500 cursor-pointer flex space-x-4 items-center"
                            onClick={() => {
                              setToggleInteractions("waiting");
                              setBienId(bien?.id);
                              setTimeout(() => {
                                setToggleInteractions(true);
                              }, 2000);
                            }}
                          >
                            <ChartNoAxesCombined className="h-4 w-4 " />
                            <span>Voir les interactions</span>
                          </li>

                          <li
                            className="px-4 py-2 hover:bg-[#d3d3d3] cursor-pointer text-red-500 flex space-x-4 items-center"
                            onClick={() => handleDeleteBien(bien.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            <span>Supprimer</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex">
                  <div className="w-1/2 h-72 relative group overflow-hidden rounded">
                    <img
                      src={bien.images && bien.images[0]}
                      alt="image indice 0"
                      className="w-full h-full object-cover rounded"
                    />
                    <div
                      className="absolute top-0 left-0 w-full h-full flex items-center justify-center
                       bg-[#161a1db0] bg-opacity-50 opacity-0 group-hover:opacity-100 
                       transition duration-300 text-white text-xl"
                    >
                      <div className="flex space-x-2 items-center">
                        <span>+{bien.images && bien.images.length}</span>
                        <FontAwesomeIcon icon={faImages} />
                      </div>
                    </div>
                  </div>

                  <div className="w-1/2 p-4 flex flex-col place-content-around">
                    <div>
                      <p className="text-sm">
                        {bien.description.length > 400
                          ? bien.description.substring(0, 400) + "..."
                          : bien.description}
                        {bien.description.length > 400 && (
                          <Link to="/details" className="text-red-500">
                            {" "}
                            voir plus
                          </Link>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between">
                        <div className="flex space-x-2 items-center font-semibold">
                          <img
                            src={brocheDeLocalisation}
                            alt=""
                            className="h-6"
                          />
                          <span>{bien.ville}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <span>superficier :</span>
                          <span className="font-semibold">
                            {bien.superficier} m²
                          </span>
                        </div>
                        <div className="font-semibold">
                          $
                          {new Intl.NumberFormat("de-DE", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(bien.budget)}
                          .00
                        </div>
                      </div>
                      <div className="flex  items-center justify-between">
                        <div className="flex space-x-4 text-sm">
                          <span className="bg-[#d3d3d3] px-2 py-1 rounded ">
                            #{bien.type}
                          </span>
                          <span className="bg-[#d3d3d3] px-2 py-1 rounded ">
                            #{bien.typeAffaire}
                          </span>
                        </div>
                        <div>
                          <span>
                            <div
                              className="space-x-2 px-4 flex items-center py-2 rounded text-white"
                              style={{
                                backgroundColor: bien?.status?.["coleur-code"],
                              }}
                            >
                              {bien?.status?.id === 8 && (
                                <ClockAlert className="h-4 w-4" />
                              )}
                              <span>{bien?.status?.nom}</span>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end ">
                      <p className="text-xs">
                        {new Date(bien.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : MesBiens.filter(
            (bien) =>
              bien.courtier_id === ActuelCourtierReducer.id && bien.status !== 2
          ).length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <h1 className="text-lg font-semibold text-gray-500">
              Vous n'avez pas encore de biens. Veuillez en ajouter un.
            </h1>
          </div>
        ) : (
          ""
        )}
      </div>
      {(toggleInteractions === "waiting" || toggleInteractions) && (
        <Interactions
          setToggleInteractions={setToggleInteractions}
          toggleInteractions={toggleInteractions}
          BienId={BienId}
        />
      )}
    </div>
  );
}

export default MesBiens;
