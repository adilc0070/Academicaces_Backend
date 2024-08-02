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
exports.sendVerifyMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendVerifyMail = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_PASSWORD,
            },
        });
        let OTP = Math.floor(1000 + Math.random() * 9000).toString();
        const mailOptions = {
            from: process.env.GOOGLE_EMAIL,
            to: email,
            subject: "user verification from Academicaces",
            html: "<h1> Hello <b>" + name + "</b>,</h1> Please verify your Account, it will expire in 3 minutes. Your OTP is <b>" + OTP + "</b>",
        };
        yield transporter.sendMail(mailOptions);
        return OTP;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
exports.sendVerifyMail = sendVerifyMail;
