import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, interpolate } from "framer-motion";
import { Star } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ToastWithLink from "./ToastWithLink";
import { sendNotification } from "../functions/NotificationSender";

function CommentaireSection({ bienId, isIntersactions = false }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const BienCommentaireReducer = useSelector(
    (state) => state.BienCommentaireReducer
  );
  const [bienOwner, setBienOwner] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const getCommentaires = async () => {
      try {
        const res = await axios.get(`/api/get-commentaires-bien/${bienId}`);
        if (res.status >= 200 && res.status <= 300) {
          setBienOwner(res?.data?.bienOwner);
          dispatch({
            type: "GET_BIEN_COMMENTAIRES",
            payload: res.data.commentaires,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCommentaires();
  }, []);
  const user = useSelector((state) => state.userReducer.userInfo);

  const handleSubmit = async () => {
    if (!user) {
      toast.custom(() => (
        <ToastWithLink msg={"vous devez connecter"} path={"/login"} />
      ));
    }
    if (rating < 1 || rating > 5) {
      toast.error("Veuillez sélectionner une note entre 1 et 5 étoiles.");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Le commentaire doit contenir au moins 10 caractères.");
      return;
    }

    const data = new FormData();
    data.append("bien_id", bienId);
    data.append("rating", rating);
    data.append("comment", comment);

    try {
      const res = await axios.post("/api/rating-bien", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status >= 200 && res.status <= 300) {
        dispatch({
          type: "ADD_COMMENTAIRE",
          payload: res.data.rating,
        });
        toast.success("Merci pour votre avis !");
        setShowFeedback(false);
        setRating(0);
        setComment("");
        await sendNotification(
          user?.id,
          bienOwner?.user?.id,
          "Un commentaire a été ajouté à votre annonce",
          `${
            user?.nom + " " + user?.prenom
          } a ajouté un commentaire à votre annonce et a donné une notation ⭐ !`,
          {
            link: "/chat/conversation",
          }
        );
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      console.error(error);
    }
  };
  const averageRating = useMemo(() => {
    if (BienCommentaireReducer.length === 0) return 0;
    const total = BienCommentaireReducer.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    return total / BienCommentaireReducer.length;
  }, [BienCommentaireReducer]);

  const roundedRating = Math.round(averageRating);

  return (
    <div className="mx-auto my-6 w-[90%]">
      <div className="flex items-center justify-between my-4">
        <div className="lg:w-1/2 w-full ">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Note moyenne
            </h3>
            <div className="flex items-center space-x-1 ">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="h-4 w-4 lg:h-6 lg:w-6"
                  color={i <= Math.round(averageRating) ? "black" : "#d1d5db"}
                  fill={i <= Math.round(averageRating) ? "black" : "none"}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 lg:w-1/2">
            <h4 className="text-md font-semibold text-gray-800 mb-2">
              Évaluation globale
            </h4>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = BienCommentaireReducer.filter(
                (c) => c.rating === star
              ).length;
              const percent =
                BienCommentaireReducer.length > 0
                  ? (count / BienCommentaireReducer.length) * 100
                  : 0;

              return (
                <div key={star} className="flex items-center space-x-2 mb-1">
                  <span className="text-sm text-gray-700 w-4">{star}</span>
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className="bg-black h-2 rounded"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {isIntersactions || !isIntersactions&& (
          <div className="lg:flex items-center space-x-2 hidden ">
            <div className="text-4xl font-bold">
              {(() => {
                let avg = 0;
                const ratings = BienCommentaireReducer?.map(
                  (bc) => bc?.rating
                ).filter((rating) => typeof rating === "number");
                if (ratings?.length > 0) {
                  avg =
                    ratings.reduce((sum, rating) => sum + rating, 0) /
                    ratings.length;
                }
                return avg.toFixed(1); 
              })()}
            </div>
            <Star className="w-12 h-12 fill-black" />
          </div>
        )}
      </div>
      {!isIntersactions && (
        <div className="flex justify-end">
          <button
            onClick={toggleFeedback}
            className={`border-red-500 text-sm border text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition duration-300 flex items-center space-x-2 cursor-pointer ${
              showFeedback && "bg-red-100"
            }`}
          >
            <Star className="h-4 w-4" />
            <span>Donner votre feedback</span>
          </button>
        </div>
      )}
      {!isIntersactions && (
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="mt-6 p-6 bg-white rounded-xl shadow-xs border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Votre avis
              </h3>
              <div></div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="cursor-pointer transition-transform hover:scale-110 h-5"
                    color={(hover || rating) >= star ? "black" : "black"}
                    fill={(hover || rating) >= star ? "black" : "none"}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Laissez un commentaire..."
                className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-1 focus:ring-red-400"
                rows={4}
              />

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="cursor-pointer bg-red-600 text-white px-6 py-2 rounded-2xl hover:bg-red-700 transition duration-300"
                >
                  Envoyer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <div>
        <div className="mt-8 space-y-6 grid lg:grid-cols-2 grid-cols-1">
          {(showAll
            ? BienCommentaireReducer
            : BienCommentaireReducer.slice(0, 6)
          ).map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg ">
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    src={item?.user?.image}
                    alt="user-image"
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {item?.user?.nom} {item?.user?.prenom}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item?.user?.role === "user"
                      ? "utilisateur"
                      : item?.user?.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center my-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 `}
                    color={i <= item.rating ? "black" : "black"}
                    fill={i <= item.rating ? "black" : "none"}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {item.comment}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {BienCommentaireReducer.length > 6 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-red-500 hover:underline text-sm"
            >
              {showAll ? "Voir moins" : "Voir plus"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentaireSection;
