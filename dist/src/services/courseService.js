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
const bcrypt_1 = __importDefault(require("bcrypt"));
class CourseServices {
    constructor(courseRepo, assignmentRepo) {
        this.courseRepo = courseRepo,
            this.assignmentRepo = assignmentRepo;
    }
    createCourse(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, subtitle, thumbnail, instructor, category, topic, triler, price }) {
            return yield this.courseRepo.createCourse({ title, subtitle, thumbnail, instructor, category, topic, triler, price });
        });
    }
    editCourse(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.updateCourse(id, data);
        });
    }
    listCourses(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.listCourse(id);
        });
    }
    listBlockedCourses(instructor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.listBlockedCourses(instructor);
        });
    }
    listVerifiedCourses(instructor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.listVerifiedCourses(instructor);
        });
    }
    addChapter(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.addChapter(id, data);
        });
    }
    updateChapter(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.editChapter(id, data);
        });
    }
    updateCourse(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.updateCourse(id, data);
        });
    }
    listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.listAll();
        });
    }
    verifyCourse(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.verifieCourse(id, status);
        });
    }
    blockCourse(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.blockCourse(id, status);
        });
    }
    course(category, sort, page, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.course(category, sort, page, limit, search);
        });
    }
    totalDoc() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.countDoc();
        });
    }
    hashCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(id, 10);
        });
    }
    enrollCourse(id, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = yield bcrypt_1.default.compare(id, hash);
            if (!a)
                throw new Error('Invalid hash');
            const course = yield this.courseRepo.getCourse(id);
            return course;
        });
    }
    viewCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.getCourse(id);
        });
    }
    postrating(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.postRating(id, data);
        });
    }
    getReview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.getReview(id);
        });
    }
    addReply(reviewId, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.addReply(reviewId, reply);
        });
    }
    createAssignment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.assignmentRepo.createAssignment(data);
        });
    }
    findAssignment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.assignmentRepo.findAssignmentById(id);
        });
    }
    findAssignmentByInstructorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.assignmentRepo.findAssignmentByInstructorId(id);
        });
    }
    findCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseRepo.getCourse(id);
        });
    }
    findAssignmentByCourseId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.assignmentRepo.findByCourseId(id);
        });
    }
}
exports.default = CourseServices;
