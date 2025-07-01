import axios from "axios";

export const fetchAdmins = async (dispatch) => {
  try {
    const adminsResponse = await axios.get("/api/get-admins");
    if (adminsResponse.status >= 200 && adminsResponse.status <= 300) {
      dispatch({
        type: "GET_ADMINS",
        payload: adminsResponse.data.admins,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
