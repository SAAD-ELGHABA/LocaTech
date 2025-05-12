import mongoose from "mongoose";

const statusConversationScheema = new mongoose.Schema({
    nom:{
        type:String,
        required : true
    },
    conversation:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",

    }
},{ timestamps: true })

const StatusConversation = mongoose.model("StatusConversation", statusConversationScheema);
export default StatusConversation;