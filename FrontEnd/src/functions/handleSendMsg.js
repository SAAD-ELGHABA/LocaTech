import axios from "axios";
import socketConfig from "./socketConfig";

export const handleSendMessage = async (dispatch,currentConversation,userId,inputValue,setInputValue,
    setIsSending=()=>{}) => {
    setIsSending(true);
    if (inputValue.trim() === "") {
      setIsSending(false);
      return;
    }
    const newMessage = {
      conversationId: currentConversation._id,
      senderId: userId,
      text: inputValue.trim(),
    };
    
    setInputValue("");
    try {
      const sendMessageResponse = await axios.post(
        `${import.meta.env.VITE_API_SOCKET}:5000/api/chat/send`,
        newMessage,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (
        sendMessageResponse.status >= 200 &&
        sendMessageResponse.status <= 300
      ) {
        socketConfig.emit("newMessage", {
          newMessage: newMessage,
        });
        dispatch({
          type: "SET_CONVERSATIONS",
          payload: sendMessageResponse.data.allConversations,
        });
        dispatch({
          type: "SET_CURRENT_CONVERSATION",
          payload: sendMessageResponse.data.conversation,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };