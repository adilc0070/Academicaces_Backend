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
const otp_1 = __importDefault(require("../models/otp"));
class OtpRepo {
    createOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = { email };
                const update = { otp };
                const options = { upsert: true, new: true };
                const sendingOtp = yield otp_1.default.findOneAndUpdate(filter, update, options).exec();
                return sendingOtp;
            }
            catch (error) {
                console.log('error in creating otp', error);
                throw error;
            }
        });
    }
    findOtpByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = yield otp_1.default.findOne({ email: email }).exec();
                return otp;
            }
            catch (error) {
                console.log('error in finding otp by email', error);
                return null;
            }
        });
    }
    deleteOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedOtp = yield otp_1.default.findOneAndDelete({ email: email }).exec();
                return deletedOtp;
            }
            catch (error) {
                console.log('error in deleting otp', error);
                throw error;
            }
        });
    }
}
exports.default = OtpRepo;
