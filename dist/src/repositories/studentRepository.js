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
const student_1 = __importDefault(require("../models/student"));
class StudentRepo {
    createUser(userName_1, email_1, password_1, bio_1) {
        return __awaiter(this, arguments, void 0, function* (userName, email, password, bio, verified = false) {
            try {
                const newStudent = new student_1.default({
                    userName,
                    email,
                    password,
                    bio,
                    verified,
                    role: "student"
                });
                return yield newStudent.save();
            }
            catch (error) {
                console.log("error in creating student", error);
                throw error;
            }
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield student_1.default.findOne({ email: email }).exec();
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findUsers(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * limit;
                const users = yield student_1.default.find().skip(skip).limit(limit);
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield student_1.default.findById(_id).exec();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByIdAndUpdate(_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield student_1.default.findByIdAndUpdate({ _id }, data, { new: true });
            }
            catch (error) {
                console.log("error in find by id and update student", error);
                throw error;
            }
        });
    }
    blockStatus(_id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield student_1.default.findByIdAndUpdate(_id, { verified: !status }, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    countUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield student_1.default.countDocuments();
            }
            catch (error) {
                throw error;
            }
        });
    }
    updatePassword(_id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield student_1.default.findByIdAndUpdate(_id, { password }, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = StudentRepo;
