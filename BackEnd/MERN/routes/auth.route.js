import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { startChat } from "../controller/startChat.js";
import { getChats } from "../controller/getChat.js";
const router = express.Router();
router.post("/start",verifyToken, getChats,startChat);
export default router;