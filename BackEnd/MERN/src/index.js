import express from 'express';
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from '../routes/auth.route.js';
import chatRouter from '../routes/chatRouter.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config({ path: './config/.env' });

const app = express();
const httpServer = createServer(app); 
const io = new Server(httpServer, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.VITE_PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', router);
app.use('/api/chat', chatRouter);
app.use('/api/get-conversations', chatRouter);
app.use('/api/assistant', chatRouter);

io.on("connection", (socket) => {
    console.log("✅ New client connected:", socket.id);
  
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined room: ${conversationId}`);
    });
  
    socket.on("newMessage", ({ newMessage, conversationId }) => {
      io.to(conversationId).emit("receiveMessage",newMessage);
    });
  
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
  
  

httpServer.listen(PORT, '0.0.0.0',() => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
