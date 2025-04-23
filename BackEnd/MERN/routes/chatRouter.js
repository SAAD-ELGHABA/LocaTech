import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { sendMessage } from "../controller/conversationController.js";
import { fetchConversations } from "../controller/fetchConversations.js";
const chatRouter = express.Router();
chatRouter.post("/send",verifyToken,sendMessage);
chatRouter.get("/conversations",verifyToken,fetchConversations);
export default chatRouter;