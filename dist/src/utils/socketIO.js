"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
const messages_1 = __importDefault(require("../models/messages"));
const chat_1 = __importDefault(require("../models/chat"));
const initializeSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.ORIGIN_URL || "*",
            methods: ["GET", "POST"],
            credentials: true
        },
    });
    const onlineUsers = new Map();
    io.on("connection", (socket) => {
        socket.on("join", ({ userId }) => {
            socket.join(userId);
            onlineUsers.set(socket.id, userId);
            io.emit("onlineStatus", Array.from(onlineUsers.values()));
        });
        socket.on("sendMessage", (_a) => __awaiter(void 0, [_a], void 0, function* ({ text, sender, receiver }) {
            try {
                const conversation = yield chat_1.default.findOneAndUpdate({ members: { $all: [sender, receiver] } }, { $set: { members: [sender, receiver] } }, { new: true, upsert: true });
                if (conversation) {
                    const newMessage = yield messages_1.default.create({
                        to: receiver,
                        from: sender,
                        conversationId: conversation._id.toString(),
                        text: text,
                    });
                    if (newMessage) {
                        io.to(sender).emit("newMessage", newMessage);
                        io.to(receiver).emit("newMessage", newMessage);
                    }
                }
            }
            catch (error) {
                console.error("Error sending message:", error);
            }
        }));
        socket.on("startVideoCall", ({ roomName }) => {
            socket.join(roomName);
            socket.to(roomName).emit("videoCallStarted");
        });
        socket.on("joinVideoCall", ({ roomName }) => {
            socket.join(roomName);
            socket.to(roomName).emit("userJoinedCall");
        });
        socket.on("disconnect", () => {
            const userId = onlineUsers.get(socket.id);
            if (userId) {
                onlineUsers.delete(socket.id);
                io.emit("onlineStatus", Array.from(onlineUsers.values()));
            }
        });
    });
};
exports.initializeSocket = initializeSocket;
