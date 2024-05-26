import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";


export const authMiddlewareAdmin = (req: Request, res: Response, next: NextFunction) => {
    let adminToken = req.headers.authorization?.split(" ")[1]
    if (!adminToken) return res.status(401).json({ status: false, message: "Unauthorized" })
    try {
        adminToken = adminToken.split(" ")[1]
        const decoded = verifyToken(adminToken)
        req.body.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ status: false, message: "Unauthorized" })
    }
    return
}