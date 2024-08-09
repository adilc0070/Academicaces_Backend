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
const account_1 = __importDefault(require("../models/account"));
const chat_1 = __importDefault(require("../models/chat"));
const enrolledCourse_1 = __importDefault(require("../models/enrolledCourse"));
class EnrolledCourseRepo {
    enroll(studentId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new enrolledCourse_1.default({ studentId, courseId }).save();
        });
    }
    checkEnrolledCourse(studentId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield enrolledCourse_1.default.findOne({ studentId, courseId });
        });
    }
    getEnrolledCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield enrolledCourse_1.default.find({ studentId: id }).sort({ createdAt: -1 })
                .populate('studentId')
                .populate({ path: 'courseId', populate: { path: 'instructor' } })
                .populate({ path: 'courseId', populate: { path: 'category' } }).
                populate({ path: 'courseId', populate: { path: 'chapters', populate: { path: 'lessonsID' } } });
        });
    }
    createChat(studentId, instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('studentId', studentId, 'instructorId', instructorId);
            const chatExist = yield chat_1.default.findOne({
                members: { $all: [studentId, instructorId] },
            });
            if (!chatExist) {
                const newChat = yield chat_1.default.create({
                    members: [studentId, instructorId],
                });
                console.log('newChat', newChat);
                return true;
            }
            return true;
        });
    }
    myEarning(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield account_1.default.aggregate([
                { $match: { instructorId: instructorId } },
                { $project: { _id: 0, earnings: 1 } },
                { $unwind: '$earnings' },
                { $group: { _id: null, total: { $sum: '$earnings.amount' } } },
            ]);
        });
    }
}
exports.default = EnrolledCourseRepo;
