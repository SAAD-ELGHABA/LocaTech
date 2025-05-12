import axios from "axios";

export const getUserInfo = async (token) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };
  