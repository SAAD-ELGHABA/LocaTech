import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    NomComplet:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    token:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['assistant','courtier','client']
    },
},
    {timestamps:true}
)

const User = mongoose.model("User",userSchema);
export default User;