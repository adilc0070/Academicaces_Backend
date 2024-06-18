import cousre from "../models/cousre";
import { ICourse } from "../interfaces/courseInterface";
import { ObjectId } from "mongoose";


class CourseRepo {
    async createCourse({ title, subtitle, thumbnail, instructor, category, topic, triler, price }: ICourse) {
        const newCourse = await new cousre({
            title, subtitle, thumbnail, instructor, category, topic, triler, price

        })
        return newCourse.save();
    }
    async getCourse(id: string) {
        return await cousre.aggregate([{ $match: { _id: id } }]);
    }
    async listCourse(id: ObjectId | null): Promise<ICourse[]> {
        let results = await cousre.aggregate([{ $match: { instructor: id } }]).exec();

        results = await cousre.populate(results, [
            { path: 'category', select: 'name' },
            { path: 'instructor', select: 'name' },
            { path: 'chapters', populate: { path: 'lessonsID' } }
        ]);

        return results;
    }
    async addChapter(id: string, data: any) {
        return await cousre.findByIdAndUpdate(id, { $push: { chapters: data } }, { new: true })
    }
    async editChapter(id: string, data: any) {
        return await cousre.findByIdAndUpdate(id, { $set: { chapters: data } }, { new: true })
    }
    async removeChapter(id: string, chapterId: string) {
        return await cousre.findByIdAndUpdate(id, { $pull: { chapters: { _id: chapterId } } }, { new: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } })
    }
    async updateCourse(id: string, data: any) {
        return await cousre.findByIdAndUpdate(id, data, { new: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } })
    }
    async listAll() {
        return await cousre.find({}).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } })
        
    }
    async verifieCourse(id: string, status: boolean) {
        return await cousre.findByIdAndUpdate(id, { verified: status }, { new: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } })
    }
    async blockCourse(id: string,status:boolean) {
        return await cousre.findByIdAndUpdate(id, { isBlock: status }, { new: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } })
    } 
}


export default CourseRepo