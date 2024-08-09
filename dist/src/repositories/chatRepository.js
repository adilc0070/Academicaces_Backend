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
const chat_1 = __importDefault(require("../models/chat"));
const instructor_1 = __importDefault(require("../models/instructor"));
const messages_1 = __importDefault(require("../models/messages"));
const student_1 = __importDefault(require("../models/student"));
class ChatRepo {
    getChat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.default.findById(id);
        });
    }
    listStudentChats(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Student ID:', studentId);
            const chats = yield chat_1.default.aggregate([
                { $match: { members: studentId } },
                { $project: { instructorId: { $arrayElemAt: [{ $setDifference: ["$members", [studentId]] }, 0] } } }
            ]);
            const instructorIds = chats.map(chat => chat.instructorId);
            const instructors = yield instructor_1.default.find({ _id: { $in: instructorIds } });
            return instructors;
        });
    }
    listInstructorChats(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Instructor ID:', instructorId);
            const chats = yield chat_1.default.aggregate([
                { $match: { members: instructorId } },
                { $project: { studentId: { $arrayElemAt: [{ $setDifference: ["$members", [instructorId]] }, 0] } } }
            ]);
            const studentIds = chats.map(chat => chat.studentId);
            const students = yield student_1.default.find({ _id: { $in: studentIds } });
            return students;
        });
    }
    createMessage(id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMessage = yield messages_1.default.create({ chatId: id, message: message });
            return newMessage;
        });
    }
    getMessages(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield messages_1.default.find({ chatId: id });
        });
    }
}
exports.default = ChatRepo;
