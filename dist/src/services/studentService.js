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
const jwt_1 = require("../utils/jwt");
const otpVerification_1 = require("../utils/otpVerification");
const bcrypt_1 = __importDefault(require("bcrypt"));
class StudentServices {
    constructor(studentRep, otpRepo) {
        this.studentRep = studentRep;
        this.otpRepo = otpRepo;
    }
    exist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.studentRep.findUserByEmail(email);
                return !!data;
            }
            catch (error) {
                console.log("Error in emailEixist:", error);
                throw error;
            }
        });
    }
    createUser(userName_1, email_1, password_1, bio_1) {
        return __awaiter(this, arguments, void 0, function* (userName, email, password, bio, verified = false) {
            try {
                if (!userName || !email || !password || !bio)
                    throw new Error("Missing required fields");
                let existOrNote = yield this.exist(email);
                if (existOrNote)
                    throw new Error("Email already in use");
                let otp = yield (0, otpVerification_1.sendVerifyMail)(userName, email);
                yield this.otpRepo.createOtp(email, otp);
                let hashPassword = yield bcrypt_1.default.hash(password, 10);
                let data = yield this.studentRep.createUser(userName, email, hashPassword, bio, verified);
                if (!data)
                    throw new Error("Failed to create user");
                return data;
            }
            catch (error) {
                console.error("Error in createUser:", error);
                throw error;
            }
        });
    }
    verifyOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userexist = yield this.studentRep.findUserByEmail(email);
                if (!userexist)
                    throw new Error("User not found");
                let otpData = yield this.otpRepo.findOtpByEmail(email);
                if (!otpData)
                    throw new Error("Otp not found");
                if (otpData.otp !== otp)
                    return { status: false, message: "Invalid otp" };
                else
                    userexist.verified = true;
                let userData = yield this.studentRep.findByIdAndUpdate(userexist === null || userexist === void 0 ? void 0 : userexist._id, userexist);
                const token = (0, jwt_1.generateToken)(userexist);
                if (userData)
                    yield this.otpRepo.deleteOtp(email);
                return { status: true, token, message: "user verified successfully", userData };
            }
            catch (error) {
                console.error("Error in verifyOtp:", error);
                throw error;
            }
        });
    }
    authUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userData = yield this.studentRep.findUserByEmail(email);
                if (!userData)
                    throw new Error("User not found");
                else {
                    let isPasswordValid = yield bcrypt_1.default.compare(password, userData.password);
                    if (isPasswordValid) {
                        let token = (0, jwt_1.generateToken)(userData);
                        return { userData, token, status: true, message: 'successful' };
                    }
                    else {
                        return { status: false, message: 'Incorrect password' };
                    }
                }
            }
            catch (error) {
                console.error("Error in authUser:", error);
                throw error;
            }
        });
    }
    listUsers(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield this.studentRep.findUsers(page, limit);
                if (students) {
                    const total = yield this.studentRep.countUsers();
                    return { data: students, total, status: true, message: 'users list' };
                }
                else {
                    return { data: [], total: 0, status: true, message: 'No users found' };
                }
            }
            catch (error) {
                console.error("Error in listUsers:", error);
                throw error;
            }
        });
    }
    findAndBlockUnblockUser(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentRep.blockStatus(id, status);
            }
            catch (error) {
                throw error;
            }
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userexist = yield this.studentRep.findUserByEmail(email);
                if (!userexist)
                    throw new Error("User not found");
                let otp = yield (0, otpVerification_1.sendVerifyMail)(userexist.userName, userexist.email);
                yield this.otpRepo.createOtp(email, otp);
                return { status: true, message: "Otp sent successfully" };
            }
            catch (error) {
                console.error("Error in forgotPassword:", error);
                throw error;
            }
        });
    }
    changePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userexist = yield this.studentRep.findUserByEmail(email);
                if (!userexist)
                    throw new Error("User not found");
                let hashPassword = yield bcrypt_1.default.hash(password, 10);
                yield this.studentRep.updatePassword(email, hashPassword);
                return { status: true, message: "Password changed successfully" };
            }
            catch (error) {
                console.error("Error in changePassword:", error);
                throw error;
            }
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentRep.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.studentRep.findUserByEmail(email);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = StudentServices;
