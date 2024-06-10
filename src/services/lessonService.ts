import LessonRepo from "../repositories/lessonsRepository";
class LessonService {
    private lessonRepo: LessonRepo

    constructor(lessonRepo: LessonRepo) {
        this.lessonRepo = lessonRepo
    }

    async createLesson(lessonData: any) {
        return this.lessonRepo.createLesson(lessonData)

    }
}
export default LessonService