import axios from "axios";


export const fetchAgence = async (dispatch) => {
  try {
    const response = await axios.get("/api/get-agences", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status >= 200 && response.status <= 300) {
      dispatch({
        type: "GET_AGENCES",
        payload: response.data.agences,
      });
      return response.data.agences;
    } else {
      console.error("Erreur lors de la récupération des agences:", response);
      return [];
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des agences:", error);
    return [];
  }
}