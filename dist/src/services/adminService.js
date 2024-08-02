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
const jwt_1 = require("../utils/jwt");
class AdminServices {
    constructor(adminRep) {
        this.adminRep = adminRep;
    }
    authAdmin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.adminRep.findAdminByEmail(email);
                if (admin) {
                    const isPasswordValid = yield bcrypt_1.default.compare(password, admin.password);
                    if (isPasswordValid) {
                        const token = (0, jwt_1.generateToken)(admin);
                        return { admin, token, status: true, message: 'successful' };
                    }
                    else {
                        return { status: false, message: 'Incorrect password', admin };
                    }
                }
                else {
                    return { status: false, message: 'admin not found' };
                }
            }
            catch (error) {
                console.error("Error in authAdmin:", error);
                throw error;
            }
        });
    }
}
exports.default = AdminServices;
