"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cousre_1 = __importDefault(require("../models/cousre"));
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const review_1 = __importDefault(require("../models/review"));
class CourseRepo {
    createCourse(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, subtitle, thumbnail, instructor, category, topic, triler, price }) {
            const newCourse = yield new cousre_1.default({
                title, subtitle, thumbnail, instructor, category, topic, triler, price
            });
            return newCourse.save();
        });
    }
    getCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let course = yield cousre_1.default.findOne({ _id: id })
                .populate('category')
                .populate('instructor')
                .populate({ path: 'chapters', populate: { path: 'lessonsID' } })
                .exec();
            if (!course) {
                throw new Error('Course not found');
            }
            let courseObj = course.toObject();
            return courseObj;
        });
    }
    listCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield cousre_1.default.aggregate([{ $match: { instructor: id } }]).exec();
            results = yield cousre_1.default.populate(results, [
                { path: 'category', select: 'name' },
                { path: 'instructor', select: 'name' },
                { path: 'chapters', populate: { path: 'lessonsID' } }
            ]);
            return results;
        });
    }
    listBlockedCourses(instructor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cousre_1.default.find({ instructor: instructor, isBlock: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
        });
    }
    listVerifiedCourses(instructor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cousre_1.default.find({ instructor: instructor, verified: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
        });
    }
    addChapter(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cousre_1.default.findByIdAndUpdate(id, { $push: { chapters: data } }, { new: true });
        });
    }
    editChapter(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cousre_1.default.findByIdAndUpdate(id, { $set: { chapters: data } }, { new: true });
        });
    }
    removeChapter(id, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cousre_1.default.findByIdAndUpdate(id, { $pull: { chapters: { _id: chapterId } } }, { new: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
        });
    }
    updateCourse(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cousre_1.default.findByIdAndUpdate(id, data, { new: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
        });
    }
    listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cousre_1.default.find({}).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
        });
    }
    verifieCourse(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cousre_1.default.findByIdAndUpdate(id, { verified: status }, { new: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
        });
    }
    blockCourse(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cousre_1.default.findByIdAndUpdate(id, { isBlock: status }, { new: true }).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).lean().exec();
        });
    }
    course(category, sort, page, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (category && search) {
                query = { category: new mongodb_1.ObjectId(category), title: { $regex: search, $options: "i" }, verified: true };
            }
            else if (category && search === null) {
                query = { category: category, verified: true };
            }
            else if (!category && search !== null) {
                query = { title: { $regex: search, $options: "i" }, verified: true };
            }
            else {
                query = { verified: true };
            }
            const results = yield cousre_1.default.find(query)
                .sort({ price: sort })
                .skip((page - 1) * limit)
                .limit(limit).populate("category", 'name').populate("instructor", 'name').populate({ path: "chapters", populate: { path: "lessonsID" } }).exec();
            const total = yield cousre_1.default.countDocuments(query);
            return { results, total };
        });
    }
    countDoc() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cousre_1.default.countDocuments();
        });
    }
    postRating(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { courseID: id || data.courseId, studentID: data.studentId };
            const update = { rating: data.rating, comment: data.comment };
            const options = { new: true, upsert: true };
            return yield review_1.default.findOneAndUpdate(filter, update, options);
        });
    }
    getReview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return [];
            }
            return yield review_1.default.find({ courseID: new mongoose_1.Types.ObjectId(id) })
                .populate("courseID", "title")
                .populate("studentID", "userName")
                .populate("replies.studentID", "userName")
                .exec();
        });
    }
    addReply(reviewId, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield review_1.default.findByIdAndUpdate(reviewId, { $push: { replies: reply } }, { new: true });
        });
    }
}
exports.default = CourseRepo;
