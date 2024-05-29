import { Document } from "mongoose";

export interface ILesson extends Document {
    name: string;
    description: string;
    files: string[];
    courseId: string;
}
