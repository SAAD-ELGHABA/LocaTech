import React, { useState } from "react";
import { Link } from "react-router-dom";
import brocheDeLocalisation from "../assets/broche-de-localisation.gif";
import { Bath, Bed, LandPlot, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { handleAddFavoris } from "../functions/handleAddFavoris";
import { toast } from "sonner";
import ToastWithLink from "./ToastWithLink";

function BienContainer({ bien, isRecent }) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const FavorisReducer = useSelector((state) => state.FavorisReducer);
  const user = useSelector((state) => state.userReducer.userInfo);

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

  return (
    <Link
      to={`/details-bien-client/${bien.id}`}
      key={bien.id}
      className="relative bg-white rounded shadow overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      {isRecent && (
        <span className="absolute top-2 start-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
          Récente
        </span>
      )}

      <Heart
        className={`absolute top-2 right-2 w-5 z-5 cursor-pointer transition-colors duration-200 ${
          isHovered || FavorisReducer.includes(bien.id)
            ? "text-red-500 fill-red-500"
            : "text-gray-500"
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

      <div className="p-3 space-y-1 text-sm">
        <h2 className="text-lg font-semibold text-left text-gray-800">
          {bien.title.length > 25 ? (
            <div>{bien.title.substring(0, 25)}+...</div>
          ) : (
            bien.title
          )}
        </h2>
        <p className="text-gray-600 text-left flex items-center space-x-2">
          <strong>
            <img
              src={brocheDeLocalisation}
              alt="localisation"
              className="h-5"
            />
          </strong>
          <span>{bien.ville}</span>
        </p>
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
        <p className="text-gray-600 text-left">
          <span className="text-[#f56565] font-bold text-sm">
            {new Intl.NumberFormat("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(bien.budget)}{" "}
            MAD
          </span>
        </p>
      </div>
    </Link>
  );
}

export default BienContainer;
