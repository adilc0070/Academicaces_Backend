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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const migrations_1 = __importDefault(require("./migrations"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const socketIO_1 = require("./utils/socketIO");
dotenv_1.default.config();
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const instructorRoutes_1 = __importDefault(require("./routes/instructorRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const messages_1 = __importDefault(require("./models/messages"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)({
    origin: [`${process.env.ORIGIN_URL}`],
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
}));
(0, socketIO_1.initializeSocket)(server);
(0, migrations_1.default)();
app.use('/auth', authRoute_1.default);
app.use('/admin', adminRoutes_1.default);
app.use('/instructor', instructorRoutes_1.default);
app.use('/student', studentRoutes_1.default);
app.get('/api/messages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sender, receiver } = req.query;
    try {
        const messages = yield messages_1.default.find({
            $or: [
                { from: sender, to: receiver },
                { from: receiver, to: sender }
            ]
        }).sort({ createdAt: 1 });
        const formattedMessages = messages.map(message => (Object.assign(Object.assign({}, message.toObject()), { isSender: message.from === sender })));
        res.json(formattedMessages);
    }
    catch (error) {
        res.status(500).send("Error fetching messages");
    }
}));
app.use('*', (_, res) => {
    res.json({ message: "Hello Worlds" });
});
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
server.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000 \n\nhttp://localhost:3000");
});
exports.default = app;
