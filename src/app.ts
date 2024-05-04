import express, { } from "express";
import dotenv from 'dotenv'
import connectDB from '../migrations/index'
import authRoute from "./routes/authRoute";
import cors from 'cors'
import bodyParser from "body-parser";


dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}))


connectDB()

app.use('/auth', authRoute)
app.use('*', (_, res) => {
    res.send("Hello Worldsaddsa!");
})
// Start the server
app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000 \n\n http://localhost:3000");
});

export default app;
