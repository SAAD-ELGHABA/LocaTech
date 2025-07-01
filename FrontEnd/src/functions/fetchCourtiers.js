import axios from "axios";

export const fetchCourtiers = async (dispatch) => {
  try {
    const response = await axios.get("/api/get-courtiers", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status >= 200 && response.status <= 300) {
      dispatch({
        type: "GET_ALL_COURTIERS",
        payload: response.data.courtiers,
      });
      return response.data.courtiers;
    } else {
      console.error("Erreur lors de la récupération des courtiers:", response);
      return [];
    }

  } catch (error) {
    console.error("Erreur lors de la récupération des courtiers:", error);
    return [];
  }
}