import Conversation from "../models/conversation.js";

export const getConversation = async (req, res, next) => {
  try {
    const { idConversation } = req.params;
    const conversation = await Conversation.findById(idConversation);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    return res.status(200).json(conversation);
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ message: "Error fetching conversation", error: error.message });
  }
}