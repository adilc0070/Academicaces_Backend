import { Request, Response } from "express"
import instructorService from "../services/instructorService"
import { IInstructorRes } from "../interfaces/instructorInterrface"
// import { setCookie } from "../utils/coockie"




class InstructorController {

    private instructorService: instructorService

    constructor(instructorService: instructorService) {
        this.instructorService = instructorService
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { userName, email, password, bio } = req.body.data
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

            const { email, password } = req.body
            
            const instructor = await this.instructorService.authInstructor(email, password) 
            if (instructor) {
                // setCookie(res, 'instructorToken', instructor?.token)
                res.json({ instructor, message: "Login successful", status: true, statusCode: 200 })
            } else {
                res.json({ error: "Invalid email or password", status: false, statusCode: 400 })
            }
        } catch (error) {
            console.error("Error in login:", error);
            res.json({ error: "Failed to login", status: false, statusCode: 500 })
        }
    }
    async getId(req: Request, res: Response): Promise<void> {
        try {
            const email = req.query.email as string
            const user = await this.instructorService.findId(email)
            if (user) {
                res.json(user)
            }
            else {
                res.status(404).json({ error: "User not found", status: false, statusCode: 404 })
            }
        } catch (error) {
            console.error("Error in getId:", error);
            res.status(500).json({ error: "Failed to get user", status: false, statusCode: 500 })
        }
    }
    async getDetails(req: Request, res: Response): Promise<void> {
        try {
            const email = req.params.id as string
            let result: any = await this.instructorService.findByEmail(email)
            let courses = await this.instructorService.listCourses(result?._id)
            if (result) res.json({ result: { userDetails: result, myCourses: courses }, message: 'get details is success', status: true, statusCode: 200 })
        }
        catch (error) {
            console.error(error)
            res.json({ error: 'get details is failed', status: false, statusCode: 500 })
        }
    }
    async listAll(_req: Request, res: Response): Promise<void> {
        try {
            let Instructors: IInstructorRes | null = await this.instructorService.instructorList()
            if (Instructors) res.json(Instructors)
            else res.status(400).json({ error: "instructors Not found", status: false })

        } catch (error) {
            console.error(error)
            res.json({ error: 'listing is failed', status: false, statusCode: 500 })
        }
    }
    async verification(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp } = req.body.data
            const result = await this.instructorService.verification(email, otp)
            res.json({ user: result, message: 'verification is success', status: true, statusCode: 200 })
        } catch (error) {
            console.error(error)
            res.json({ error: 'verification is failed', status: false, statusCode: 500 })
        }
    }
    async forgetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body
            let result = await this.instructorService.forgetPassword(email)
            if (result) res.json({ result: result, message: 'forget password is success', status: true, statusCode: 200 })
            else res.json({ result: result, error: 'email not found', status: false, statusCode: 500 })
        } catch (error) {
        }
    }
    async changePassword(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp, newPassword } = req.body
            let result = await this.instructorService.resetPassword(email, otp, newPassword)

            if (result) res.json({ result: result, message: 'change password is success', status: true, statusCode: 200 })
            else res.json({ result: result, error: 'change password is failed', status: false, statusCode: 500 })

        } catch (error) {
        }
    }
    async editPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email, oldPassword, newPassword } = req.body
            let result = await this.instructorService.editPassword(email, oldPassword, newPassword)
            if (result) res.json({ result: result, message: 'change password is success', status: true, statusCode: 200 })
            else res.json({ result: result, error: 'change password is failed', status: false, statusCode: 500 })
        } catch (error) {
        }
    }

}

export default InstructorController