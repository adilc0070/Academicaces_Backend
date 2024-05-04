import { Request, Response } from "express";
import { IStudent, IStudentRes } from "../interfaces/studentInterface";
import studentService from "../services/studentService" 


class StudentController{
    private studentService:studentService

    constructor(studentService:studentService){
        this.studentService = studentService
    }
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { userName, email, password } = req.body;
            const userData:IStudentRes = await this.studentService.createUser(userName, email, password);
            res.status(200).json({userData, message: "User created successfully" ,status:true,statusCode:200});
        } catch (error) {
            console.error("Error in createUser:", error);
            res.status(500).json({ error: "Failed to create user" ,status:false,statusCode:500});
        }

    }
    
}