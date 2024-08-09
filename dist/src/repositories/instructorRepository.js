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
const instructor_1 = __importDefault(require("../models/instructor"));
const account_1 = __importDefault(require("../models/account"));
class InstructorRepo {
    createInstructor(userName_1, email_1, password_1, bio_1) {
        return __awaiter(this, arguments, void 0, function* (userName, email, password, bio, verified = false) {
            console.log("createInstructor", userName, email, password, bio);
            try {
                const newInstructor = new instructor_1.default({
                    name: userName,
                    email,
                    password,
                    bio,
                    verified
                });
                yield newInstructor.save();
                yield account_1.default.create({ instructorId: newInstructor._id });
                return newInstructor;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findInstructorByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instructor = yield instructor_1.default.findOne({ email: email }).exec();
                return instructor;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findInstrucotrs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instructor = yield instructor_1.default.find().exec();
                return instructor;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findInstructorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instructor = yield instructor_1.default.findOne({ _id: id }).exec();
                return instructor;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findVerifiedInstructor() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instructor = yield instructor_1.default.find({ verified: true }).exec();
                return instructor;
            }
            catch (error) {
                throw error;
            }
        });
    }
    verification(email, verified) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instructor = yield instructor_1.default.findOneAndUpdate({ email: email }, { verified: verified }).exec();
                return instructor;
            }
            catch (error) {
                throw error;
            }
        });
    }
    changePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instructor = yield instructor_1.default.findOneAndUpdate({ email: email }, { password: password }).exec();
                return instructor;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = InstructorRepo;
