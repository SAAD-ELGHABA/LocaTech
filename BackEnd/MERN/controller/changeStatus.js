import Conversation from "../models/conversation.js";
import StatusConversation from "../models/statusConversation.js";

export const changeStatus = async (req, res) => {
  try {
    const { idConversation } = req.params;
    const { newStatus } = req.body;

    const conversation = await Conversation.findById(idConversation);
    if (!conversation) {
      return res.status(400).json({ message: "Conversation non trouvée" });
    }
    if(newStatus === 'supprimé'){
      conversation.messages = []
    }
    conversation.status = newStatus;
    await conversation.save();
    
    const allConversations = await Conversation.find({}).sort({ updatedAt: -1 });
    return res.status(202).json({
      message: `Le statut de la conversation ${idConversation} est maintenant ${newStatus}`,
      allConversations,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
