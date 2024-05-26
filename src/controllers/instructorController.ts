import { Request, Response } from "express"
import instructorService from "../services/instructorService"
import { IInstructorRes } from "../interfaces/instructorInterrface"




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
            const instructor = await this.instructorService.authInstructor(email, password)
            if (instructor) {
                console.log('instructor', instructor);
                // setCookie(res, 'instructorToken', instructor.token)
                res.json({ instructor, message: "Login successful", status: true, statusCode: 200 })
            } else {
                console.log('error', instructor); 
                res.json({ error: "Invalid email or password", status: false, statusCode: 400 })
            }
        } catch (error) {
            console.error("Error in login:", error);
            res.json({ error: "Failed to login", status: false, statusCode: 500 })
        }
    }
    async listAll(_req:Request,res:Response):Promise<void>{
        try{
            console.log('list Instructor controller');
            let Instructors:IInstructorRes|null= await this.instructorService.instructorList()
            if(Instructors)res.json(Instructors)
            else res.status(400).json({error:"instructors Not found",status:false})

        }catch(error){
            console.error(error)
            res.json({error:'listing is failed',status:false,statusCode:500})
        }
    }

}

export default InstructorController