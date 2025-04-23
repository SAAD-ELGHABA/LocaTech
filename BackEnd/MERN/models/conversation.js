import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
    },
    courtierId: {
        type: String,
        required: true,
    },
    BienId: {
        type: String,
        required: true,
    },
    messages: [
        {
            senderId: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    lastMessage: {
        type: String,
        required: true,
    },
    lastMessageDate: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["activé", "brouillé","blocké","supprimé"],
        default: "activé",
    },
},{ timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;