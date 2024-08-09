"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewareAdmin = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddlewareAdmin = (req, res, next) => {
    var _a;
    let adminToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!adminToken)
        return res.status(401).json({ status: false, message: "Unauthorized" });
    try {
        adminToken = adminToken.split(" ")[1];
        const decoded = (0, jwt_1.verifyToken)(adminToken);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    return;
};
exports.authMiddlewareAdmin = authMiddlewareAdmin;
