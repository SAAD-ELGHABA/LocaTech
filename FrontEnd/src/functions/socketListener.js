import axios from "axios";
import socketConfig from "./socketConfig";

export const socketListener = (dispatch, userId , role, currentConversation = null) => {
  if (!userId) return () => {};

  socketConfig.connect();

  socketConfig.emit("register", { id: userId ,role:role});
  console.log(`🔗 User ${userId} (${role}) connected `);
  
  const handleIncomingMessage = async ({ newMessage }) => {
    console.log("💬 Received new message (inside the listener function) :", newMessage);

    try {
      const conversationsResponse = await axios.get(
        `${import.meta.env.VITE_API_SOCKET}:5000/api/get-conversations/conversations/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (conversationsResponse.status >= 200 && conversationsResponse.status <= 300) {
        const conversations = conversationsResponse.data;

        if (userId === 0) {
          console.log("🤖 Assistant mode");
          dispatch({
            type: "GET_CONVERSATION_ASSISTANT",
            payload: conversations,
          });
        } else {
          dispatch({
            type: "SET_CONVERSATIONS",
            payload: conversations,
          });
        }

        if (
          currentConversation &&
          newMessage.conversationId === currentConversation._id
        ) {
          const updatedConversation = conversations.find(
            (conv) => conv._id === currentConversation._id
          );

          if (updatedConversation) {
            dispatch({
              type: "SET_CURRENT_CONVERSATION",
              payload: updatedConversation,
            });
          }
        }
      }
    } catch (error) {
      console.error("❌ Failed to fetch updated conversations:", error);
    }
  };
  socketConfig.connect();
  socketConfig.emit("register", { id: userId ,role:role });

  socketConfig.on("newMessage", handleIncomingMessage);

  return () => {
    socketConfig.off("newMessage", handleIncomingMessage);
    socketConfig.disconnect();
  };
};
