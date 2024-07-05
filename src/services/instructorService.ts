import bycrypt from "bcrypt"
import InstructorRepo from "../repositories/instructorRepository"
import OtpRepo from "../repositories/otpRepository"
import { IInstructor } from "../interfaces/instructorInterrface"
// import { generateToken } from "../utils/jwt"
import { sendVerifyMail } from "../utils/otpVerification"
import { Res } from "../interfaces/commonn"
import { IOtp } from "../interfaces/otpInterface"
import cousre from "../models/cousre"

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
    async insertInstructor(name: string, email: string, password: string, bio: string, verified: boolean = false): Promise<IInstructor> {
        try {

            if (!name || !email || !password || !bio) throw new Error("Missing required fields")
            let existOrNote: boolean = await this.emailEixist(email)
            if (existOrNote) throw new Error("Email already in use")
            let otp: string = await sendVerifyMail(name, email)
            let otpData = await this.otpRepo.createOtp(email, otp)
            otpData
            let hashPassword: string = await bycrypt.hash(password, 10)
            let data: IInstructor = await this.instructorRepo.createInstructor(name, email, hashPassword, bio, verified)
            if (!data) throw new Error("Failed to create user")
            return data
        } catch (error) {
            console.error("Error in insertInstructor:", error);
            throw error
        }
    }
    async authInstructor(email: string, password: string): Promise<IInstructor | null> {
        try {
            const data: IInstructor | null = await this.instructorRepo.findInstructorByEmail(email)
            if (!data) throw new Error("Invalid email")
            let match = await bycrypt.compare(password, data.password)
            if (!match) throw new Error("Invalid password")
            return data
        } catch (error) {
            console.error("Error in login:", error);
            throw error
        }
    }
    async instructorList(): Promise<Res> {
        try {
            let instructor: IInstructor[] | null = await this.instructorRepo.findInstrucotrs()
            return { data: instructor, status: true, message: 'intructors list' }
        } catch (error) {
            throw error
        }
    }
    async findId(email: string): Promise<any> {
        try {
            const data = await this.instructorRepo.findInstructorByEmail(email)
            return data?._id
        } catch (error) {
            throw error
        }
    }
    async findByEmail(email: string): Promise<IInstructor | null> {
        try {
            const data: IInstructor | null = await this.instructorRepo.findInstructorByEmail(email)
            return data
        } catch (error) {
            throw error
        }
    }
    async listCourses(id: string | null): Promise<any> {
        try {
            let results = await cousre.aggregate([{ $match: { instructor: id } }]).exec();

            results = await cousre.populate(results, [
                { path: 'category', select: 'name' },
                { path: 'instructor', select: 'name' },
                { path: 'chapters', populate: { path: 'lessonsID' } }
            ]);

            return results;
        } catch (error) {
            throw error
        }
    }
    async verification(email: string, otp: string): Promise<any> {
        try {
            let otpData = await this.otpRepo.findOtpByEmail(email)
            console.log("verification service", otpData)
            if (otpData?.otp !== otp) throw new Error('invalid otp')
            else {
                await this.instructorRepo.verification(email, true)
                await this.otpRepo.deleteOtp(email)
            }
            return await this.instructorRepo.findInstructorByEmail(email)
        } catch (error) {
            throw error
        }
    }
    async forgetPassword(email: string): Promise<any> {
        try {
            let result = await this.emailEixist(email)
            console.log(result)
            if (!result) return false
            let otp = await sendVerifyMail('User', email)
            let otpData = await this.otpRepo.createOtp(email, otp)
            otpData
            return true
        } catch (error) {
            throw error
        }
    }
    async resetPassword(email: string, otp: string, password: string): Promise<any> {
        try {
            let userexist: IInstructor | null = await this.instructorRepo.findInstructorByEmail(email)
            if (!userexist) throw new Error("User not found")
            let otpData: IOtp | null = await this.otpRepo.findOtpByEmail(email)
            if (!otpData) return false
            if (otpData.otp !== otp) return { status: false, message: "Invalid otp" }
            else {
                let hashPassword: string = await bycrypt.hash(password, 10)
                let result = await this.instructorRepo.changePassword(email, hashPassword)
                if (result) {
                    await this.otpRepo.deleteOtp(email)
                    return this.instructorRepo.findInstructorByEmail(email)
                }
            }
        } catch (error) {
            throw error
        }
    }




}

export default InstructorService