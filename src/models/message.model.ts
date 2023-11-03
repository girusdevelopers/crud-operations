import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    title: String,
    description:String,
    url:String
})

const Message = mongoose.model("message",messageSchema)
export default Message;