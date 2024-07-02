import { ObjectId } from "mongoose";

export interface ICourse {
    verified?: boolean;
    createdAt?: Date;
    isBlock?: boolean;
    title?: string;
    subtitle?: string;
    category?: ObjectId | { _id: string; name: string }; // Adjust as needed
    price?: number;
    thumbnail?: string;
    instructor?: ObjectId | { _id: string; name: string }; // Adjust as needed
    enrolledStudents?: ObjectId[];
    chapters?: ObjectId[] | any[]; // Adjust as needed
    topic?: string;
    triler?: string;
}
export interface ICourseRes {
    course?: ICourse | null,
    token?: string
    status: boolean
    message: string
}