import CourseRepo from "../repositories/courseRepository";
import { ICourse } from "../interfaces/courseInterface";
import { ObjectId } from "mongoose";
import bycrypt from "bcrypt"

class CourseServices {
    private courseRepo: CourseRepo

    constructor(courseRepo: CourseRepo) {
        this.courseRepo = courseRepo
    }
    async createCourse({ title, subtitle, thumbnail, instructor, category, topic, triler, price }: any) {
        return await this.courseRepo.createCourse({ title, subtitle, thumbnail, instructor, category, topic, triler, price })
    }
    async editCourse(id: string, data: any) {
        return await this.courseRepo.updateCourse(id, data)
    }
    async listCourses(id: ObjectId | null): Promise<ICourse[]> {
        return await this.courseRepo.listCourse(id)
    }
    async listBlockedCourses(instructor: ObjectId | null): Promise<ICourse[]> {
        return await this.courseRepo.listBlockedCourses(instructor)
    }
    async listVerifiedCourses(instructor: ObjectId | null): Promise<ICourse[]> {
        return await this.courseRepo.listVerifiedCourses(instructor)
    }
    async addChapter(id: string, data: any) {
        return await this.courseRepo.addChapter(id, data)
    }
    async updateChapter(id: string, data: any) {
        return await this.courseRepo.editChapter(id, data)
    }
    async updateCourse(id: string, data: any) {
        return await this.courseRepo.updateCourse(id, data)
    }
    async listAll() {
        return await this.courseRepo.listAll()
    }
    async verifyCourse(id: string, status: boolean) {
        return await this.courseRepo.verifieCourse(id, status)
    }
    async blockCourse(id: string, status: boolean) {
        return await this.courseRepo.blockCourse(id, status)
    }
    async course(category: any, sort: 1 | -1, page: number, limit: number, search: string | null) {
        return await this.courseRepo.course(category, sort, page, limit, search);
    }
    async totalDoc() {
        return await this.courseRepo.countDoc()
    }
    async hashCourse(id: string) {
        return await bycrypt.hash(id, 10)
    }
    async enrollCourse(id: string, hash: string){
        const a=await bycrypt.compare(id,hash)
        if(!a) throw new Error('Invalid hash')
        const course=await this.courseRepo.getCourse(id)
        return course
        // return await this.courseRepo.enrollCourse(id, hash)
    }
    async viewCourse(id: string) {
        return await this.courseRepo.getCourse(id)
    }
}

export default CourseServices