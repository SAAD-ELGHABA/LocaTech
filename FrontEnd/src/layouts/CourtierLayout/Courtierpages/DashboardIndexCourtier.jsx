/* eslint-disable no-unsafe-optional-chaining */
import {
  ChartCandlestick,
  MessagesSquare,
  MonitorCheck,
  ScrollText,
  ShieldUser,
  Star,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../../functions/fetchConversations";
import MesProcessAccord from "../CourtierComponent/MesProcessAccord";

function DashboardIndexCourtier() {
  const currentCourtier = useSelector((state) => state.ActuelCourtierReducer);
  const conversations = useSelector((state) => state.conversationsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const getConversations = async () => {
      await fetchConversations(currentCourtier.id, dispatch);
    };

    getConversations();
  }, []);

  return (
    <div className="min-h-screen">
      {currentCourtier.length === 0  ? (
        <div className="grid grid-cols-4 gap-4 my-4 animate-pulse">
          <div className="h-25 bg-gray-300 rounded"></div>
          <div className="h-25 bg-gray-300 rounded"></div>
          <div className="h-25 bg-gray-300 rounded"></div>
          <div className="h-25 bg-gray-300 rounded"></div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 gap-2 my-4 mx-8">
          <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
            <ScrollText className="h-6 w-6" />
            <h1 className="text-sm text-gray-600 ">Mes Biens</h1>
            <span className="text-2xl font-bold">
              {currentCourtier?.biens?.length}
            </span>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
            <MessagesSquare className="h-6 w-6" />
            <h1 className="text-sm text-gray-600 ">Mes Conversations</h1>
            <span className="text-2xl font-bold">{conversations?.length}</span>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
            <Star className="h-6 w-6" />
            <div>
              <h1 className="text-sm text-gray-600 ">Mon évaluation</h1>
              <span className="text-xl font-bold">
                {currentCourtier?.agence?.evaluation?.evaluation}
              </span>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
            <MonitorCheck className="h-6 w-6" />
            <h1 className="text-sm text-gray-600 ">Mes Biens Actives</h1>
            <span className="text-2xl font-bold">
              {currentCourtier?.biens?.length > 0 &&
                (currentCourtier?.biens).filter(
                  (b) => b?.status?.id === 5 || b?.status?.id === 1
                ).length}
              /{currentCourtier?.biens?.length}
            </span>
          </div>
        </div>
      )}
      <MesProcessAccord />
    </div>
  );
}

export default DashboardIndexCourtier;
