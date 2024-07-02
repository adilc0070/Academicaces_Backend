import chatModel from "../models/chat";
import instructor from "../models/instructor";
import messageModel from "../models/messages";
import student from "../models/student";

class ChatRepo {

    async getChat(id: string) {
        return await chatModel.findById(id)
    }
    async listStudentChats(studentId: string) {
        console.log('Student ID:', studentId);

        // Find chat documents where the student is a member
        const chats = await chatModel.aggregate([
            { $match: { members: studentId } },
            { $project: { instructorId: { $arrayElemAt: [{ $setDifference: ["$members", [studentId]] }, 0] } } }
        ]);

        // Extract the instructor IDs from the chat documents
        const instructorIds = chats.map(chat => chat.instructorId);

        // Fetch instructor details using the instructor IDs
        const instructors = await instructor.find({ _id: { $in: instructorIds } });

        return instructors;
    }


    async listInstructorChats(instructorId: string) {
        console.log('Instructor ID:', instructorId);

        // Find chat documents where the instructor is a member
        const chats = await chatModel.aggregate([
            { $match: { members: instructorId } },
            { $project: { studentId: { $arrayElemAt: [{ $setDifference: ["$members", [instructorId]] }, 0] } } }
        ]);

        // Extract the student IDs from the chat documents
        const studentIds = chats.map(chat => chat.studentId);

        // Fetch student details using the student IDs
        const students = await student.find({ _id: { $in: studentIds } });

        return students;
    }

    async createMessage(id: string, message: string) {
        const newMessage = await messageModel.create({ chatId: id, message: message })
        return newMessage
    }
    async getMessages(id: string) {
        return await messageModel.find({ chatId: id })
    }



}
export default ChatRepo