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

const connectedUsers = {};
io.on("connection", (socket) => {
    console.log("✅ New client connected:", socket.id);
      socket.on("register", (userId) => {
      connectedUsers[userId] = socket.id;
      console.log(`🔗 ${userId} connected with socket ID: ${socket.id}`);
    });
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined room: ${conversationId}`);
    });
  
    socket.on("newMessage", ({ newMessage}) => {
      io.emit("receiveMessage",newMessage);
    });
  
socket.on("disconnect", () => {
  for (let userId in connectedUsers) {
    if (connectedUsers[userId] === socket.id) {
      delete connectedUsers[userId];
      console.log(`❌ ${userId} disconnected`);
      break;
    }
  }
});
  });
  
  
app.post('/api/notify', (req, res) => {
  const { sender, receiver, object, body, data } = req.body;

  const notification = { sender, receiver, object, body, data, time: new Date() };

  const receiverSocketId = connectedUsers[receiver];
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('notification', notification);
    console.log('Notification sent:', notification);
  } else {
    console.log('User not connected:', receiver);
  }

  res.status(200).json({ message: 'Notification attempted', notification });
});



httpServer.listen(PORT, '0.0.0.0',() => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
