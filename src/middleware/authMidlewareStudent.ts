import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";


export const authMiddlewareStudent = async (req: Request, res: Response, next: NextFunction) => {
    let studentToken = req.headers.authorization?.split(" ")[1]
    if (!studentToken) return res.status(401).json({ status: false, message: "Unauthorized" })
    try {
        studentToken = studentToken.split(" ")[1]
        const decoded = verifyToken(studentToken)
        req.body.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ status: false, message: "Unauthorized" })
    }
    return
}