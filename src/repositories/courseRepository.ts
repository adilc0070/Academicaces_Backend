import cousre from "../models/cousre";
import { ICourse } from "../interfaces/courseInterface";


class CourseRepo {
    async createCourse(course: ICourse) {
        const newCourse = new cousre(course);
        return newCourse.save();
    }
    async getCourse(id: string) {
        return await cousre.findById(id);
    }
    async listCourse() {
        return await cousre.find();
    }
}

export default  CourseRepo