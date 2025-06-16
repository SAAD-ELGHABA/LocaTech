import axios from "axios";
import socketConfig from "./socketConfig";

export const socketListener = (dispatch,userId,currentConversation=null)=>{
  console.log('outside',userId);
  
  const handleIncomingMessage = async (newMessage) => {
    console.log('inside',userId);
    try {
      // VITE_URL_SOCKET
      const conversationsResponse = await axios.get(
        `${import.meta.env.VITE_API_SOCKET}:5000/api/get-conversations/conversations/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (
        conversationsResponse.status >= 200 &&
        conversationsResponse.status <= 300
      ) {
        console.log(conversationsResponse);
        if(userId === 0){
          console.log('assistant',newMessage?.senderId);
          
          dispatch({
            type: "GET_CONVERSATION_ASSISTANT",
            payload: conversationsResponse.data,
          });
        }
        else{
          dispatch({
            type: "SET_CONVERSATIONS",
            payload: conversationsResponse.data,
          });
        }
  
        if (currentConversation && newMessage.conversationId === currentConversation?._id) {
          const updatedConversation = conversationsResponse.data.find(
            (conv) => conv._id === currentConversation._id
          );
          
          if (updatedConversation) {
            dispatch({
              type: "SET_CURRENT_CONVERSATION",
              payload: updatedConversation,
            });
          }
        }
      }else{
        console.log('test');
        
      }
    } catch (error) {
      console.error("Failed to fetch updated conversations:", error);
    }
  };
  

    socketConfig.on("receiveMessage", handleIncomingMessage);
    return () => socketConfig.off("receiveMessage", handleIncomingMessage);
  }