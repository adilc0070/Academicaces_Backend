"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (data) => {
    if (!process.env.JWT_SECRET)
        throw new Error('JWT_SECRET is not defined');
    const plainObject = data.toObject();
    return jsonwebtoken_1.default.sign(plainObject, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    if (!process.env.JWT_SECRET)
        throw new Error('JWT_SECRET is not defined');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        console.log("token error", error);
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;
