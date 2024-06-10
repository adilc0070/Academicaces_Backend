// import { Types } from "mongoose";
import student from "../models/student";
import { IStudent } from "../interfaces/studentInterface";

class StudentRepo {
    async createUser(userName: string, email: string, password: string, bio: string, verified: boolean = false): Promise<IStudent> {
        try {

            const newStudent: IStudent | null = new student({
                userName,
                email,
                password,
                bio,
                verified,
                role: "student"
            })
            return await newStudent.save()
        } catch (error) {
            console.log("error in creating student", error);
            throw error
        }
    }
    async findUserByEmail(email: string): Promise<IStudent | null> {
        try {
            const user: IStudent | null = await student.findOne({ email: email }).exec()
            return user
        } catch (error) {
            throw error
        }
    }
    async findUsers(page: number, limit: number): Promise<IStudent[] | null> {
        try {
            const skip = (page - 1) * limit;
            const users: IStudent[] | null = await student.find().skip(skip).limit(limit);
            return users;
        } catch (error) {
            throw error;
        }
    }    

    async findById(_id: string): Promise<IStudent | null> {
        try {
            return await student.findById(_id).exec()
        } catch (error) {
            throw error
        }
    }
    async findByIdAndUpdate(_id: string, data: IStudent): Promise<IStudent | null> {
        try {
            return await student.findByIdAndUpdate({ _id }, data, { new: true })
        } catch (error) {
            console.log("error in find by id and update student", error);
            throw error
        }
    }
    async blockStatus(_id: string, status: boolean): Promise<IStudent | null> {
        try {
            return await student.findByIdAndUpdate(_id, { verified: !status }, { new: true })
        } catch (error) {
            throw error
        }
    }
    async countUsers(): Promise<number> {
        try {
            return await student.countDocuments()
        } catch (error) {
            throw error
        }
    }

}



export default StudentRepo;