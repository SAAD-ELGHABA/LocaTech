import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  FileLock,
  Flag,
  Heart,
  LandPlot,
  Layers,
  LayoutGrid,
  LoaderCircle,
  MoveRight,
  Paperclip,
} from "lucide-react";
import BienContainer from "./BienContainer";
import { handleAddFavoris } from "../functions/handleAddFavoris";
import ImageZoomViewer from "./ImageZoomViewer";
import ToastWithLink from "./ToastWithLink";
import socketConfig from "../functions/socketConfig.js";
import CommentaireSection from "./CommentaireSection.jsx";
import Signal from "./Signal.jsx";
import BienViewTracker from "./PostViewTracker.jsx";
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
  const [BienDetails, setBienDetails] = useState(null);
  const currentCourtier = useSelector((state) => state.ActuelCourtierReducer);
  const filterBiensReducer = useSelector((state) => state.filterBiensReducer);
  const AllCourtiersReducer = useSelector((state) => state.AllCourtiersReducer);
  const users = useSelector((state) => state.usersReducer);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const nav = useNavigate();
  const navigate = useNavigate();
  const FavorisReducer = useSelector((state) => state.FavorisReducer);
  const conversations = useSelector((state) => state.conversationsReducer);
  const [toggleSignalBien, setToggleSignalBien] = useState(false);

  const detailsBien = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/get-bien-details/${slag}`);
      console.log(response);
      setBienDetails(response?.data?.detailsBien);
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    detailsBien();
  }, [slag]);

  if (isLoading) {
    return (
      <div className="my-24 flex flex-col items-center space-y-4 animate-pulse">
        <div className="flex justify-end w-full mx-auto container">
          <div className="bg-gray-200 w-1/6 h-6 rounded"></div>
        </div>
        <div className="lg:flex space-y-2 lg:space-x-4 w-[90%]">
          <div className="flex-1 h-[200px] lg:h-[400px] bg-gray-200 rounded"></div>
          <div className="lg:w-[200px] space-y-2">
            <div className="h-[150px] bg-gray-200 rounded"></div>
            <div className="h-[150px] bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex items-start w-[90%] space-x-4">
          <div className="w-3/4 space-y-4">
            <div className="h-52 bg-gray-200 w-full rounded"></div>
            <div className="h-12 bg-gray-200 w-full rounded"></div>
            <div className="h-12 bg-gray-200 w-1/2 rounded"></div>
          </div>
          <div className="w-1/4 h-72 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const owner = AllCourtiersReducer.find(
    (courtier) => courtier.id === BienDetails?.courtier_id
  );

  const filteredBiens = Biens.filter(
    (bien) =>
      (bien.id !== BienDetails?.id && bien.type === BienDetails?.type) ||
      bien.ville === BienDetails?.ville
  );

  const formattedBudget = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(BienDetails?.budget);

  const handleHeartClick = async (e, id) => {
    e.preventDefault();
    if (!user) {
      return toast.custom(() => (
        <ToastWithLink msg={"vous devez connecter"} path={"/login"} nav={nav} />
      ));
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
        `${import.meta.env.VITE_API_SOCKET}:5000/api/auth/start`,
        {
          BienId: BienDetails?.id,
          userId: user.id,
          courtierId: BienDetails?.courtier_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status >= 200 && response.status <= 300) {
        socketConfig.emit("userConnected", {
          userId: user.id,
          conversationId: 1,
          username: user.name,
        });

        localStorage.setItem(
          "currentConversationId",
          response.data.conversation._id
        );
        dispatch({
          type: "SET_CURRENT_CONVERSATION",
          payload: response.data.conversation,
        });
        dispatch({
          type: "SET_CONVERSATIONS",
          payload: response.data.chats,
        });
        toast.success("Négociation démarrée avec succès !");
        nav(`/chat/conversation/${0}`, { state: { BienDetails } });
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la négociation");
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  return !BienDetails ? (
    <div className="min-h-screen flex space-y-4 text-gray-700 flex-col items-center justify-center">
      <FileLock className="h-20 w-20" />
      <p className="w-[80%] text-center">
        Ce bien immobilier n'est pas activé ou parce qu'il a été vendu ou loué
      </p>
      <button
        to={""}
        onClick={() => navigate(-1)}
        className="bg-red-500 hover:bg-red-600 py-2 w-1/2 lg:w-1/4 rounded-3xl text-white"
      >
        {" "}
        <span>Retour</span>
      </button>
    </div>
  ) : (
    <div className={`flex flex-col space-y-4 my-20 lg:my-24`}>
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
        <BienViewTracker bienId={BienDetails?.id} userId={user?.id} />

        <div className="flex items-center space-x-2 lg:space-x-4 text-sm">
          <button
            className="flex items-center lg:space-x-1 cursor-pointer hover:underline hover:text-red-500 "
            onClick={() => {
              if (!user) {
                return toast.custom(() => (
                  <ToastWithLink
                    msg={"vous devez connecter"}
                    path={"/login"}
                    nav={nav}
                  />
                ));
              }
              setToggleSignalBien("waiting");
              setTimeout(() => {
                setToggleSignalBien(true);
              }, 2000);
            }}
          >
            <Flag className="h-4" />
            <span className="hidden lg:block">Signaler cette annonce</span>
          </button>
          <div
            className={`flex items-center text-sm space-x-1 hover:bg-red-100 rounded px-2 lg:px-4 py-2 cursor-pointer 
            ${
              FavorisReducer?.some((fv) => fv?.id === BienDetails?.id) &&
              "bg-red-100"
            }
            `}
            onClick={(e) => handleHeartClick(e, BienDetails?.id)}
          >
            <Heart
              className={`h-4 
            ${
              FavorisReducer?.some((fv) => fv?.id === BienDetails?.id)
                ? "fill-red-500 text-red-500"
                : ""
            }
            `}
            />
            <span className="hidden lg:block">
              {FavorisReducer?.some((fv) => fv?.id === BienDetails?.id)
                ? "Retirer des favoris"
                : "Ajouter aux favoris"}
            </span>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col lg:flex-row items-start justify-between mx-8 `}
      >
        <div className="relative flex-1 flex justify-center items-center max-h-[550px] overflow-hidden custom-scrollbar">
          <ImageZoomViewer
            imageUrl={BienDetails?.images[selectedIndex]}
            status={BienDetails?.status}
          />
        </div>

        <div className="overflow-y-auto flex lg:flex-col lg:space-y-2 space-x-2 lg:space-x-0 max-h-[550px] p-2 custom-scrollbar">
          {BienDetails?.images.map((img, index) => (
            <img
              src={img}
              alt={`thumbnail-${index}`}
              key={index}
              className={` max-h-[50px] lg:max-h-[150px] w-auto object-contain cursor-pointer rounded ${
                index === selectedIndex ? "ring-2 ring-[#a4161a]" : ""
              }`}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>
      <hr className="border-[#b1a7a650]" />
      <div
        className={` mx-10 lg:mx-24 flex flex-col lg:flex-row lg:items-start lg:justify-between relative`}
      >
        <div className="lg:w-2/3 flex flex-col space-y-4">
          <div>
            <h1 className="text-lg lg:text-2xl font-semibold">
              {BienDetails?.title}
            </h1>
            <div>
              <p className=" text-xs lg:text-sm">{BienDetails?.description}</p>
            </div>
          </div>
          <div className="flex justify-between me-4">
            <div className="flex space-x-2 items-center  text-lg lg:text-xl">
              <img src={brocheDeLocalisation} alt="" className="h-5 lg:h-6" />
              <span className="font-semibold">{BienDetails.type}</span>
              <span>à</span>
              <span className="font-semibold">{BienDetails.ville}</span>
              <span>pour</span>
              <span className="font-semibold">{BienDetails.typeAffaire}</span>
            </div>
          </div>
          {BienDetails.meuble === 1 && (
            <div className="border-t border-b border-gray-300 py-4">
              <div className="flex space-x-3 items-center text-[#161a1d]">
                <CircleCheckBig className="w-10 lg:w-8" />
                <p className="text-sm lg:text-lg font-semibold">
                  Ce Bien est meublé, offre tout le nécessaire pour vivre
                  confortablement, avec des meubles, des appareils et des
                  accessoires.
                </p>
              </div>
            </div>
          )}
          <div>
            {owner ? (
              <div className="border-t border-b border-gray-300 py-4 flex space-x-2 space-y-1 justify-start items-center  h-full ">
                <div>
                  <img
                    src={owner?.user?.image}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div>
                  <p className="text-sm lg:text-[17px]  font-semibold">
                    {owner?.user?.nom + " " + owner?.user?.prenom}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-500">
                    {owner.Brève_présentation
                      ? owner.Brève_présentation
                      : owner?.Années_expérience
                      ?
                      owner?.Années_expérience+" ans d'expérience":
                      "sans expérience"
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="animate-pulse flex items-center space-x-3 py-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex flex-col space-y-2">
                  <div className="w-30 h-4 bg-gray-300"></div>
                  <div className="w-40 h-4 bg-gray-300"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="shadow-xl lg:w-1/4 rounded-xl border border-gray-100 p-4 flex flex-col-reverse sticky top-1/2">
          <div className="font-bold my-3 justify-center flex flex-col space-y-4">
            <hr className="border-gray-300" />
            <span>{formattedBudget} MAD</span>
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
                <span className="font-semibold">{BienDetails.etage} </span>
                <Layers className=" w-4" />
              </div>
            </div>
          </div>
          <div className={` flex justify-between text-sm my-4`}>
            {user &&
            user.role === "courtier" &&
            BienDetails.courtier_id === currentCourtier.id ? (
              <div className="flex flex-col items-center justify-start space-y-2 w-full border-b pb-4 border-gray-300 ">
                <div className="flex items-center text-start justify-between space-x-2 w-full">
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
                    className="px-2 py-2 cursor-pointer flex space-x-2 items-center hover:bg-gray-100 rounded"
                  >
                    <FontAwesomeIcon icon={faPen} />
                    <span className="hidden lg:flex">Modifier</span>
                  </button>
                  <button
                    className="px-2 py-2  cursor-pointer text-red-500 flex space-x-2 items-center hover:bg-red-100 rounded"
                    onClick={() => handleDeleteBien(BienDetails.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span className="hidden lg:flex">Supprimer</span>
                  </button>
                </div>
                <div className="w-full flex items-center justify-start space-x-4 text-gray-600">
                  <div className="text-xs">
                    <p>{new Date(BienDetails.created_at).toLocaleString()}</p>
                    <p>{new Date(BienDetails.updated_at).toLocaleString()}</p>
                  </div>
                  <FontAwesomeIcon icon={faCalendar} />
                </div>
              </div>
            ) : (
              !user ||
              (user.role === "user" && (
                <div className="w-full">
                  <button
                    className="w-full flex space-x-2 items-center bg-red-500 text-white rounded-2xl px-4 py-2 cursor-pointer hover:bg-red-600"
                    onClick={async () => {
                      if (!user) {
                        toast.custom(() => (
                          <ToastWithLink
                            msg={"vous devez connecter"}
                            path={"/login"}
                          />
                        ));
                        return;
                      }
                      await handleNegocier(
                        user,
                        toast,
                        dispatch,
                        BienDetails,
                        nav
                      );
                    }}
                  >
                    <FontAwesomeIcon icon={faComments} />
                    <span>
                      {conversations.find(
                        (b) => Number(b?.BienId) === Number(BienDetails?.id)
                      )
                        ? "Continuer la négociation.."
                        : "Commencer à négocier"}{" "}
                    </span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div>
        <CommentaireSection bienId={BienDetails?.id} />
      </div>
      <BienMap ville={BienDetails.ville} quartier={BienDetails.quartier} />

      <hr className="border-[#b1a7a6]" />
      {user && user.role === "courtier" ? (
        <div className="w-[95%] mx-auto overflow-y-auto custom-scrollbar">
          <MesBiens />
        </div>
      ) : (
        filteredBiens.length > 0 && (
          <div className="mx-6 lg:mx-12 flex flex-col space-y-4 items-start justify-between mt-5">
            <h1 className="text-xl font-semibold flex items-center space-x-3">
              <span>Recommendations</span>
              <Paperclip className="h-5" />
            </h1>
            <div className="items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mx-auto">
              {filteredBiens.slice(0, 8).map((bien) => (
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

      {(toggleSignalBien === "waiting" || toggleSignalBien) && (
        <Signal
          setToggleSignalBien={setToggleSignalBien}
          toggleSignalBien={toggleSignalBien}
          BienDetails={BienDetails}
        />
      )}
    </div>
  );
}

export default DetailsBien;
