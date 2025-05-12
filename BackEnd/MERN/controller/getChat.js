import Conversation from "../models/conversation.js";

export const getChats = async (req, res,next) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({
      $or: [{ clientId: String(userId) }, { courtierId: String(userId) }],
      messages: { $exists: true, $not: { $size: 0 } }
    });
    req.chats = conversations;
    next();
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Error fetching chats", error: error.message });
  }
}
