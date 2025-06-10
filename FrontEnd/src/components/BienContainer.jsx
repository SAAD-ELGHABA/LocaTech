import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import brocheDeLocalisation from "../assets/broche-de-localisation.gif";
import {
  Bath,
  Bed,
  LandPlot,
  Heart,
  MapPinCheckInside,
  Star,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { handleAddFavoris } from "../functions/handleAddFavoris";
import { toast } from "sonner";
import ToastWithLink from "./ToastWithLink";
import { handleNegocier } from "../functions/handleNegocier.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

function BienContainer({ bien, isRecent, chatMode = false, rating = null }) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const FavorisReducer = useSelector((state) => state.FavorisReducer);
  const user = useSelector((state) => state.userReducer.userInfo);
  const conversations = useSelector((state) => state.conversationsReducer);

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
  const nav = useNavigate();
  return (
    <Link
      to={`/bien/${bien.ville}/${bien.slag}`}
      key={bien.id}
      className="relative bg-white rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      {isRecent && (
        <span className="absolute top-2 start-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
          Récente
        </span>
      )}

      <Heart
        className={`absolute top-2 right-2 w-5 z-5 cursor-pointer transition-colors duration-200 ${
          isHovered || FavorisReducer?.some((fv) => fv?.id === bien?.id)
            ? "text-red-500 fill-red-500"
            : "text-red-500 fill-[#6a728231]"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => handleHeartClick(e, bien.id)}
      />

      <img
        src={bien.images[0]}
        alt="bien images"
        className="w-full h-48 object-cover"
      />
      {chatMode ? (
        <div className="flex flex-col items-center space-y-2 mt-2">
          <h2 className="text-lg font-semibold text-center text-gray-800">
            {bien.title.length > 25 ? (
              <div>{bien.title.substring(0, 25)}..</div>
            ) : (
              bien.title
            )}
          </h2>
          <button
            className="w-full flex space-x-2 items-center bg-red-500 text-white rounded-2xl px-4 py-2.5 cursor-pointer hover:bg-red-600 justify-center text-sm"
            onClick={async () => {
              if (!user) {
                toast.custom(() => (
                  <ToastWithLink msg={"vous devez connecter"} path={"/login"} />
                ));
                return;
              }
              await handleNegocier(user, toast, dispatch, bien, nav);
            }}
          >
            <span>
              {conversations.some((conv) => Number(conv.BienId) === bien.id) ? (
                <span className="flex justify-center items-center space-x-2">
                  <span>Continuer la négociation ..</span>
                </span>
              ) : (
                <span className="flex justify-center items-center space-x-2">
                  <FontAwesomeIcon icon={faComments} />
                  <span>Commencer à négocier</span>
                </span>
              )}
            </span>
          </button>
        </div>
      ) : (
        <div className="p-3 space-y-1 text-sm">
          <h2 className="text-lg font-semibold text-left text-gray-800">
            {bien.title.length > 25 ? (
              <div>{bien.title.substring(0, 25)}..</div>
            ) : (
              bien.title
            )}
          </h2>
          <p className="text-gray-600 text-left flex items-center">
            <MapPinCheckInside className="h-4" />
            <span>{bien.ville}</span>
          </p>
          {!rating && (
            <div className="text-gray-600 flex text-sm items-center justify-between">
              <p className="flex items-center space-x-1.5">
                <LandPlot className="w-4" />
                <span>{bien.superficier} m²</span>
              </p>
              <p className="flex items-center space-x-1.5">
                <span>{bien.chambres}</span>
                <Bed className="w-4" />
              </p>
              <p className="flex items-center space-x-1.5">
                <span>{bien.salles_de_bain}</span>
                <Bath className="w-4" />
              </p>
            </div>
          )}
          <p className="text-gray-600 text-left flex items-center justify-between">
            <span className="text-[#f56565] font-bold text-sm">
              {new Intl.NumberFormat("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(bien.budget)}{" "}
              MAD
            </span>
            {rating && (
              <div className="flex space-x-1 items-center">
                <Star className="h-3 w-3 fill-black" />
                <span>{Number(rating.toFixed(2))}</span>
              </div>
            )}
          </p>
        </div>
      )}
    </Link>
  );
}

export default BienContainer;
