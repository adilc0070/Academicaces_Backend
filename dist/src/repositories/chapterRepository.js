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
const chapters_1 = __importDefault(require("../models/chapters"));
class ChapterRepo {
    createChapter(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, order, lessonsID, courseID, isFree }) {
            console.log("createChapter repo", name, order, lessonsID, courseID, isFree);
            return yield new chapters_1.default({ name, order, lessonsID, courseID, isFree }).save();
        });
    }
    getChapter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chapters_1.default.findById(id);
        });
    }
    updateChapter(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chapters_1.default.findByIdAndUpdate(id, data, { new: true });
        });
    }
    removeChapter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chapters_1.default.findByIdAndDelete(id);
        });
    }
    addLesson(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chapters_1.default.findByIdAndUpdate(id, { $push: { lessons: data } }, { new: true });
        });
    }
    removeLesson(id, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chapters_1.default.findByIdAndUpdate(id, { $pull: { lessons: { _id: lessonId } } }, { new: true });
        });
    }
    getChapters(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chapters_1.default.find({ courseId: id }).sort({ order: 1 });
        });
    }
    getChapterByLesson(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chapters_1.default.find({ lessonId: id });
        });
    }
}
exports.default = ChapterRepo;
