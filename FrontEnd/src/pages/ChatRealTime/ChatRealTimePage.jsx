import React, { useEffect } from "react";
import Aside from "./component/Aside";
import { Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { socketListener } from "../../functions/socketListener";

function ChatRealTimePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.userInfo);
  const currentCourtier = useSelector((state) => state.ActuelCourtierReducer);
  const currentConversation = useSelector(
    (state) => state.currentConversationReducer
  );
  useEffect(() => {
    const fetchData = async () => {
      const userId =
        user?.role === "user"
          ? user?.id
          : user?.role === "courtier"
          ? currentCourtier?.id
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

  let userId;

  if (user?.role === "user") {
    userId = user?.id;
  } else if (user?.role === "courtier") {
    userId = currentCourtier?.id;
  } else if (user?.role === "assistant") {
    userId = 0;
  }
  useEffect(() => {
    console.log(`🔗 User ${userId} (${user?.role}) connected in the chat page ...`);
    
    const unsubscribe = socketListener(dispatch, userId,user?.role, currentConversation);
    return () => {
      unsubscribe();
    };
  }, [currentConversation, dispatch, userId]);

  const location = useLocation();
  return (
    <div>
      <div className="lg:flex">
        <div
          className={`${
            ["/chat/conversation"].some((path) =>
              location.pathname.startsWith(path)
            )
              ? "hidden lg:flex lg:w-2/6"
              : "block w-full lg:flex lg:w-2/6"
          }`}
        >
          <Aside />
        </div>

        <div
          className={`flex w-full lg:flex lg:w-4/6 
            `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ChatRealTimePage;
