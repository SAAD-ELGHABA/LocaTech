import axios from "axios";
import socketConfig from "./socketConfig";
import ToastWithLink from "../components/ToastWithLink";

export const handleNegocier = async (user,toast,dispatch,BienDetails,nav) => {

    const toastLoading = toast.loading("Chargement...");
    if (user.role === "courtier") {
      toast.error("Vous ne pouvez pas négocier en tant que courtier.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_SOCKET}:5000/api/auth/start`,
        {
          BienId: BienDetails.id,
          userId: user.id,
          courtierId: BienDetails.courtier_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status >= 200 && response.status <= 300) {
        socketConfig.emit("userConnected", {
          userId: user.id,
          conversationId: 1,
          username: user.name,
        });

        localStorage.setItem(
          "currentConversationId",
          response.data.conversation._id
        );
        dispatch({
          type: "SET_CURRENT_CONVERSATION",
          payload: response.data.conversation,
        });
        dispatch({
          type: "SET_CONVERSATIONS",
          payload: response.data.chats,
        });
        toast.success("Négociation démarrée avec succès !");
        nav(`/chat/conversation/${response.data.conversation._id}`, { state: { BienDetails } });
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la négociation");
    } finally {
      toast.dismiss(toastLoading);
    }
  };