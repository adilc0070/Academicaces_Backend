import { Request, Response } from "express";
import { IStudent, IStudentRes } from "../interfaces/studentInterface";
import studentService from "../services/studentService"
import { deleteCookie, setCookie } from "../utils/coockie";

class StudentController {
    private studentService: studentService

    constructor(studentService: studentService) {
        this.studentService = studentService
    }
    async signUpUser(req: Request, res: Response): Promise<void> {
        try {
            const { userName, email, password, bio }: IStudent = req.body
            const user = await this.studentService.createUser(userName, email, password, bio)
            if (user) {
                res.json({ user, message: "User created successfully", status: true, statusCode: 201 })
            } else {
                res.json({ error: "Failed to create user", status: false, statusCode: 500 })
            }
        } catch (error) {
            console.error("Error in signUpUser:", error);
            res.json({ error: "Failed to create user" })
        }
    }
    async logout(_req: Request, res: Response): Promise<void> {
        try {
            localStorage.removeItem('userToken');
            deleteCookie(res, 'userToken');
            res.json({ message: "Logout successful", status: true, statusCode: 200 });
        } catch (error) {
            console.error("Error in logout:", error);
            res.json({ error: "Failed to logout", status: false, statusCode: 500 });
        }
    }
    async signInUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password }: IStudent = req.body;
            const user = await this.studentService.authUser(email, password);
            if (user?.token) {
                if (user?.userData?.verified === true) {
                    // const local= localStorage.setItem('userToken', user.token);
                    // console.log('local',local);                    
                    res.cookie('userToken', user.token, {
                        httpOnly: true,
                        secure: true, // Ensure your server is running over HTTPS
                        sameSite: 'strict',
                        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
                         // Replace with your actual domain without https://
                    });

                    

                    setCookie(res, 'userToken', user.token)
                    res.json({ user, message: "Login successful", status: true, statusCode: 200, });
                } else res.json({ error: "User not verified", status: false, statusCode: 400 });

            } else {
                res.json({ error: "Invalid email or password", status: false, statusCode: 400 });
            }
        } catch (error) {
            console.error("Error in signInUser:", error);
            res.json({ error: "Failed to login", status: false, statusCode: 500 });
        }
    }

    async getId(req: Request, res: Response): Promise<void> {
        try {
            const email = req.query.email as string
            const user = await this.studentService.findUserByEmail(email)
            if (user) {
                res.json(user._id)
            } else {
                res.status(404).json({ error: "User not found", status: false })
            }
        } catch (error) {
            console.error("Error in getId:", error);
            res.status(500).json({ error: "Failed to get user" })
        }
    }
    async verifyUser(req: Request, res: Response): Promise<void> {
        try {
            let { email, otp } = req.body
            if (email && otp) {
                const user = await this.studentService.verifyOtp(email, otp)
                if (user) {
                    localStorage.setItem('userToken', user?.token as string);
                    res.json({ user, message: "User verified successfully", status: true, statusCode: 200 })
                }
            }
        } catch (error) {

        }
    }

    async listStudents(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10; // Set default limit to 3

            const students: IStudentRes | null = await this.studentService.listUsers(page, limit);
            if (students) {
                res.json(students);
            } else {
                res.status(404).json({ error: "No students found", status: false });
            }
        } catch (error) {
            console.error("Error in listStudents:", error);
            res.json({ error: "Failed to fetch students", status: false, statusCode: 500 });
        }
    }



    async blockAndUnblock(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const user = await this.studentService.findAndBlockUnblockUser(id, req.body.status)

            res.json({ user, message: "User blocked successfully", status: true, statusCode: 200 })
        } catch (error) {

        }
    }
    async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body
            await this.studentService.forgotPassword(email)
            res.json()
        } catch (error) {

        }
    }
    async changePassword(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            await this.studentService.changePassword(email, password)
            res.json()
        } catch (error) {

        }
    }


}

export default StudentController