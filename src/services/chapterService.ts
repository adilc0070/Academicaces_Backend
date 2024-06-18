import ChapterRepo from "../repositories/chapterRepository";

class chapterService{
    private chapterRepo: ChapterRepo

    constructor(chapterRepo: ChapterRepo) {
        this.chapterRepo = chapterRepo
    }

    async createChapter({ name, order, lessonsID, courseID,isFree }: any) {
        console.log("createChapter service", name, order, lessonsID, courseID,isFree);
        return await this.chapterRepo.createChapter({ name, order, lessonsID, courseID,isFree })
    }
    async getChapter(id: string) {
        return await this.chapterRepo.getChapter(id)
    }
    async updateChapter(id: string, data: any) {
        if(id=='-Infinity') return await this.chapterRepo.createChapter(data)       
        else return await this.chapterRepo.updateChapter(id, data)
    }
    async removeChapter(id: string) {
        return await this.chapterRepo.removeChapter(id)
    }
    async addLesson(id: string, data: any) {
        return await this.chapterRepo.addLesson(id, data)
    }
    async removeLesson(id: string, lessonId: string) {
        return await this.chapterRepo.removeLesson(id, lessonId)
    }
    async getChapters(id: string) {
        return await this.chapterRepo.getChapters(id)
    }
    async getChapterByLesson(id: string) {
        return await this.chapterRepo.getChapterByLesson(id)
    }
}

export default chapterService