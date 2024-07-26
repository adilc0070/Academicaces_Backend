import cousre from "../models/cousre";
import { ICourse } from "../interfaces/courseInterface";
import { ObjectId as objid, Types } from "mongoose";
import { ObjectId } from "mongodb";
import review from "../models/review";


class CourseRepo {
    async createCourse({ title, subtitle, thumbnail, instructor, category, topic, triler, price }: ICourse) {
        const newCourse = await new cousre({
            title, subtitle, thumbnail, instructor, category, topic, triler, price

        })
        return newCourse.save();
    }
    async getCourse(id: string) {
        let course = await cousre.findOne({ _id: id })
            .populate('category',)
            .populate('instructor',)
            .populate({ path: 'chapters', populate: { path: 'lessonsID' } })
            .exec();

        if (!course) {
            throw new Error('Course not found');
        }

        let courseObj = course.toObject();


        return courseObj;
    }


    async listCourse(id: objid | null): Promise<any> {
        let results = await cousre.aggregate([{ $match: { instructor: id } }]).exec();

        results = await cousre.populate(results, [
            { path: 'category', select: 'name' },
            { path: 'instructor', select: 'name' },
            { path: 'chapters', populate: { path: 'lessonsID' } }
        ]);

        return results;
    }
    async listBlockedCourses(instructor: objid | null): Promise<any> {
        return await cousre.find({ instructor: instructor, isBlock: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
    }
    async listVerifiedCourses(instructor: objid | null): Promise<any> {
        return await cousre.find({ instructor: instructor, verified: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
    }
    async addChapter(id: string, data: any) {
        return await cousre.findByIdAndUpdate(id, { $push: { chapters: data } }, { new: true })
    }
    async editChapter(id: string, data: any) {
        return await cousre.findByIdAndUpdate(id, { $set: { chapters: data } }, { new: true })
    }
    async removeChapter(id: string, chapterId: string) {
        return await cousre.findByIdAndUpdate(id, { $pull: { chapters: { _id: chapterId } } }, { new: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
    }
    async updateCourse(id: string, data: any) {
        return await cousre.findByIdAndUpdate(id, data, { new: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
    }
    async listAll() {
        return await cousre.find({}).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
    }
    async verifieCourse(id: string, status: boolean) {
        return await cousre.findByIdAndUpdate(id, { verified: status }, { new: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
    }
    async blockCourse(id: string, status: boolean) {
        return await cousre.findByIdAndUpdate(id, { isBlock: status }, { new: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
    }
    async course(category: string, sort: 1 | -1, page: number, limit: number, search: string | null) {
        let query = {};
        // Construct the query based on the category and search parameters
        if (category && search) {
            query = { category: new ObjectId(category), title: { $regex: search, $options: "i" }, verified: true };
        } else if (category && search === null) {
            query = { category: category, verified: true };
        } else if (!category && search !== null) {
            query = { title: { $regex: search, $options: "i" }, verified: true };
        } else {
            query = { verified: true };
        }


        const results = await cousre.find(query)
            .sort({ price: sort })
            .skip((page - 1) * limit)
            .limit(limit).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).exec()

        const total = await cousre.countDocuments(query)
        return { results, total }

    }
    async countDoc() {
        return await cousre.countDocuments()
    }
    async postRating(id: string, data: any) {
        const filter = { courseID: id || data.courseId, studentID: data.studentId };
        const update = { rating: data.rating, comment: data.comment };
        const options = { new: true, upsert: true };

        return await review.findOneAndUpdate(filter, update, options);
    }


    async getReview(id: string | null) {
        if (!id) {
            return []; // or handle it as needed
        }
        return await review.find({ courseID: new Types.ObjectId(id) })
            .populate("courseID", "title")
            .populate("studentID", "userName")
            .populate("replies.studentID", "userName")
            .exec();
    }

    async addReply(reviewId: string, reply: any) {
        return await review.findByIdAndUpdate(
            reviewId,
            { $push: { replies: reply } },
            { new: true }
        );
    }


}



export default CourseRepo