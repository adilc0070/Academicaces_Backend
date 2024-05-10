import { Request, Response } from "express";
import { IStudent } from "../interfaces/studentInterface";
import studentService from "../services/studentService" 
import { setCookie } from "../utils/coockie";



class StudentController{
    private studentService:studentService

    constructor(studentService:studentService){
        this.studentService = studentService
    }
    async signUpUser(req: Request, res: Response): Promise<void> {
        try {
            const { userName, email, password, bio }: IStudent = req.body
            const user = await this.studentService.createUser(userName, email, password, bio)
            if(user){
                res.status(201).json({ user, message: "User created successfully", status: true, statusCode: 201 }) 
            }else{
                res.status(500).json({ error: "Failed to create user" , status: false, statusCode: 500 })
            }
        } catch (error) {
            console.error("Error in signUpUser:", error);
            res.status(500).json({ error: "Failed to create user" })
        }
    }
    async signInUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password }: IStudent = req.body
            const user = await this.studentService.authUser(email, password)
            if (user?.token) setCookie(res, 'userToken', user.token)
            res.status(200).json({ user, message: "Login successful", status: true, statusCode: 200 })
        } catch (error) {
            console.error("Error in signInUser:", error);
            res.status(500).json({ error: "Failed to login", status: false, statusCode: 500 })
        }
    }
    async verifyUser(req: Request,res:Response): Promise<void> {
        try {
            let { email, otp } = req.body
            if(email && otp){
                const user = await this.studentService.verifyOtp(email, otp)
                if(user) res.json({ user, message: "User verified successfully", status: true, statusCode: 200 })
            }        
        } catch (error) {
            
        }
    }

    async listStudents( res: Response): Promise<void> {
        try {
            const students = await this.studentService.listUsers()
            res.status(200).json({ students, message: "Students fetched successfully", status: true, statusCode: 200 })
        } catch (error) {
            console.error("Error in listStudents:", error);
            res.status(500).json({ error: "Failed to fetch students", status: false, statusCode: 500 })
        }
    }
    
}

export default StudentController