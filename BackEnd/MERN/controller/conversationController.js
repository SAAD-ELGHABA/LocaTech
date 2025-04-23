import Conversation from "../models/conversation.js";

export const sendMessage = async (req, res) => {
  const { conversationId, senderId, text } = req.body;
  const { userId } = req.params;

  if (!conversationId || !senderId || !text) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found." });
    }

    const newMessage = {
      senderId,
      text,
      createdAt: new Date(),
    };

    conversation.messages.push(newMessage);
    conversation.lastMessage = text;
    conversation.lastMessageDate = new Date();
    conversation.isRead = false; 

    await conversation.save();
    const allConversations = await Conversation.find({
        users: { $in: [userId] },
        messages: { $exists: true, $not: { $size: 0 } }
      }); 
    return res.status(200).json({ message: "Message sent", conversation,conversations:allConversations});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
