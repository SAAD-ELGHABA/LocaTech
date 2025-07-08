import axios from "axios";

export const fetchMyHistory = async (Biens,dispatch) => {
  try {
    const response = await axios.get("/api/my-history",{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    });
const critics = response?.data?.critics;

const bienEffectedHistory = Biens?.map(bien => {
  const matchesVille = critics?.ville?.includes(bien?.ville);
  const matchesType = critics?.types?.includes(bien?.type);
  const matchesTypeAffaire = critics?.typeAffaires?.includes(bien?.typeAffaire);
  const matchesBudget = bien.budget >= critics.budgetRange.min && bien.budget <= critics.budgetRange.max;

  return {
    ...bien,
    matchesCritics: matchesVille && matchesType && matchesTypeAffaire && matchesBudget
  };
});

bienEffectedHistory.sort((a, b) => {
  return (b.matchesCritics === true) - (a.matchesCritics === true);
});

  
      dispatch({
        type: "ALLBIENS",
        payload: bienEffectedHistory,
      });
    return response.data;

  } catch (error) {
    console.log(error);
  }
};