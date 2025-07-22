import express from 'express';
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from '../routes/auth.route.js';
import chatRouter from '../routes/chatRouter.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Conversation from '../models/conversation.js';

dotenv.config({ path: './config/.env' });

const app = express();
const httpServer = createServer(app); 
const io = new Server(httpServer, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
  transports: ["websocket", "polling"],
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
  socket.on("register", ({ id, role }) => {
    connectedUsers[id] = {
      socketId: socket.id,
      role,
    };
    console.log(`🔗 ${id} (${typeof role === "object" ? JSON.stringify(role) : role}) connected with socket ID: ${socket.id}`);

  });


// socket.on("newMessage", async ({ newMessage }) => {
//   console.log("📩 Broadcasting newMessage:", newMessage);
//   io.emit("newMessage", { newMessage });
//   try {
//     const conversation = await Conversation.findById(newMessage.conversationId);
//     if (!conversation) {
//       console.error("❌ Conversation not found!");
//       return;
//     }

//     const { clientId, courtierId } = conversation;

//     const participants = [Number(clientId), Number(courtierId)];

//     participants.forEach((participantId) => {
//       if (participantId === Number(newMessage.senderId)) return;

//       const userData = connectedUsers[participantId];
//       if (userData) {
//         console.log(`📬 Sending newMessage to participant ${participantId}`);
//         io.to(userData.socketId).emit("newMessage", { newMessage });
//       } else {
//         console.log(`❌ Participant ${participantId} not connected`);
//       }
//     });

//     for (let [id, userData] of Object.entries(connectedUsers)) {
//       if (userData.role === "assistant") {
//         console.log(`🔗 Notifying assistant ${id}`);
//         io.to(userData.socketId).emit("newMessage", { newMessage });
//       }
//     }

//   } catch (error) {
//     console.error("❌ Error broadcasting message:", error);
//   }
// });


socket.on("newMessage", async ({ newMessage }) => {
  console.log("📩 Broadcasting newMessage:", newMessage);

  try {
    const conversation = await Conversation.findById(newMessage.conversationId);
    if (!conversation) {
      console.error("❌ Conversation not found!");
      return;
    }

    const { clientId, courtierId } = conversation;
    const participants = [Number(clientId), Number(courtierId)];

    io.emit("newMessage", {
      newMessage,
      participants,
    });

    console.log(`📡 Message broadcasted to all clients.`);
  } catch (error) {
    console.error("❌ Error broadcasting message:", error);
  }
});


socket.on("disconnect", () => {
  for (const userId in connectedUsers) {
    if (connectedUsers[userId].socketId === socket.id) {
      delete connectedUsers[userId];
      console.log(`❌ User ${userId} disconnected`);
      break;
    }
  }
});

});

  
  
app.post('/api/notify', (req, res) => {
  const { sender, receiver, object, body, data } = req.body;

  const notification = {
    sender,
    receiver,
    object,
    body,
    data,
    time: new Date(),
  };

  if (receiver == 0) {
    const assistants = Object.values(connectedUsers).filter(u => u.role === 'assistant');
    assistants.forEach(({ socketId }) => {
      io.to(socketId).emit('notification', notification);
    });
    console.log('📢 Notification sent to all assistants');
  } else if (receiver == -1) {
    const admins = Object.values(connectedUsers).filter(u => u.role === 'admin');
    admins.forEach(({ socketId }) => {
      io.to(socketId).emit('notification', notification);
    });
    console.log('📢 Notification sent to all admins');
  } else {
    const user = connectedUsers[String(receiver)]; 
    if (user?.socketId) {
      io.to(user.socketId).emit('notification', notification);
      console.log('📬 Notification sent to user:', receiver);
    } else {
      console.log('❌ User not connected:', receiver);
    }
  }

  res.status(200).json({ message: 'Notification attempted', notification });
});

app.use('/api/conversation', chatRouter);


httpServer.listen(PORT, '0.0.0.0',() => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
