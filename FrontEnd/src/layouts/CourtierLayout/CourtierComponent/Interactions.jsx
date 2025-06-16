import axios from "axios";
import {
  Eye,
  LoaderCircle,
  MessageCircleMore,
  MessagesSquare,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import ViewTrackingChart from "../charts/ViewTrackingChart";
import CommentsTrackingChart from "../charts/CommentsTrackingChart";
import CommentaireSection from "../../../components/CommentaireSection";
import { useSelector } from "react-redux";

function Interactions({ setToggleInteractions, toggleInteractions, BienId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [bien, setBien] = useState({});
  const [comments, setComments] = useState({});
  const [views, setViews] = useState({});
  const [convs, setConvs] = useState(0);
  const conversations = useSelector((state) => state.conversationsReducer);

  useEffect(() => {
    setIsLoading(true);
    const getBienInteractions = async () => {
      try {
        const res = await axios.get(`/api/get-bien-interactions/${BienId}`, {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
        });
        setBien(res?.data?.bien);
        setComments(res?.data?.comments);
        setViews(res?.data?.viewCount);
        setConvs(
          conversations?.filter((c) => Number(c?.BienId) === Number(BienId))
            ?.length
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getBienInteractions();
  }, []);
  return (
    <div
      className="fixed inset-0 bg-[#161a1d93] h-screen w-full top-0 left-0 flex items-center justify-center z-[1006]"
      onClick={() => {
        setToggleInteractions(false);
      }}
    >
      <div
        className={`flex flex-col bg-white rounded-lg shadow-xl overflow-hidden custom-scrollbar ${
          toggleInteractions === "waiting"
            ? "w-[20%] h-[30%]"
            : "w-[80%] max-w-[80%] h-[90%] max-h-[90vh]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {toggleInteractions === "waiting" || isLoading ? (
          <div className="flex items-center justify-center h-full">
            <LoaderCircle className="animate-spin h-12 w-12 text-red-500" />
          </div>
        ) : (
          <div className="h-full w-full overflow-y-scroll custom-scrollbar">
            <div className="mx-8 my-4">
              <h1 className="text-xl font-medium">{bien?.title}</h1>
            </div>
            <div className="mx-8 my-4">
              <h1 className="text-sm text-gray-500 font-medium flex items-center space-x-2">
                <span>Nombre de vues</span>
                <Eye className="h-4 w-4" />
                <span>{views?.length}</span>
              </h1>
              <h1 className="text-sm text-gray-500 font-medium flex items-center space-x-2">
                <span>Nombre de commentaires</span>
                <MessageCircleMore className="h-4 w-4" />
                <span>{comments?.length}</span>
              </h1>
              <h1 className="text-sm text-gray-500 font-medium flex items-center space-x-2">
                <span>Nombre de négociations en cours</span>
                <MessagesSquare className="h-4 w-4" />
                <span>{convs}</span>
              </h1>
            </div>
            <div className="h-[50%] w-[95%] mx-8  my-4 flex items-center justify-between">
              <ViewTrackingChart views={views} />
              <CommentsTrackingChart comments={comments} />
            </div>

            <div className="border-t border-gray-300 mx-8">
              <CommentaireSection bienId={bien?.id} isIntersactions={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Interactions;
