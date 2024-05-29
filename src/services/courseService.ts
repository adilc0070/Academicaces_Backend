import CourseRepo from "../repositories/courseRepository";
import { ICourse } from "../interfaces/courseInterface";

class CourseServices{
    private courseRepo: CourseRepo
    
    constructor(courseRepo:CourseRepo){
        this.courseRepo=courseRepo
    }
    async createCourse(course:ICourse){
        return await this.courseRepo.createCourse(course)
    }
    async listCourses():Promise<ICourse[]>{
        return await this.courseRepo.listCourse()
    }

}

export default CourseServices