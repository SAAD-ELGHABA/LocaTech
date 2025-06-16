import axios from "axios";

export const fetchConversations = async (userId,dispatch) => {
    try {
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
        dispatch({
          type: "SET_CONVERSATIONS",
          payload: conversationsResponse.data,
        });
      }
    } catch (error) {
      console.error("Failed to fetch updated conversations:", error);
    }
  };