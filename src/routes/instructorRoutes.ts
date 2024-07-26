import express, { Router } from "express";
import InstructorController from "../controllers/instructorController";
import InstructorServices from "../services/instructorService";
import InstructorRepo from "../repositories/instructorRepository";
import OtpRepo from "../repositories/otpRepository";
import CourseController from "../controllers/courseConstroller";
import CourseServices from "../services/courseService";
import CourseRepo from "../repositories/courseRepository";
import { multerMid } from "../utils/multer";
import LessonService from "../services/lessonService";
import LessonRepo from "../repositories/lessonsRepository";
import chapterService from "../services/chapterService";
import ChapterRepo from "../repositories/chapterRepository";
import CatogariesService from "../services/catoogariesServices";
import CatogariesRepo from "../repositories/catogariesRepository";
import EnrolledCourseService from "../services/enrolledCourseService";
import EnrolledCourseRepo from "../repositories/enrolledCourseRepository";
import StudentServices from "../services/studentService";
import StudentRepo from "../repositories/studentRepository";
import ChatRepo from "../repositories/chatRepository";
import ChatService from "../services/chatService";
import ChatController from "../controllers/chatController";
import AssignmentRepo from "../repositories/assignmentRepository";

const instructorController = new InstructorController(new InstructorServices(new InstructorRepo(), new OtpRepo()))
const courseController = new CourseController(
    new CourseServices(new CourseRepo(),new AssignmentRepo()),
    new InstructorServices(new InstructorRepo(), new OtpRepo()),
    new LessonService(new LessonRepo()),
    new chapterService(new ChapterRepo()),
    new CatogariesService(new CatogariesRepo()),
    new EnrolledCourseService(new EnrolledCourseRepo()),
    new StudentServices(new StudentRepo(), new OtpRepo())
)
const chatController = new ChatController(new ChatService(new ChatRepo()))

const instructorRoute: Router = express.Router();
instructorRoute.get('/:id/details', instructorController.getDetails.bind(instructorController))
instructorRoute.get('/getId', instructorController.getId.bind(instructorController))
instructorRoute.get('/listInstructor', instructorController.listAll.bind(instructorController))
instructorRoute.post('/addCourse', multerMid.fields([{ name: 'thumbnail', maxCount: 1, }, { name: 'video', maxCount: 1 }]), courseController.createCourse.bind(courseController))
instructorRoute.post('/listCourses', courseController.listCourses.bind(courseController))
instructorRoute.get('/:email/blockedCourses', courseController.listBlockedCourses.bind(courseController))
instructorRoute.get('/:email/verifiedCourses', courseController.listVerifiedCourses.bind(courseController))
instructorRoute.post('/:id/curriculum', multerMid.any(), courseController.addCurriculum.bind(courseController))
instructorRoute.patch('/:id/changeStatus', courseController.blockCourse.bind(courseController))
instructorRoute.put('/:id/editCourse', multerMid.fields([{ name: 'thumbnail', maxCount: 1, }, { name: 'video', maxCount: 1 }]), courseController.editCourse.bind(courseController))
instructorRoute.put('/:id/updateCourse', multerMid.any(), courseController.updateCourse.bind(courseController))

instructorRoute.get('/:id/listChats', chatController.listInstructorChats.bind(chatController))
instructorRoute.post('/:id/sendChat', chatController.createMessage.bind(chatController))
instructorRoute.get('/:id/listMessages', chatController.getMessages.bind(chatController))
instructorRoute.post('/:id/createAssignment', multerMid.single('file'), courseController.createAssignment.bind(courseController));
instructorRoute.get('/:id/listAssignment', courseController.findInstructorAssignment.bind(courseController));
instructorRoute.get('/:id/myEarnings', courseController.myEarnings.bind(courseController))

export default instructorRoute