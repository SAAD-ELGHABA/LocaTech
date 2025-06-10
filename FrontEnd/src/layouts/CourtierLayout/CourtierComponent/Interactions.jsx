import axios from "axios";
import { Eye, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import ViewTrackingChart from "../charts/ViewTrackingChart";

function Interactions({ setToggleInteractions, toggleInteractions, BienId }) {
  const [bien, setBien] = useState({});
  const [comments, setComments] = useState({});
  const [views, setViews] = useState({});
  useEffect(() => {
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
      } catch (error) {
        console.log(error);
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
        {toggleInteractions === "waiting" ? (
          <div className="flex items-center justify-center h-full">
            <LoaderCircle className="animate-spin h-12 w-12 text-red-500" />
          </div>
        ) : (
          <div className="h-100 w-full">
            <div className="mx-8 my-4">
              <h1 className="text-xl font-medium">{bien?.title}</h1>
            </div>
            <div className="mx-8 my-4">
              <h1 className="text-lg text-gray-500 font-medium flex items-center space-x-2">
                <span>Nombre de vues</span>
                <Eye />
                <span>{views?.length}</span>
              </h1>
            </div>
            <div className="h-[20vh] w-[20%] mx-8 my-4">
              <ViewTrackingChart views={views}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Interactions;
