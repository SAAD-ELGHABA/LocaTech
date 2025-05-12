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
    <div>
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
              ).length
            }
            /{currentCourtier?.biens?.length}
          </span>
        </div>
      </div>
      <div>
        <div className="mx-8 my-4 flex space-x-2 items-center">
          <ChartCandlestick className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Mes Process</h1>
        </div>
        <div className="">

        </div>
      </div>
    </div>
  );
}

export default DashboardIndexCourtier;
