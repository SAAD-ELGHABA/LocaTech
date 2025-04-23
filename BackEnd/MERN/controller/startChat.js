import Conversation from "../models/conversation.js";


export const startChat = async (req, res) => {
    try {
      const { userId, courtierId, BienId } = req.body;
  
      if (!userId || !courtierId || !BienId) {
        return res.status(400).json({ message: "Missing required fields in request body" });
      }
  
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const alreadyConversation = await Conversation.findOne({
        clientId: userId,
        courtierId: courtierId,
        BienId: BienId,
      });
      if(alreadyConversation) {
        return res.status(200).json({
          message: "Conversation already exists",
          conversationId: alreadyConversation._id,
          conversation: alreadyConversation,
          chats:req.chats,
        });
      }else {
        const newConversation = new Conversation({
          clientId: userId,
          courtierId: courtierId,
          BienId: BienId,
          messages: [],
          lastMessage: `Salut ! Nous, on est là pour t’aider à gérer ta conversation. Si tu as besoin d’infos, de poser une question ou de lancer la négo, on est là pour ça. On peut commencer quand tu veux !`,
          lastMessageDate: Date.now(),
        });
        
        await newConversation.save();
        return res.status(201).json({
          message: "New conversation created",
          conversation: newConversation,
          chats:req.chats,
        });
      }
  
    } catch (error) {
      console.error("Error starting chat:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  