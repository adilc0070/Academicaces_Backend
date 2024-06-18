import LessonRepo from "../repositories/lessonsRepository";
class LessonService {
    private lessonRepo: LessonRepo

    constructor(lessonRepo: LessonRepo) {
        this.lessonRepo = lessonRepo
    }

    async createLesson(lessonData: any) {
        console.log('lessonData from service', lessonData);
        
        return this.lessonRepo.createLesson(lessonData)

    }
    async updateLesson(_id: string, data: any) {
        if(_id=='-Infinity') return await this.lessonRepo.createLesson(data)
        else return await this.lessonRepo.updateLesson(_id, data)
    }

}
export default LessonService