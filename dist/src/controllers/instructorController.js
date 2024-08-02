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
class InstructorController {
    constructor(instructorService) {
        this.instructorService = instructorService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, email, password, bio } = req.body.data;
                const user = yield this.instructorService.insertInstructor(userName, email, password, bio);
                if (user) {
                    res.json({ user, message: "User created successfully", status: true, statusCode: 201 });
                }
                else {
                    res.json({ error: "Failed to create user", status: false, statusCode: 500 });
                }
            }
            catch (error) {
                console.error("Error in create:", error);
                res.json({ error: "Failed to create user" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const instructor = yield this.instructorService.authInstructor(email, password);
                if (instructor) {
                    res.json({ instructor, message: "Login successful", status: true, statusCode: 200 });
                }
                else {
                    res.json({ error: "Invalid email or password", status: false, statusCode: 400 });
                }
            }
            catch (error) {
                console.error("Error in login:", error);
                res.json({ error: "Failed to login", status: false, statusCode: 500 });
            }
        });
    }
    getId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.query.email;
                const user = yield this.instructorService.findId(email);
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404).json({ error: "User not found", status: false, statusCode: 404 });
                }
            }
            catch (error) {
                console.error("Error in getId:", error);
                res.status(500).json({ error: "Failed to get user", status: false, statusCode: 500 });
            }
        });
    }
    getDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.params.id;
                let result = yield this.instructorService.findByEmail(email);
                let courses = yield this.instructorService.listCourses(result === null || result === void 0 ? void 0 : result._id);
                if (result)
                    res.json({ result: { userDetails: result, myCourses: courses }, message: 'get details is success', status: true, statusCode: 200 });
            }
            catch (error) {
                console.error(error);
                res.json({ error: 'get details is failed', status: false, statusCode: 500 });
            }
        });
    }
    listAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let Instructors = yield this.instructorService.instructorList();
                if (Instructors)
                    res.json(Instructors);
                else
                    res.status(400).json({ error: "instructors Not found", status: false });
            }
            catch (error) {
                console.error(error);
                res.json({ error: 'listing is failed', status: false, statusCode: 500 });
            }
        });
    }
    verification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body.data;
                const result = yield this.instructorService.verification(email, otp);
                res.json({ user: result, message: 'verification is success', status: true, statusCode: 200 });
            }
            catch (error) {
                console.error(error);
                res.json({ error: 'verification is failed', status: false, statusCode: 500 });
            }
        });
    }
    forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                let result = yield this.instructorService.forgetPassword(email);
                if (result)
                    res.json({ result: result, message: 'forget password is success', status: true, statusCode: 200 });
                else
                    res.json({ result: result, error: 'email not found', status: false, statusCode: 500 });
            }
            catch (error) {
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp, newPassword } = req.body;
                let result = yield this.instructorService.resetPassword(email, otp, newPassword);
                if (result)
                    res.json({ result: result, message: 'change password is success', status: true, statusCode: 200 });
                else
                    res.json({ result: result, error: 'change password is failed', status: false, statusCode: 500 });
            }
            catch (error) {
            }
        });
    }
    editPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, oldPassword, newPassword } = req.body;
                let result = yield this.instructorService.editPassword(email, oldPassword, newPassword);
                if (result)
                    res.json({ result: result, message: 'change password is success', status: true, statusCode: 200 });
                else
                    res.json({ result: result, error: 'change password is failed', status: false, statusCode: 500 });
            }
            catch (error) {
            }
        });
    }
}
exports.default = InstructorController;
