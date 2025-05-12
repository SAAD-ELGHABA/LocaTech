import Conversation from "../models/conversation.js";

export const fetchConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    let conversations;
    if (userId == '0') {
      conversations = await Conversation.find({}).sort({ updatedAt: -1 });
      return res.status(200).json(conversations);
    }
    
    else{
      conversations = await Conversation.find({
        $or: [{ clientId: String(userId) }, { courtierId: String(userId) }],
        messages: { $exists: true, $not: { $size: 0 } }
      });
      return res.status(200).json(conversations);

    }

  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Error fetching conversations", error: error.message });
  }
};
