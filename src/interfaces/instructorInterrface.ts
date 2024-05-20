import { Document } from "mongoose";

export interface IInstructor extends Document {
    name: string;
    email: string;
    password: string;
    bio: string;
    verified: boolean;
}
export interface IInstructorRes {
    instructor?: IInstructor | null;
    token?: string;
    status: boolean;
    message: string;
}