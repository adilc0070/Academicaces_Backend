import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import messageModel from "../models/messages";
import chatModel from "../models/chat";

export const initializeSocket = (server: HttpServer) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    const onlineUsers = new Map();


    io.on("connection", (socket) => {
        // console.log(socket.id, "connected");

        socket.on("join", ({ userId }) => {
            // console.log(userId, "user joined");
            socket.join(userId);

        });
        socket.on("onlineStatus", (userId) => {
            console.log("onlineStatus emitted by:", userId);

            onlineUsers.set(socket.id, userId);

            io.emit("onlineStatus", Array.from(onlineUsers.values()));
        });
        socket.on("sendMessage", async ({ text, sender, receiver }) => {
            try {
                console.log(text, "text");

                const conversation = await chatModel.findOneAndUpdate(
                );


                if (conversation) {
                    const newMessage = await messageModel.create({
                        to: receiver,
                        from: sender,
                        conversationId: conversation?._id.toString(),
                        text: text,
                    });

                    if (newMessage) {
                        console.log(newMessage, "neww");

                        io.to(sender).emit("newMessage", { newMessage });
                        io.to(receiver).emit("newMessage", { newMessage });
                    }
                }

                console.log("Message sent successfully.");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        });


        socket.on('offlineStatus', (userId) => {
            console.log('User is offline:', userId);

            for (const [key, value] of onlineUsers.entries()) {
                if (value === userId) {
                    onlineUsers.delete(key);
                    break;
                }
            }

            io.emit('onlineStatus', Array.from(onlineUsers.values()));
        });
        socket.on("disconnect", () => {
            console.log(onlineUsers, "online users");
            const entry = Array.from(onlineUsers.entries()).find(
                ([key]) => key === socket.id
            );
            if (entry) {
                const userId = entry[1];
                console.log(userId, socket.id);
                onlineUsers.delete(socket.id);
                onlineUsers.delete(userId);
                console.log(onlineUsers, "deleted users");
                io.emit("onlineStatus", Array.from(onlineUsers.keys()));
            }

        });
    });
};