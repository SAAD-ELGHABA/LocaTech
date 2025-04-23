import axios from "axios";
import { toast } from "sonner";

export const fetchInitialData = async (dispatch, token) => {
  try {
    const villesResponse = await axios.get("/api/ville");
    if (villesResponse.status >= 200) {
      dispatch({
        type: "GET_VILLES",
        payload: villesResponse.data.villes,
      });
    } else {
      toast.error("Erreur lors de la récupération des villes");
    }

    const statusResponse = await axios.get("/api/status");
    if (statusResponse.status >= 200 && statusResponse.status <= 300) {
      dispatch({
        type: "GET_STATUS",
        payload: statusResponse.data,
      });
    }

    const biensResponse = await axios.get("/api/Biens");
    if (biensResponse.status >= 200 && biensResponse.status <= 300) {
      dispatch({
        type: "ALLBIENS",
        payload: biensResponse.data.Biens,
      });
    }

    const commandeResponse = await axios.get("/api/get-commandes");
    if (commandeResponse.status >= 200 && commandeResponse.status <= 300) {
      dispatch({
        type: "GET_COMMANDES",
        payload: commandeResponse.data.commandes,
      });
    }

    if (token) {
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
            payload: FavorisResponse.data.bien_ids,
          });
        }



        if (userData.role === "courtier") {
          try {
            const courtierResponse = await axios.post("/api/ActuelCourtier", {
              user_id: userData.id,
            });

            if (
              courtierResponse.status >= 200 &&
              courtierResponse.status <= 300
            ) {
              dispatch({
                type: "ActuelCourtier",
                payload: courtierResponse.data.ActuelCourtier,
              });
            }
          } catch (error) {
            console.error("Erreur lors de la récupération du courtier :", error);
          }
        }
      }
    }else{
        dispatch({
            type:"RESET_FAVORIS"
        })
    }
  } catch (error) {
    console.error("Erreur lors du chargement initial :", error);
  }finally {
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  }
  toast.dismiss();
};
