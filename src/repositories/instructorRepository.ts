import Instructor from "../models/instructor";
import { IInstructor, IInstructorRes } from "../interfaces/instructorInterrface";



class InstructorRepo {
    async signUpInstructor(name: string, email: string, phone: string, password: string, bio: string, verified: boolean = false): Promise<IInstructor> {
        try {
            const newInstructor = new Instructor({
                name, email, phone, password, bio, verified
            })
            return await newInstructor.save()
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
    
}


export default InstructorRepo