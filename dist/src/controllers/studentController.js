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
const coockie_1 = require("../utils/coockie");
class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    signUpUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, email, password, bio } = req.body;
                console.log('email', email, 'password', password);
                const user = yield this.studentService.createUser(userName, email, password, bio);
                if (user) {
                    res.json({ user, message: "User created successfully", status: true, statusCode: 201 });
                }
                else {
                    res.json({ error: "Failed to create user", status: false, statusCode: 500 });
                }
            }
            catch (error) {
                console.error("Error in signUpUser:", error);
                res.json({ error: "Failed to create user" });
            }
        });
    }
    logout(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, coockie_1.deleteCookie)(res, 'userToken');
                res.json({ message: "Logout successful", status: true, statusCode: 200 });
            }
            catch (error) {
                console.error("Error in logout:", error);
                res.json({ error: "Failed to logout", status: false, statusCode: 500 });
            }
        });
    }
    signInUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { email, password } = req.body;
                const user = yield this.studentService.authUser(email, password);
                if (user === null || user === void 0 ? void 0 : user.token) {
                    if (((_a = user === null || user === void 0 ? void 0 : user.userData) === null || _a === void 0 ? void 0 : _a.verified) === true) {
                        (0, coockie_1.setCookie)(res, 'userToken', user.token);
                        res.json({ user, message: "Login successful", status: true, statusCode: 200, });
                    }
                    else
                        res.json({ error: "User not verified", status: false, statusCode: 400 });
                }
                else {
                    res.json({ error: "Invalid email or password", status: false, statusCode: 400 });
                }
            }
            catch (error) {
                console.error("Error in signInUser:", error);
                res.json({ error: "Failed to login", status: false, statusCode: 500 });
            }
        });
    }
    getId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.query.email;
                const user = yield this.studentService.findUserByEmail(email);
                if (user) {
                    res.json(user._id);
                }
                else {
                    res.status(404).json({ error: "User not found", status: false });
                }
            }
            catch (error) {
                console.error("Error in getId:", error);
                res.status(500).json({ error: "Failed to get user" });
            }
        });
    }
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, otp } = req.body;
                if (email && otp) {
                    const user = yield this.studentService.verifyOtp(email, otp);
                    if (user)
                        res.json({ user, message: "User verified successfully", status: true, statusCode: 200 });
                }
            }
            catch (error) {
            }
        });
    }
    listStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const students = yield this.studentService.listUsers(page, limit);
                if (students) {
                    res.json(students);
                }
                else {
                    res.status(404).json({ error: "No students found", status: false });
                }
            }
            catch (error) {
                console.error("Error in listStudents:", error);
                res.json({ error: "Failed to fetch students", status: false, statusCode: 500 });
            }
        });
    }
    blockAndUnblock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this.studentService.findAndBlockUnblockUser(id, req.body.status);
                res.json({ user, message: "User blocked successfully", status: true, statusCode: 200 });
            }
            catch (error) {
            }
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield this.studentService.forgotPassword(email);
                res.json();
            }
            catch (error) {
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                yield this.studentService.changePassword(email, password);
                res.json();
            }
            catch (error) {
            }
        });
    }
}
exports.default = StudentController;
