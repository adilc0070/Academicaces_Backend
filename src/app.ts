import express, { } from "express";
import dotenv from 'dotenv'
import http from 'http'
import connectDB from "../migrations";
import authRoute from "./routes/authRoute";
import { initializeSocket } from "./utils/socketIO";

dotenv.config()
import cors from 'cors'
import bodyParser from "body-parser";
import adminRoute from "./routes/adminRoutes";
import instructorRoute from "./routes/instructorRoutes";
import studentRoute from "./routes/studentRoutes";


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app)
app.use(cors({
    origin: [`${process.env.ORIGIN_URL}`],
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
}))




initializeSocket(server)

connectDB()

app.use('/auth', authRoute)
app.use('/admin', adminRoute)
app.use('/instructor', instructorRoute)
app.use('/student', studentRoute)
app.use('*', (_, res) => {
    res.json({ message: "Hello Worlds" });
})
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
// Start the server
server.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000 \n\nhttp://localhost:3000");
});

export default app;
