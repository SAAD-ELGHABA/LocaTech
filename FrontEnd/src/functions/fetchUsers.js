import axios from "axios";

export const fetchUsers = async (dispatch)=>{
    try {
    const usersResponse = await axios.get("/api/get-users");
    if (usersResponse.status >= 200 && usersResponse.status <= 300) {
      dispatch({
        type: "GET_USERS",
        payload: usersResponse.data.users,
      });
    }
    } catch (error) {
        console.log(error);
        
    }
}