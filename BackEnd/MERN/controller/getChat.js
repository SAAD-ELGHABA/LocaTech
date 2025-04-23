import Conversation from "../models/conversation.js";

export const getChats = async (req, res,next) => {
  try {
    const { userId } = req.params;
    const chats = await Conversation.find({ users: { $in: [userId] } });
    req.chats = chats;
    next();
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Error fetching chats", error: error.message });
  }
}
