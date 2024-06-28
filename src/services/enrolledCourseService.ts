import EnrolledCourseRepo from "../repositories/enrolledCourseRepository";
class EnrolledCourseService {
    private enrolledCourseRepo: EnrolledCourseRepo

    constructor(enrolledCourseRepo: EnrolledCourseRepo) {
        this.enrolledCourseRepo = enrolledCourseRepo
    }

    async enroll(studentId: string|null, courseId: string) {
        return await this.enrolledCourseRepo.enroll(studentId, courseId)
    }

    async getEnrolledCourse(id: string) {
        return await this.enrolledCourseRepo.getEnrolledCourse(id)
    }
    
    
} 

export default EnrolledCourseService