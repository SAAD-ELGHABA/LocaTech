import React, { useEffect } from "react";
import Aside from "./component/Aside";
import { Outlet } from "react-router";
import { MessageCircleQuestion } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

function ChatRealTimePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ConversationsResponse = await axios.get(
          "http://localhost:5000/api/get-conversations/conversations",
          // /api/get-conversations/conversations
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (
          ConversationsResponse.status >= 200 &&
          ConversationsResponse.status <= 300
        ) { 
          console.log(ConversationsResponse.data);
          
          dispatch({
            type: "SET_CONVERSATIONS",
            payload: ConversationsResponse.data,
          });
          const currentConversationId = localStorage.getItem(
            "currentConversationId"
          );
          if (currentConversationId) {
            const currentConversation =
              ConversationsResponse.data.find(
                (conversation) => conversation._id === currentConversationId
              );
              console.log(currentConversation);
              
            dispatch({
              type: "SET_CURRENT_CONVERSATION",
              payload: currentConversation,
            });
          } else {
            dispatch({
              type: "SET_CURRENT_CONVERSATION",
              payload: {},
            });
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Erreur lors du chargement des données.");
      }
    };
    fetchData();
  },[]);
  return (
    <div>
      <div className="flex ">
        <div className="w-2/6 ">
          <Aside />
        </div>
        <div className="w-4/6 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ChatRealTimePage;
