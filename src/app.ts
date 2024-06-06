import express, { } from "express";
import dotenv from 'dotenv'
import connectDB from '../migrations/index'
import authRoute from "./routes/authRoute";
import cors from 'cors'
import bodyParser from "body-parser";
import adminRoute from "./routes/adminRoutes";
dotenv.config()
import instructorRoute from "./routes/instructorRoutes";


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [`${process.env.ORIGIN_URL}`],
    methods: ["GET", "POST", "DELETE","PATCH"],
    credentials: true,
}))


connectDB()

app.use('/auth', authRoute)
app.use('/admin', adminRoute)
app.use('/instructor', instructorRoute)
app.use('*', (_, res) => {
    res.send("Hello Worldsaddsa!");
})
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
// Start the server
app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000 \n\nhttp://localhost:3000");
});

export default app;
