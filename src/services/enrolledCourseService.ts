import account from "../models/account";
import cousre from "../models/cousre";
import earnings from "../models/earnings";
import EnrolledCourseRepo from "../repositories/enrolledCourseRepository";
class EnrolledCourseService {
    private enrolledCourseRepo: EnrolledCourseRepo

    constructor(enrolledCourseRepo: EnrolledCourseRepo) {
        this.enrolledCourseRepo = enrolledCourseRepo
    }

    async enroll(studentId: string | null, courseId: string) {
        const courseExist = await this.enrolledCourseRepo.checkEnrolledCourse(studentId, courseId)
        if (courseExist) return false
        const course = await cousre.findOne({ _id: courseId })
        await cousre.updateOne({ _id: courseId }, { $push: { enrolledStudents: studentId } })
        const instructorId: any = await cousre.findOne({ _id: courseId }).populate('instructor').exec()
        await this.enrolledCourseRepo.createChat(studentId, instructorId?.instructor?._id)
        const earning = await new earnings({ studentId, amount: course?.price, courseId }).save()
        await account.updateOne({ instructorId: instructorId?.instructor?._id }, { $push: { earnings: earning._id } })
        return await this.enrolledCourseRepo.enroll(studentId, courseId)
    }

    async getEnrolledCourse(id: string ) {        
        return await this.enrolledCourseRepo.getEnrolledCourse(id)
    }

    async checkEnrolledCourse(studentId: string | null, courseId: string) {
        return await this.enrolledCourseRepo.checkEnrolledCourse(studentId, courseId)
    }
    async myEarning(instructorId: string | null) {
        return await this.enrolledCourseRepo.myEarning(instructorId)
    }
}

export default EnrolledCourseService