"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    members: [{ type: String, require: true }],
    latestMessage: {
        type: String,
        default: ""
    }
}, { timestamps: true });
const chatModel = (0, mongoose_1.model)("Chat", chatSchema);
exports.default = chatModel;
