import { model, Schema } from "mongoose";
const chatSchema = new Schema(
    {
        members: [{ type: String, require: true }],
        latestMessage: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

const chatModel = model("Chat", chatSchema);
export default chatModel;