import {
  faArrowsRotate,
  faEllipsisVertical,
  faImages,
  faInfo,
  faPen,
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

function MesBiens() {
  const MesBiens = useSelector((state) => state.BienReducer);
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
  console.log(MesBiens);
  console.log(ActuelCourtierReducer);
  
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
  return (
    <div>
      <div className="flex justify-between mx-8 mt-3">
        <h1 className="text-lg font-semibold">
          Mes Biens <FontAwesomeIcon icon={faScroll} />
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
        {MesBiens.filter(
          (bien) => bien.courtier_id === ActuelCourtierReducer.id
        ).map((bien, index) => (
          <div
            key={index}
            className="border rounded border-[#b1a7a6] my-4 p-4 h-96 relative"
          >
            <div className="mx-4 flex justify-between my-2 relative">
              <h1 className="text-lg font-bold">.{bien.title}</h1>
              <div className="relative">
                <button
                  ref={buttonRef}
                  className=" px-4 py-2 cursor-pointer"
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
                    className="absolute right-0 mt-2 w-40 bg-[#f5f3f4] border border-[#b1a7a6] rounded shadow z-10"
                  >
                    <ul className="text-sm text-gray-700">
                      <Link
                        to={`/details-bien/${bien.id}`}
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
                      {/* <FontAwesomeIcon icon={faLocationDot} /> */}
                      <img src={brocheDeLocalisation} alt="" className="h-6" />
                      <span>{bien.ville}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span>superficier :</span>
                      <span className="font-semibold">{bien.superficier}</span>
                    </div>
                    <div className="font-semibold">${bien.budget}.00</div>
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
                      <span className="bg-green-500 text-white px-2 py-1 rounded">
                        {bien.status}
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
        ))}
      </div>
    </div>
  );
}

export default MesBiens;
