import axios from "axios";

export const fetchUser = async (dispatch,token)=>{
          const userResponse = await axios.get("/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (userResponse.status >= 200 && userResponse.status < 300) {
            const userData = userResponse.data;
            dispatch({
              type: "LOGIN",
              payload: userData,
            });
            const FavorisResponse = await axios.get("/api/get-user-favoris", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (FavorisResponse.status >= 200 && FavorisResponse.status < 300) {
              dispatch({
                type: "ADD_TO_FAVORIS",
                payload: FavorisResponse.data.biens,
              });
            }
        }}