import Conversation from "../models/conversation.js";
import StatusConversation from "../models/statusConversation.js";

export const fetchAllConversation = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }
    const all_conversations = await Conversation.find({}).sort({ updatedAt: -1 });
    const statusConversations = await StatusConversation.find({}).sort({ updatedAt: -1 });

    return res.status(200).json({all_conversations,statusConversations});
    
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
