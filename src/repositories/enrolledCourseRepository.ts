import chatModel from "../models/chat";
import enrolledCourse from "../models/enrolledCourse";

class EnrolledCourseRepo {
    async enroll(studentId: string | null, courseId: string) {
        return await new enrolledCourse({ studentId, courseId }).save()
    }
    async checkEnrolledCourse(studentId: string|null, courseId: string) {
        return await enrolledCourse.findOne({ studentId, courseId })
    }
    async getEnrolledCourse(id: string) {
        return await enrolledCourse.find({ studentId: id }).sort({ createdAt: -1 })
        .populate('studentId')
        .populate({path: 'courseId', populate: { path: 'instructor' }})
        .populate({path: 'courseId', populate: { path: 'category' }}).
        populate({path: 'courseId', populate: { path: 'chapters', populate: { path: 'lessonsID' } }})
    }
    async createChat(studentId: string|null, instructorId: string|null): Promise<boolean> {
        console.log('studentId', studentId, 'instructorId', instructorId);
        
        const chatExist = await chatModel.findOne({
          members: { $all: [studentId, instructorId] },
        });
    
        if (!chatExist) {
          const newChat =await chatModel.create({
            members: [studentId, instructorId],
          });
          console.log('newChat', newChat);
          return true;
        }
        return true;
      }
}

export default EnrolledCourseRepo