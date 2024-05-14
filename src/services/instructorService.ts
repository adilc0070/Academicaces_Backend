import bycrypt from "bcrypt"
import InstructorRepo from "../repositories/instructorRepository"
import OtpRepo from "../repositories/otpRepository"
import { IInstructor, IInstructorRes } from "../interfaces/instructorInterrface"
import { generateToken } from "../utils/jwt"
import { sendVerifyMail } from "../utils/otpVerification"

class InstructorService {
    private instructorRepo: InstructorRepo
    private otpRepo: OtpRepo

    constructor(instructorRepo: InstructorRepo, otpRepo: OtpRepo) {
        this.instructorRepo = instructorRepo
        this.otpRepo = otpRepo
    }

    async emailEixist(email: string): Promise<boolean> {
        try {
            const data: IInstructor | null = await this.instructorRepo.findInstructorByEmail(email)
            return !!data
        } catch (error) {
            console.log("Error in emailEixist:", error);
            throw error
        }
    }

    async signUpInstructor(name: string, email: string, phone: string, password: string, bio: string, verified: boolean = false): Promise<IInstructorRes> {
        try {
            if (!name || !email || !phone || !password || !bio) {
                return { status: false, message: "Missing required fields" }
            }
            let checkMail: boolean = await this.emailEixist(email)
            if (checkMail) return { status: false, message: "Email already in use" }

            const otp: string = await sendVerifyMail(name, email)
            console.log(otp);
            await this.otpRepo.createOtp(email, otp)

            let hashPassword: string = await bycrypt.hash(password, 10)
            let instructor: IInstructor = await this.instructorRepo.signUpInstructor(name, email, phone, hashPassword, bio, verified)
            if (!instructor) return { status: false, message: "Failed to create instructor" }

            return { status: true, message: "Instructor created successfully", instructor }
        } catch (error) {
            console.log("Error in signUpInstructor:", error);
            throw error
        }
    }

   
}