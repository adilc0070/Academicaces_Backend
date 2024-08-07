import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import messageModel from "../models/messages";
import chatModel from "../models/chat";

export const initializeSocket = (server: HttpServer) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.ORIGIN_URI || "*",
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

        socket.on("sendMessage", async ({ text, sender, receiver }) => {
            try {
                const conversation = await chatModel.findOneAndUpdate(
                    { members: { $all: [sender, receiver] } },
                    { $set: { members: [sender, receiver] } },
                    { new: true, upsert: true }
                );
                if (conversation) {
                    const newMessage = await messageModel.create({
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
            } catch (error) {
                console.error("Error sending message:", error);
            }
        });
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
