import React, { useEffect } from "react";
import Aside from "./component/Aside";
import { Outlet } from "react-router";
import { MessageCircleQuestion } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

function ChatRealTimePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.userInfo);
  const currentCourtier = useSelector((state) => state.ActuelCourtierReducer);
  useEffect(() => {
    const fetchData = async () => {
      const userId =
        user.role === "user"
          ? user.id
          : user.role === "courtier"
          ? currentCourtier.id
          : null;
      try {
        const ConversationsResponse = await axios.get(
          `http://localhost:5000/api/get-conversations/conversations/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (
          ConversationsResponse.status >= 200 &&
          ConversationsResponse.status < 300
        ) {
          dispatch({
            type: "SET_CONVERSATIONS",
            payload: ConversationsResponse.data,
          });

          const currentConversationId = localStorage.getItem(
            "currentConversationId"
          );

          if (currentConversationId) {
            const currentConversation = ConversationsResponse.data.find(
              (conversation) => conversation._id === currentConversationId
            );
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
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex ">
        <div className="w-2/6 lg:block hidden">
          <Aside />
        </div>
        <div className="lg:w-4/6 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ChatRealTimePage;
