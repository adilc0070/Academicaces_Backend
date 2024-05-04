// import { Types } from "mongoose";
import student from "../models/student";
import { IStudent } from "../interfaces/studentInterface";

class StudentRepo {
    async findUserByEmail(email : string ): Promise<IStudent | null> {
        try{
            const user = await student.findOne({email:email})
            return user
        }catch(error){
            console.log('error in finding user by email',error)
            throw error
        }
    }

    async findUserById(id : string ): Promise<IStudent | null> {
        try{
            const user = await student.findOne({id:id})
            return user
        }catch(error){
            console.log('error in finding user by id',error)
            throw error
        }
    }

    async createUser(userName: string, email: string, password: string): Promise<IStudent | null> {
        try{
            const newUser = await new student({
                userName:userName,
                email:email,
                password:password
            })
            return newUser.save()
        }catch(error){
            console.log('error in creating user',error)
            throw error
        }
    }
}

export default StudentRepo;