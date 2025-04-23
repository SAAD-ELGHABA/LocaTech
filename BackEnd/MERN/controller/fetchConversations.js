import Conversation from "../models/conversation.js";

export const fetchConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({
        users: { $in: [userId] },
        messages: { $exists: true, $not: { $size: 0 } }
      });

    if (!conversations || conversations.length === 0) {
      return res.status(404).json({ message: "No conversations found" });
    }

    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Error fetching conversations", error: error.message });
  }
}