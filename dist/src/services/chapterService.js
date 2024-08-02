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
Object.defineProperty(exports, "__esModule", { value: true });
class chapterService {
    constructor(chapterRepo) {
        this.chapterRepo = chapterRepo;
    }
    createChapter(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, order, lessonsID, courseID, isFree }) {
            return yield this.chapterRepo.createChapter({ name, order, lessonsID, courseID, isFree });
        });
    }
    getChapter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chapterRepo.getChapter(id);
        });
    }
    updateChapter(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id == '-Infinity')
                return yield this.chapterRepo.createChapter(data);
            else
                return yield this.chapterRepo.updateChapter(id, data);
        });
    }
    removeChapter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chapterRepo.removeChapter(id);
        });
    }
    addLesson(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chapterRepo.addLesson(id, data);
        });
    }
    removeLesson(id, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chapterRepo.removeLesson(id, lessonId);
        });
    }
    getChapters(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chapterRepo.getChapters(id);
        });
    }
    getChapterByLesson(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chapterRepo.getChapterByLesson(id);
        });
    }
}
exports.default = chapterService;
