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
const cousre_1 = __importDefault(require("../models/cousre"));
const earnings_1 = __importDefault(require("../models/earnings"));
class EnrolledCourseService {
    constructor(enrolledCourseRepo) {
        this.enrolledCourseRepo = enrolledCourseRepo;
    }
    enroll(studentId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const courseExist = yield this.enrolledCourseRepo.checkEnrolledCourse(studentId, courseId);
            if (courseExist)
                return false;
            const course = yield cousre_1.default.findOne({ _id: courseId });
            yield cousre_1.default.updateOne({ _id: courseId }, { $push: { enrolledStudents: studentId } });
            const instructorId = yield cousre_1.default.findOne({ _id: courseId }).populate('instructor').exec();
            yield this.enrolledCourseRepo.createChat(studentId, (_a = instructorId === null || instructorId === void 0 ? void 0 : instructorId.instructor) === null || _a === void 0 ? void 0 : _a._id);
            const earning = yield new earnings_1.default({ studentId, amount: course === null || course === void 0 ? void 0 : course.price, courseId }).save();
            yield account_1.default.updateOne({ instructorId: (_b = instructorId === null || instructorId === void 0 ? void 0 : instructorId.instructor) === null || _b === void 0 ? void 0 : _b._id }, { $push: { earnings: earning._id } });
            return yield this.enrolledCourseRepo.enroll(studentId, courseId);
        });
    }
    getEnrolledCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.enrolledCourseRepo.getEnrolledCourse(id);
        });
    }
    checkEnrolledCourse(studentId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.enrolledCourseRepo.checkEnrolledCourse(studentId, courseId);
        });
    }
    myEarning(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.enrolledCourseRepo.myEarning(instructorId);
        });
    }
}
exports.default = EnrolledCourseService;
