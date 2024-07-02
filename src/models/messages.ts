import { Schema, model } from "mongoose";
const messageSchema = new Schema({
    to: {
        type:String,
        
    },
    from : {
        type :String,

    },

    conversationId : {
       type :String
    },
    text: {
        type : String
    }
   
     
},{timestamps : true})

const messageModel = model('message', messageSchema);
export default messageModel