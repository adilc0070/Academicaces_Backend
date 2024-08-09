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
const lesson_1 = __importDefault(require("../models/lesson"));
class LessonRepo {
    createLesson(lessonData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('lessonData from repo', lessonData);
                const newLesson = yield new lesson_1.default(lessonData);
                const savedLesson = yield newLesson.save();
                return savedLesson._id;
            }
            catch (error) {
                console.error('Error creating lesson:', error);
                throw error;
            }
        });
    }
    updateLesson(_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield lesson_1.default.findByIdAndUpdate({ _id }, data, { new: true });
            }
            catch (error) {
                console.log("error in update lesson", error);
                throw error;
            }
        });
    }
}
exports.default = LessonRepo;
