import CourseRepo from "../repositories/courseRepository";
import { ICourse } from "../interfaces/courseInterface";
import { ObjectId } from "mongoose";

class CourseServices {
    private courseRepo: CourseRepo

    constructor(courseRepo: CourseRepo) {
        this.courseRepo = courseRepo
    }
    async createCourse({ title, subtitle, thumbnail, instructor, category, topic, triler, price }: ICourse) {
        return await this.courseRepo.createCourse({ title, subtitle, thumbnail, instructor, category, topic, triler, price })
    }
    async listCourses(id: ObjectId | null): Promise<ICourse[]> {
        return await this.courseRepo.listCourse(id)
    }
    async addChapter(id: string, data: any) {
        return await this.courseRepo.addChapter(id, data)
    }
    async listAll() {
        return await this.courseRepo.listAll()
    }
    async verifyCourse(id: string, status: boolean) {
        return await this.courseRepo.verifieCourse(id, status)
    }

}

export default CourseServices