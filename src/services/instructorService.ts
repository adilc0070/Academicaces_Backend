import bycrypt from "bcrypt"
import InstructorRepo from "../repositories/instructorRepository"
import OtpRepo from "../repositories/otpRepository"
import { IInstructor } from "../interfaces/instructorInterrface"
// import { generateToken } from "../utils/jwt"
import { sendVerifyMail } from "../utils/otpVerification"
import { Res } from "../interfaces/commonn"

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
            console.log("inserting instructor", name, email, password, bio);
            if (!name || !email || !password || !bio) throw new Error("Missing required fields")
            let existOrNote: boolean = await this.emailEixist(email)
            console.log("existOrNote", existOrNote);
            if (existOrNote) throw new Error("Email already in use")
            let otp: string = await sendVerifyMail(name, email)
            await this.otpRepo.createOtp(email, otp)
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
    async instructorList():Promise<Res>{
        try {
            let instructor:IInstructor[]|null=await this.instructorRepo.findInstrucotrs()
            return {data:instructor,status:true,message:'intructors list'}
        } catch (error) {
            throw error
        }
    }
    async findId(email: string): Promise<IInstructor | null> {
        try{
            const data: IInstructor | null = await this.instructorRepo.findInstructorByEmail(email)
            return data?._id
        }catch(error){
            throw error
        }
    }




}

export default InstructorService