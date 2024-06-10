import Lesson from "../models/lesson";

class LessonRepo {
    async createLesson(lessonData: any) {
        try {
            console.log('lessonData from repo', lessonData);
            
            const newLesson = await new Lesson(lessonData);
            const savedLesson = await newLesson.save();
            return savedLesson._id;
        } catch (error) {
            console.error('Error creating lesson:', error);
            throw error;
        }
    }
}

export default LessonRepo;
