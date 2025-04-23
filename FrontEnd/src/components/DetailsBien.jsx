import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import MapFromUrl from "./MapFormUrl";
import {
  faCalendar,
  faChevronLeft,
  faComments,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MesBiens from "../layouts/CourtierLayout/Courtierpages/MesBiens";
import brocheDeLocalisation from "../assets/broche-de-localisation.gif";

import { toast } from "sonner";
import axios from "axios";
import BienMap from "./BienMap";
import {
  Bath,
  CircleCheckBig,
  Heart,
  LandPlot,
  Layers,
  LayoutGrid,
  MoveRight,
  Paperclip,
} from "lucide-react";
import BienContainer from "./BienContainer";
import { handleAddFavoris } from "../functions/handleAddFavoris";
import ImageZoomViewer from "./ImageZoomViewer";
import ToastWithLink from "./ToastWithLink";
function DetailsBien() {
  const { slag } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slag]);
  const Biens = useSelector((state) => state.BienReducer);
  const user = useSelector(
    (state) =>
      (state.userReducer.userInfo && state.userReducer.userInfo.user) ||
      state.userReducer.userInfo
  );
  const filterBiensReducer = useSelector((state) => state.filterBiensReducer);

  const BienDetails = Biens.find((b) => b.slag == slag);

  const filteredBiens = Biens.filter(
    (bien) =>
      bien.id !== BienDetails.id &&
      bien.type === BienDetails.type &&
      bien.ville === BienDetails.ville
  );
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
  const formattedBudget = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(BienDetails.budget);
  const nav = useNavigate();
  const navigate = useNavigate();

  const handleHeartClick = async (e, id) => {
    e.preventDefault();
    if (!user) {
      toast.custom(() => (
        <ToastWithLink msg={"vous devez connecter"} path={"/login"} />
      ));
      return;
    }
    const { biens_ids, message } = await handleAddFavoris(e, id);

    if (biens_ids && message) {
      toast.success(message, {
        icon: (
          <span className="text-red-500">
            <Heart className="fill-red-500 h-4" />
          </span>
        ),
      });

      dispatch({
        type: "ADD_TO_FAVORIS",
        payload: biens_ids,
      });
    }
  };
  const FavorisReducer = useSelector((state) => state.FavorisReducer);
  const handleNegocier = async () => {
    if (!user) {
      toast.custom(() => (
        <ToastWithLink msg={"vous devez connecter"} path={"/login"} />
      ));
      return;
    }
    const toastLoading = toast.loading("Chargement...");
    if (user.role === "courtier") {
      toast.error("Vous ne pouvez pas négocier en tant que courtier.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/start",
        {
          BienId: BienDetails.id,
          userId: user.id,
          courtierId: BienDetails.courtier_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status >= 200 && response.status <= 300) {
        console.log(response);
        dispatch({
          type:"SET_CURRENT_CONVERSATION",
          payload: response.data.conversation,
        })
        dispatch({
          type:"SET_CONVERSATIONS",
          payload: response.data.chats,
        })
        toast.success("Négociation démarrée avec succès !");
        nav("/chat/conversation", { state: { BienDetails } });
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la négociation");
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  if (!BienDetails)
    return <div className="text-center mt-10">Aucun bien trouvé</div>;

  return (
    <div className={`flex flex-col space-y-4 my-24`}>
      <div className="mx-auto w-[90%] flex items-center justify-between">
        <span>
          <button
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center space-x-2 hover:text-[#a4161a]"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>retour</span>
          </button>
        </span>
        <div
          className={`flex items-center text-sm space-x-1 hover:bg-red-100 rounded px-4 py-2 cursor-pointer 
            ${FavorisReducer.includes(BienDetails.id) && "bg-red-100"}
            `}
          onClick={(e) => handleHeartClick(e, BienDetails.id)}
        >
          <Heart
            className={`h-4 
            ${
              FavorisReducer.includes(BienDetails.id)
                ? "fill-red-500 text-red-500"
                : ""
            }
            `}
          />
          <span>
            {FavorisReducer.includes(BienDetails.id)
              ? "Retirer des favoris"
              : "Ajouter aux favoris"}
          </span>
        </div>
      </div>
      <div className={`flex items-start justify-between mx-8`}>
        <div className="relative flex-1 flex justify-center items-center max-h-[550px] overflow-hidden">
          <ImageZoomViewer imageUrl={BienDetails.images[selectedIndex]} />
        </div>

        <div className="overflow-y-auto flex flex-col space-y-2 max-h-[550px] p-2">
          {BienDetails.images.map((img, index) => (
            <img
              src={img}
              alt={`thumbnail-${index}`}
              key={index}
              className={`h-[150px] w-auto object-contain cursor-pointer rounded ${
                index === selectedIndex ? "ring-2 ring-[#a4161a]" : ""
              }`}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>
      <hr className="border-[#b1a7a650]" />
      <div className={`  mx-24 flex items-start justify-between `}>
        <div className="w-2/3 flex flex-col space-y-4">
          <div>
            <h1 className="text-2xl font-bold">.{BienDetails.title}</h1>
            <div>
              <p className="text-sm">{BienDetails.description}</p>
            </div>
          </div>
          <div className="flex justify-between me-4">
            <div className="flex space-x-2 items-center text-xl">
              <img src={brocheDeLocalisation} alt="" className="h-6" />
              <span className="font-semibold">{BienDetails.type}</span>
              <span>à</span>
              <span className="font-semibold">{BienDetails.ville}</span>
              <span>pour</span>
              <span className="font-semibold">{BienDetails.typeAffaire}</span>
            </div>
          </div>
          {BienDetails.meuble === 1 && (
            <div className="border-t border-b border-gray-300 py-4">
              <div className="flex space-x-2 items-center text-[#161a1d]">
                <CircleCheckBig className="w-8" />
                <p className="text-lg font-semibold">
                  Ce Bien est meublé, offre tout le nécessaire pour vivre
                  confortablement, avec des meubles, des appareils et des
                  accessoires.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className=" w-1/4 rounded border border-gray-300 p-4 shadow flex flex-col space-y-6">
          <div className="font-bold my-5 flex flex-col space-y-2">
            <span>{formattedBudget} MAD</span>
            <hr className="border-gray-300" />
          </div>
          <div className="flex space-y-2 flex-col">
            <div className="flex justify-between items-center  w-full">
              <span>superficie :</span>
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold">
                  {BienDetails.superficier} m²
                </span>
                <LandPlot className=" w-4" />
              </div>
            </div>
            <div className="flex justify-between items-center  w-full">
              <span>Nombre de chambres :</span>
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold">{BienDetails.chambres} </span>
                <LayoutGrid className=" w-4" />
              </div>
            </div>
            <div className="flex justify-between items-center  w-full">
              <span>Nombre de salle de bain :</span>
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold">
                  {BienDetails.salles_de_bain}{" "}
                </span>
                <Bath className=" w-4" />
              </div>
            </div>
            <div className="flex justify-between items-center  w-full">
              <span>Nombre d'étage :</span>
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold">
                  {BienDetails.salles_de_bain}{" "}
                </span>
                <Layers className=" w-4" />
              </div>
            </div>
          </div>
          <div className={` flex justify-between text-sm`}>
            {user && user.role === "courtier" ? (
              <div className="flex flex-col items-center justify-start space-y-2">
                <div className="flex items-center text-start justify-start w-full">
                  <p>Action :</p>
                  <button
                    onClick={() => {
                      nav("/MesBiens");
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
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="text-xs">
                    <p>{new Date(BienDetails.created_at).toLocaleString()}</p>
                    <p>{new Date(BienDetails.updated_at).toLocaleString()}</p>
                  </div>
                  <FontAwesomeIcon icon={faCalendar} />
                </div>
              </div>
            ) : (
              <div className="w-full">
                <button
                  className="w-full flex space-x-2 items-center bg-red-500 text-white rounded-2xl px-4 py-2 cursor-pointer hover:bg-red-600"
                  onClick={handleNegocier}
                >
                  <FontAwesomeIcon icon={faComments} />
                  <span>commencer à négocier </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <BienMap ville={BienDetails.ville} quartier={BienDetails.quartier} />

      <hr className="border-[#b1a7a6]" />
      {user && user.role === "courtier" ? (
        <MesBiens />
      ) : (
        filteredBiens.length > 0 && (
          <div className="mx-24 flex flex-col space-y-4 items-start justify-between mt-5">
            <h1 className="text-xl font-semibold flex items-center space-x-3">
              <span>Recommendations</span>
              <Paperclip className="h-5" />
            </h1>
            <div className="items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mx-auto">
              {filteredBiens.slice(0, 5).map((bien) => (
                <BienContainer bien={bien} />
              ))}
            </div>
            <Link
              className="mx-auto bg-red-500 rounded-2xl py-2 px-4 text-white text-sm  w-48 text-center flex items-end hover:underline space-x-2 justify-center"
              to={"/consulter-bien"}
            >
              <span>voir tous les biens</span>
              <MoveRight className="h-4" />
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default DetailsBien;
