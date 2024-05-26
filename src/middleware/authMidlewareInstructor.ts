import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddlewareInstructor = async (req: Request, res: Response, next: NextFunction) => {
    let instructorToken = req.headers.authorization?.split(" ")[1]
    if (!instructorToken) return res.status(401).json({ status: false, message: "Unauthorized" })
    try {
        instructorToken = instructorToken.split(" ")[1]
        const decoded = verifyToken(instructorToken)
        req.body.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ status: false, message: "Unauthorized" })
    }
    return
}