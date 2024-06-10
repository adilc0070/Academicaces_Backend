import chapters from "../models/chapters";

class ChapterRepo {

    async createChapter({ name, order, lessonsID, courseID, isFree }: any) {
        console.log("createChapter repo", name, order, lessonsID, courseID, isFree);
        return await new chapters({ name, order, lessonsID, courseID, isFree }).save()
    }
    async getChapter(id: string) {
        return await chapters.findById(id)
    }
    async updateChapter(id: string, data: any) {
        return await chapters.findByIdAndUpdate(id, data, { new: true })
    }
    async removeChapter(id: string) {
        return await chapters.findByIdAndDelete(id)
    }
    async addLesson(id: string, data: any) {
        return await chapters.findByIdAndUpdate(id, { $push: { lessons: data } }, { new: true })
    }
    async removeLesson(id: string, lessonId: string) {
        return await chapters.findByIdAndUpdate(id, { $pull: { lessons: { _id: lessonId } } }, { new: true })
    }

    async getChapters(id: string) {
        return await chapters.find({ courseId: id }).sort({ order: 1 })
    }
    async getChapterByLesson(id: string) {
        return await chapters.find({ lessonId: id })
    }
}

export default ChapterRepo