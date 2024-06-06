import chapters from "../models/chapters";

class ChapterRepo {

    async createChapter({name,description, lessonId, courseId}: any) {
        return await new chapters({name,description, lessonId, courseId}).save();
    }

    async getChapter(id: string) {
        return await chapters.findById(id);
    }

    async getChapters() {
        return await chapters.find();
    }

    async updateChapter(id: string, chapter: any) {
        return await chapters.findByIdAndUpdate(id, chapter, { new: true });
    }

    async deleteChapter(id: string) {
        return await chapters.findByIdAndDelete(id);
    }

    async blockStatus(id: string, status: boolean) {
        await chapters.findByIdAndUpdate(id, { verified: !status }, { new: true });
        return await this.getChapters();
    }
}

export default ChapterRepo