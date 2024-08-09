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
class LessonService {
    constructor(lessonRepo) {
        this.lessonRepo = lessonRepo;
    }
    createLesson(lessonData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.lessonRepo.createLesson(lessonData);
        });
    }
    updateLesson(_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_id == '-Infinity')
                return yield this.lessonRepo.createLesson(data);
            else
                return yield this.lessonRepo.updateLesson(_id, data);
        });
    }
}
exports.default = LessonService;
