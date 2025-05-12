import axios from "axios";

export const promiseConversation = async (dispatch) => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/assistant/get-all-conversation",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status >= 200 && response.status <= 300) {
            
          dispatch({
            type: "GET_CONVERSATION_ASSISTANT",
            payload: response.data.all_conversations,
          });
          dispatch({
            type: "GET_STATUS_CONVERSATIONS",
            payload: response.data.statusConversations,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };