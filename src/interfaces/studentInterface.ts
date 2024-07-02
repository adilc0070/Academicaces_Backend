import { Document } from "mongoose";

export interface IStudent extends Document {
    userName: string;
    email: string;
    password: string;
    bio: string;
    verified: boolean

}

export interface IStudentRes {
    userData?:IStudent | null
    token?:string
    otp_id?:string
    status:true | false
    message:string
}


export interface IStudentReq {
    userName: string;
    email: string;
    password: string;
    bio: string;
}