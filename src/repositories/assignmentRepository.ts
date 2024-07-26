import Assignment from "../models/assignment";

class AssignmentRepo {

    async createAssignment(assignment: any) {
        const newAssignment = new Assignment(assignment);
        return await newAssignment.save();
    }
    async findAssignmentById(id: string) {
        console.log("id", id);
        
        return await Assignment.findById(id);
    }
    async findAssignmentByInstructorId(id: string) {
        return await Assignment.find({ instructor: id }).populate('courseId', 'title')
    }
    async findByCourseId(id: string) {
        return await Assignment.find({ courseId: id })
    }
}
export default AssignmentRepo;