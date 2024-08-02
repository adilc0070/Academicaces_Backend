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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewareStudent = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddlewareStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let studentToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!studentToken)
        return res.status(401).json({ status: false, message: "Unauthorized" });
    try {
        studentToken = studentToken.split(" ")[1];
        const decoded = (0, jwt_1.verifyToken)(studentToken);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    return;
});
exports.authMiddlewareStudent = authMiddlewareStudent;