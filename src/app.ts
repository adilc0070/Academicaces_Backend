import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from "body-parser";
import http from 'http'
import connectDB from "./migrations";
import authRoute from "./routes/authRoute";
import { initializeSocket } from "./utils/socketIO";

import adminRoute from "./routes/adminRoutes";
import instructorRoute from "./routes/instructorRoutes";
import studentRoute from "./routes/studentRoutes";
import messageModel from "./models/messages";


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app)
app.use(cors({
    origin: [`${process.env.ORIGIN_URI}`],
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
}))




initializeSocket(server)

connectDB()

app.use('/auth', authRoute)
app.use('/admin', adminRoute)
app.use('/instructor', instructorRoute)
app.use('/student', studentRoute)
app.get('/api/messages', async (req, res) => {
    const { sender, receiver } = req.query;

    try {
        const messages = await messageModel.find({
            $or: [
                { from: sender, to: receiver },
                { from: receiver, to: sender }
            ]
        }).sort({ createdAt: 1 });

        const formattedMessages = messages.map(message => ({
            ...message.toObject(),
            isSender: message.from === sender
        }));

        res.json(formattedMessages);
    } catch (error) {
        res.status(500).send("Error fetching messages");
    }
});

app.use('*', (_, res) => {
    res.json({ message: "Hello Worlds" });
})
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
// Start the server
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port 3000 \n\nfroentend url: ${process.env.ORIGIN_URI} \n\nthis is backend url: http://localhost:${process.env.PORT}`);
});

export default app;
