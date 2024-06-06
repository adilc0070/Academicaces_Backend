import LessonRepo from "../repositories/lessonsRepository";
class LessonService {
    private lessonRepo: LessonRepo

    constructor(lessonRepo: LessonRepo) {
        this.lessonRepo = lessonRepo
    }

    async createLesson(lessonData: any) {
        console.log('lessonData', lessonData);
        return this.lessonRepo.createLesson(lessonData)

    }
}
export default LessonService