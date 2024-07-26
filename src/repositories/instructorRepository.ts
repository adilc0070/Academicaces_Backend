import Instructor from "../models/instructor";
import { IInstructor, } from "../interfaces/instructorInterrface";
import account from "../models/account";



class InstructorRepo {

    async createInstructor(userName: string, email: string, password: string, bio: string, verified: boolean = false): Promise<IInstructor> {
        console.log("createInstructor", userName, email, password, bio);
        try {
            const newInstructor: IInstructor | null = new Instructor({
                name: userName,
                email,
                password,
                bio,
                verified
            })
            await newInstructor.save()
            await account.create({ instructorId: newInstructor._id })
            return newInstructor
        } catch (error) {
            throw error
        }
    }

    async findInstructorByEmail(email: string): Promise<IInstructor | null> {
        try {
            const instructor: IInstructor | null = await Instructor.findOne({ email: email }).exec()
            return instructor
        } catch (error) {
            throw error
        }
    }
    async findInstrucotrs(): Promise<IInstructor[] | null> {
        try {
            const instructor: IInstructor[] | null = await Instructor.find().exec()
            return instructor
        } catch (error) {
            throw error
        }
    }
    async findInstructorById(id: string): Promise<IInstructor | null> {
        try {
            const instructor: IInstructor | null = await Instructor.findOne({ _id: id }).exec()
            return instructor
        } catch (error) {
            throw error
        }
    }
    async findVerifiedInstructor(): Promise<IInstructor[] | null> {
        try {
            const instructor: IInstructor[] | null = await Instructor.find({ verified: true }).exec()
            return instructor
        } catch (error) {
            throw error
        }
    }
    async verification(email: string, verified: boolean): Promise<IInstructor | null> {
        try {
            const instructor: IInstructor | null = await Instructor.findOneAndUpdate({ email: email }, { verified: verified }).exec()
            return instructor
        } catch (error) {
            throw error
        }
    }
    async changePassword(email: string, password: string): Promise<IInstructor | null> {
        try {
            const instructor: IInstructor | null = await Instructor.findOneAndUpdate({ email: email }, { password: password }).exec()
            return instructor
        } catch (error) {
            throw error
        }
    }
    
}


export default InstructorRepo