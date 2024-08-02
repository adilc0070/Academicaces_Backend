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
const bcrypt_1 = __importDefault(require("bcrypt"));
const otpVerification_1 = require("../utils/otpVerification");
const cousre_1 = __importDefault(require("../models/cousre"));
class InstructorService {
    constructor(instructorRepo, otpRepo) {
        this.instructorRepo = instructorRepo;
        this.otpRepo = otpRepo;
    }
    emailEixist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.instructorRepo.findInstructorByEmail(email);
                return !!data;
            }
            catch (error) {
                console.log("Error in emailEixist:", error);
                throw error;
            }
        });
    }
    insertInstructor(name_1, email_1, password_1, bio_1) {
        return __awaiter(this, arguments, void 0, function* (name, email, password, bio, verified = false) {
            try {
                if (!name || !email || !password || !bio)
                    throw new Error("Missing required fields");
                let existOrNote = yield this.emailEixist(email);
                if (existOrNote)
                    throw new Error("Email already in use");
                let otp = yield (0, otpVerification_1.sendVerifyMail)(name, email);
                let otpData = yield this.otpRepo.createOtp(email, otp);
                otpData;
                let hashPassword = yield bcrypt_1.default.hash(password, 10);
                let data = yield this.instructorRepo.createInstructor(name, email, hashPassword, bio, verified);
                if (!data)
                    throw new Error("Failed to create user");
                return data;
            }
            catch (error) {
                console.error("Error in insertInstructor:", error);
                throw error;
            }
        });
    }
    authInstructor(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.instructorRepo.findInstructorByEmail(email);
                if (!data)
                    throw new Error("Invalid email");
                let match = yield bcrypt_1.default.compare(password, data.password);
                if (!match)
                    throw new Error("Invalid password");
                return data;
            }
            catch (error) {
                console.error("Error in login:", error);
                throw error;
            }
        });
    }
    instructorList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let instructor = yield this.instructorRepo.findInstrucotrs();
                return { data: instructor, status: true, message: 'intructors list' };
            }
            catch (error) {
                throw error;
            }
        });
    }
    findId(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.instructorRepo.findInstructorByEmail(email);
                return data === null || data === void 0 ? void 0 : data._id;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.instructorRepo.findInstructorByEmail(email);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    listCourses(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let results = yield cousre_1.default.aggregate([{ $match: { instructor: id } }]).exec();
                results = yield cousre_1.default.populate(results, [
                    { path: 'category', select: 'name' },
                    { path: 'instructor', select: 'name' },
                    { path: 'chapters', populate: { path: 'lessonsID' } }
                ]);
                return results;
            }
            catch (error) {
                throw error;
            }
        });
    }
    verification(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let otpData = yield this.otpRepo.findOtpByEmail(email);
                console.log("verification service", otpData);
                if ((otpData === null || otpData === void 0 ? void 0 : otpData.otp) !== otp)
                    throw new Error('invalid otp');
                else {
                    yield this.instructorRepo.verification(email, true);
                    yield this.otpRepo.deleteOtp(email);
                }
                return yield this.instructorRepo.findInstructorByEmail(email);
            }
            catch (error) {
                throw error;
            }
        });
    }
    forgetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this.emailEixist(email);
                console.log(result);
                if (!result)
                    return false;
                let otp = yield (0, otpVerification_1.sendVerifyMail)('User', email);
                let otpData = yield this.otpRepo.createOtp(email, otp);
                otpData;
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    resetPassword(email, otp, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userexist = yield this.instructorRepo.findInstructorByEmail(email);
                if (!userexist)
                    throw new Error("User not found");
                let otpData = yield this.otpRepo.findOtpByEmail(email);
                if (!otpData)
                    return false;
                if (otpData.otp !== otp)
                    return { status: false, message: "Invalid otp" };
                else {
                    let hashPassword = yield bcrypt_1.default.hash(password, 10);
                    let result = yield this.instructorRepo.changePassword(email, hashPassword);
                    if (result) {
                        yield this.otpRepo.deleteOtp(email);
                        return this.instructorRepo.findInstructorByEmail(email);
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    editPassword(email, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userexist = yield this.instructorRepo.findInstructorByEmail(email);
                if (!userexist)
                    throw new Error("User not found");
                let match = yield bcrypt_1.default.compare(oldPassword, userexist.password);
                if (!match)
                    throw new Error("Invalid password");
                let result = yield this.instructorRepo.changePassword(email, newPassword);
                if (result)
                    return { result: result, message: 'change password is success', status: true, statusCode: 200 };
                else
                    return { result: result, error: 'change password is failed', status: false, statusCode: 500 };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = InstructorService;
