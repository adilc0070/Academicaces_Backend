import { Request, Response } from "express"
// import { IInstructor } from "../interfaces/instructorInterrface"
import instructorService from "../services/instructorService"




class InstructorController {

    private instructorService: instructorService

    constructor(instructorService: instructorService) {
        this.instructorService = instructorService
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { userName, email, password, bio } = req.body.data
            console.log('create', userName, email, password, bio);
            
            const user = await this.instructorService.insertInstructor(userName, email, password, bio)
            if (user) {
                res.json({ user, message: "User created successfully", status: true, statusCode: 201 })
            } else {
                res.json({ error: "Failed to create user", status: false, statusCode: 500 })
            }
        } catch (error) {
            console.error("Error in create:", error);
            res.json({ error: "Failed to create user" })
        }
    }
    async login(req: Request, res: Response): Promise<void> {
        try {
            console.log('login', req.body.data);
            
            const { email, password } = req.body.data
            const user = await this.instructorService.authInstructor(email, password)
            if (user) {
                console.log('user', user);
                // setCookie(res, 'instructorToken', user.token)
                res.json({ user, message: "Login successful", status: true, statusCode: 200 })
            } else {
                console.log('error', user); 
                res.json({ error: "Invalid email or password", status: false, statusCode: 400 })
            }
        } catch (error) {
            console.error("Error in login:", error);
            res.json({ error: "Failed to login", status: false, statusCode: 500 })
        }
    }

}

export default InstructorController