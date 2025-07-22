import axios from "axios";

export const fetchBiens = async (dispatch,limit=10)=>{
        const biensResponse = await axios.get(`/api/Biens/${limit}`);
    if (biensResponse.status >= 200 && biensResponse.status <= 300) {
      dispatch({
        type: "ALLBIENS",
        payload: biensResponse.data.Biens,
      });
      
    }
}