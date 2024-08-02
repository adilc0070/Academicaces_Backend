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
const coockie_1 = require("../utils/coockie");
const admin_1 = __importDefault(require("../models/admin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    adminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const admin = yield this.adminService.authAdmin(email, password);
                if (admin === null || admin === void 0 ? void 0 : admin.token) {
                    (0, coockie_1.setCookie)(res, 'adminToken', admin.token);
                    res.json({ admin, message: "Login successful", status: true, statusCode: 200 });
                }
                else
                    res.json({ error: "Invalid email or password", status: false, statusCode: 400 });
            }
            catch (error) {
                console.error("Error in adminLogin:", error);
                res.json({ error: "Failed to login", status: false, statusCode: 500 });
            }
        });
    }
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let adminEmail = "admin@gmail.com", password = '0070';
                let hashPassword = yield bcrypt_1.default.hash(password, 10);
                yield new admin_1.default({ email: adminEmail, password: hashPassword }).save();
            }
            catch (error) {
                console.error("Error in createADemoAdmin:", error);
            }
        });
    }
}
exports.default = AdminController;
