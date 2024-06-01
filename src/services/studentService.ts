// import { IOtp } from "../interfaces/otpInterface";
import { IStudent, IStudentRes } from "../interfaces/studentInterface"
import { IOtp } from "../interfaces/otpInterface"
import OtpRepo from "../repositories/otpRepository"
import StudentRepo from "../repositories/studentRepository"
import { generateToken } from "../utils/jwt";
import { sendVerifyMail } from "../utils/otpVerification";
import bycrypt from "bcrypt"
import { Res } from "../interfaces/commonn";


class StudentServices {
    private studentRep: StudentRepo;
    private otpRepo: OtpRepo

    constructor(studentRep: StudentRepo, otpRepo: OtpRepo) {
        this.studentRep = studentRep;
        this.otpRepo = otpRepo
    }
    async exist(email: string): Promise<boolean> {
        try {
            const data: IStudent | null = await this.studentRep.findUserByEmail(email)
            return !!data
        } catch (error) {
            console.log("Error in emailEixist:", error);
            throw error
        }
    }

    async createUser(userName: string, email: string, password: string, bio: string, verified: boolean = false): Promise<IStudent> {
        try {
            if (!userName || !email || !password || !bio) throw new Error("Missing required fields")
            let existOrNote: boolean = await this.exist(email)
            if (existOrNote) throw new Error("Email already in use")

            let otp: string = await sendVerifyMail(userName, email)
            await this.otpRepo.createOtp(email, otp)

            let hashPassword: string = await bycrypt.hash(password, 10)

            let data: IStudent = await this.studentRep.createUser(userName, email, hashPassword, bio, verified,)
            if (!data) throw new Error("Failed to create user")

            return data
        } catch (error) {
            console.error("Error in createUser:", error);
            throw error
        }
    }

    async verifyOtp(email: string, otp: string): Promise<IStudentRes | void> {
        try {
            let userexist: IStudent | null = await this.studentRep.findUserByEmail(email)
            if (!userexist) throw new Error("User not found")
            let otpData: IOtp | null = await this.otpRepo.findOtpByEmail(email)
            if (!otpData) throw new Error("Otp not found")

            if (otpData.otp !== otp) return { status: false, message: "Invalid otp" }
            else userexist.verified = true

            let userData: IStudent | null = await this.studentRep.findByIdAndUpdate(userexist._id, userexist)
            if (userData) await this.otpRepo.deleteOtp(email)
            return { status: true, message: "user verified successfully", userData }

        } catch (error) {
            console.error("Error in verifyOtp:", error);
            throw error
        }
    }

    async authUser(email: string, password: string): Promise<IStudentRes | null> {
        try {
            let userData: IStudent | null = await this.studentRep.findUserByEmail(email)

            if (!userData) throw new Error("User not found")
            else {
                let isPasswordValid: boolean = await bycrypt.compare(password, userData.password)

                if (isPasswordValid) {
                    let token: string = generateToken(userData)
                    return { userData, token, status: true, message: 'successful' }
                } else {
                    return { status: false, message: 'Incorrect password' }
                }
            }

        } catch (error) {
            console.error("Error in authUser:", error);
            throw error
        }
    }
    async listUsers(): Promise<Res> {
        try {
            let students: IStudent[] | null = await this.studentRep.findUsers()
            return {data:students, status: true, message: 'users list'}
        } catch (error) {
            console.error("Error in listUsers:", error);
            throw error
        }
    }
    async findAndBlockUnblockUser(id: string, status: boolean): Promise<IStudent[] | null> {
        try {            
            await this.studentRep.blockStatus(id, status)
            return this.studentRep.findUsers()
        } catch (error) {
            throw error
        }
    }

}

export default StudentServices