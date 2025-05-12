import { getUserInfo } from "../functions/userPromise.js";
import Conversation from "../models/conversation.js";

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const sanitizeMessage = (message, userInfo) => {
  let sanitizedMessage = message;
  if (userInfo.telephone) {
    const phoneRegexExact = new RegExp(escapeRegExp(userInfo.telephone), 'gi');
    sanitizedMessage = sanitizedMessage.replace(phoneRegexExact, "**********");
  }

  if (userInfo.email) {
    const emailRegexExact = new RegExp(escapeRegExp(userInfo.email), 'gi');
    sanitizedMessage = sanitizedMessage.replace(emailRegexExact, "**********");
  }

  if (userInfo.adresse) {
    const addressRegexExact = new RegExp(escapeRegExp(userInfo.adresse), 'gi');
    sanitizedMessage = sanitizedMessage.replace(addressRegexExact, "**********");
  }

  const generalPhoneRegex = /(\+?\d{1,2}\s?)?(\(?\d{3}\)?)[\s\-]?\d{3}[\s\-]?\d{4}/g;
  sanitizedMessage = sanitizedMessage.replace(generalPhoneRegex, "**********");

  const generalEmailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
  sanitizedMessage = sanitizedMessage.replace(generalEmailRegex, "**********");

  return sanitizedMessage;
};


export const sendMessage = async (req, res) => {
  const { conversationId, senderId, text } = req.body;
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  if(senderId !== 0){
    if (!conversationId || !senderId || !text ) {
      return res.status(400).json({ message: "Missing required fields." });
    }
  }

  try {
    const userInfo = await getUserInfo(token);
    if (!userInfo) {
      return res.status(400).json({ message: "User info could not be fetched." });
    }

    const sanitizedText = sanitizeMessage(text, userInfo);

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found." });
    }

    const newMessage = {
      senderId,
      text: sanitizedText,
      createdAt: new Date(),
    };

    conversation.messages.push(newMessage);
    conversation.lastMessage = sanitizedText;
    conversation.lastMessageDate = new Date();
    conversation.isRead = false;

    await conversation.save();
    let allConversations ;
        if (senderId == '0') {
          allConversations = await Conversation.find({}).sort({ updatedAt: -1 });
          return res.status(200).json({ message: "Message sent", conversation, allConversations: allConversations });
        }
        else{
          allConversations = await Conversation.find({
            $or: [{ clientId: String(senderId) }, { courtierId: String(senderId) }],
            messages: { $exists: true, $not: { $size: 0 } }
          });
        }
 
    return res.status(200).json({ message: "Message sent", conversation, allConversations: allConversations });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
