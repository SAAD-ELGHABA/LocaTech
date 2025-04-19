import axios from "axios";
import { toast } from "sonner";

export const handleAddFavoris = async (e, id) => {
  const loadingToast = toast.loading("Ajout aux favoris...");
  try {
    const favorisReponse = await axios.post(
      "/api/add-favoris",
      {
        bien_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (favorisReponse.status >= 200 && favorisReponse.status <= 300) {
      return {
        biens_ids: favorisReponse.data.bien_ids,
        message: favorisReponse.data.message,
      };
    }
  } catch (error) {
    console.log(error);
    toast.info(error?.response?.data?.message || "Erreur lors du traitement.");
  } finally {
    toast.dismiss(loadingToast);
  }

  // Always return default fallback object if something goes wrong
  return { biens_ids: null, message: null };
};
