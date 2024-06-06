import cousre from "../models/cousre";
import { ICourse } from "../interfaces/courseInterface";
import { ObjectId } from "mongoose";


class CourseRepo {
    async createCourse({ title, subtitle, thumbnail, instructor, category, topic, triler, price }: ICourse) {
        const newCourse = await new cousre({
            title, subtitle, thumbnail, instructor, category, topic, triler, price

        })
        return newCourse.save();
    }
    async getCourse(id: string) {
        return await cousre.findById(id);
    }
    async listCourse(id: ObjectId | null): Promise<ICourse[]> {
        return await cousre.find({ instructor: id });
    }
}

export default CourseRepo