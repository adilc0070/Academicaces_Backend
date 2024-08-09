"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const instructorController_1 = __importDefault(require("../controllers/instructorController"));
const instructorService_1 = __importDefault(require("../services/instructorService"));
const instructorRepository_1 = __importDefault(require("../repositories/instructorRepository"));
const otpRepository_1 = __importDefault(require("../repositories/otpRepository"));
const courseConstroller_1 = __importDefault(require("../controllers/courseConstroller"));
const courseService_1 = __importDefault(require("../services/courseService"));
const courseRepository_1 = __importDefault(require("../repositories/courseRepository"));
const multer_1 = require("../utils/multer");
const lessonService_1 = __importDefault(require("../services/lessonService"));
const lessonsRepository_1 = __importDefault(require("../repositories/lessonsRepository"));
const chapterService_1 = __importDefault(require("../services/chapterService"));
const chapterRepository_1 = __importDefault(require("../repositories/chapterRepository"));
const catoogariesServices_1 = __importDefault(require("../services/catoogariesServices"));
const catogariesRepository_1 = __importDefault(require("../repositories/catogariesRepository"));
const enrolledCourseService_1 = __importDefault(require("../services/enrolledCourseService"));
const enrolledCourseRepository_1 = __importDefault(require("../repositories/enrolledCourseRepository"));
const studentService_1 = __importDefault(require("../services/studentService"));
const studentRepository_1 = __importDefault(require("../repositories/studentRepository"));
const chatRepository_1 = __importDefault(require("../repositories/chatRepository"));
const chatService_1 = __importDefault(require("../services/chatService"));
const chatController_1 = __importDefault(require("../controllers/chatController"));
const assignmentRepository_1 = __importDefault(require("../repositories/assignmentRepository"));
const instructorController = new instructorController_1.default(new instructorService_1.default(new instructorRepository_1.default(), new otpRepository_1.default()));
const courseController = new courseConstroller_1.default(new courseService_1.default(new courseRepository_1.default(), new assignmentRepository_1.default()), new instructorService_1.default(new instructorRepository_1.default(), new otpRepository_1.default()), new lessonService_1.default(new lessonsRepository_1.default()), new chapterService_1.default(new chapterRepository_1.default()), new catoogariesServices_1.default(new catogariesRepository_1.default()), new enrolledCourseService_1.default(new enrolledCourseRepository_1.default()), new studentService_1.default(new studentRepository_1.default(), new otpRepository_1.default()));
const chatController = new chatController_1.default(new chatService_1.default(new chatRepository_1.default()));
const instructorRoute = express_1.default.Router();
instructorRoute.get('/:id/details', instructorController.getDetails.bind(instructorController));
instructorRoute.get('/getId', instructorController.getId.bind(instructorController));
instructorRoute.get('/listInstructor', instructorController.listAll.bind(instructorController));
instructorRoute.post('/addCourse', multer_1.multerMid.fields([{ name: 'thumbnail', maxCount: 1, }, { name: 'video', maxCount: 1 }]), courseController.createCourse.bind(courseController));
instructorRoute.post('/listCourses', courseController.listCourses.bind(courseController));
instructorRoute.get('/:email/blockedCourses', courseController.listBlockedCourses.bind(courseController));
instructorRoute.get('/:email/verifiedCourses', courseController.listVerifiedCourses.bind(courseController));
instructorRoute.post('/:id/curriculum', multer_1.multerMid.any(), courseController.addCurriculum.bind(courseController));
instructorRoute.patch('/:id/changeStatus', courseController.blockCourse.bind(courseController));
instructorRoute.put('/:id/editCourse', multer_1.multerMid.fields([{ name: 'thumbnail', maxCount: 1, }, { name: 'video', maxCount: 1 }]), courseController.editCourse.bind(courseController));
instructorRoute.put('/:id/updateCourse', multer_1.multerMid.any(), courseController.updateCourse.bind(courseController));
instructorRoute.get('/:id/listChats', chatController.listInstructorChats.bind(chatController));
instructorRoute.post('/:id/sendChat', chatController.createMessage.bind(chatController));
instructorRoute.get('/:id/listMessages', chatController.getMessages.bind(chatController));
instructorRoute.post('/:id/createAssignment', multer_1.multerMid.single('file'), courseController.createAssignment.bind(courseController));
instructorRoute.get('/:id/listAssignment', courseController.findInstructorAssignment.bind(courseController));
instructorRoute.get('/:id/myEarnings', courseController.myEarnings.bind(courseController));
exports.default = instructorRoute;
