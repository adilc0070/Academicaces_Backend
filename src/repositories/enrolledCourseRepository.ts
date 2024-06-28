import enrolledCourse from "../models/enrolledCourse";

class EnrolledCourseRepo {
    async enroll(studentId: string | null, courseId: string) {
        console.log('studentId', studentId, 'courseId', courseId);
        return await new enrolledCourse({ studentId, courseId }).save()
    }
    async getEnrolledCourse(id: string) {
        return await enrolledCourse.find({ studentId: id }).sort({ createdAt: -1 })
        .populate('studentId')
        .populate({path: 'courseId', populate: { path: 'instructor' }})
        .populate({path: 'courseId', populate: { path: 'category' }}).
        populate({path: 'courseId', populate: { path: 'chapters', populate: { path: 'lessonsID' } }})
    }
}

export default EnrolledCourseRepo