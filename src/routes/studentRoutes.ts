import express, { Router } from "express";

import OtpRepo from "../repositories/otpRepository";
import ChapterRepo from "../repositories/chapterRepository";

import CourseController from "../controllers/courseConstroller";
import CourseServices from "../services/courseService";
import CourseRepo from "../repositories/courseRepository";

import InstructorService from "../services/instructorService";
import InstructorRepo from "../repositories/instructorRepository";

import LessonService from "../services/lessonService";
import LessonRepo from "../repositories/lessonsRepository";

import chapterService from "../services/chapterService";
import CatogariesRepo from "../repositories/catogariesRepository";
import CatogariesService from "../services/catoogariesServices";


import EnrolledCourseService from "../services/enrolledCourseService";
import EnrolledCourseRepo from "../repositories/enrolledCourseRepository";

import StudentController from "../controllers/studentController";
import StudentServices from "../services/studentService";
import StudentRepo from "../repositories/studentRepository";

import ChatController from "../controllers/chatController";
import ChatService from "../services/chatService";
import ChatRepo from "../repositories/chatRepository";
import AssignmentRepo from "../repositories/assignmentRepository";


const studentController = new StudentController(new StudentServices(new StudentRepo(), new OtpRepo()));
const courseController = new CourseController(
    new CourseServices(new CourseRepo(),new AssignmentRepo()),
    new InstructorService(new InstructorRepo(), new OtpRepo()),
    new LessonService(new LessonRepo()),
    new chapterService(new ChapterRepo()),
    new CatogariesService(new CatogariesRepo()),
    new EnrolledCourseService(new EnrolledCourseRepo()),
    new StudentServices(new StudentRepo(), new OtpRepo())
)

const chatController = new ChatController(new ChatService(new ChatRepo()))

const studentRoute: Router = express.Router();
studentRoute.get('/getId', studentController.getId.bind(studentController))
studentRoute.get('/listCourse', courseController.list.bind(courseController))
studentRoute.post('/enrollCourse', courseController.enrollCourseCheckout.bind(courseController))
studentRoute.post('/enroll', courseController.enroll.bind(courseController))
studentRoute.get('/myCourses/:id', courseController.myCourse.bind(courseController))
studentRoute.get('/:id/viewCourse', courseController.viewCourse.bind(courseController))
studentRoute.get('/:id/course/:courseId/isEnrolled', courseController.isEnrolled.bind(courseController))
studentRoute.post('/:id/:courseId/postReview', courseController.postReview.bind(courseController))
studentRoute.post('/reviews/:reviewId/reply', courseController.postReply.bind(courseController))
studentRoute.get('/:courseId/listReviews', courseController.getReview.bind(courseController))
studentRoute.get('/:id/getChat', chatController.getChat.bind(chatController))
studentRoute.get('/:id/listChats', chatController.listStudentChats.bind(chatController))
studentRoute.post('/:id/sendChat', chatController.createMessage.bind(chatController))
studentRoute.get('/:id/listMessages', chatController.getMessages.bind(chatController))
studentRoute.get('/:id/listAssignments', courseController.findAssignmentByCourse.bind(courseController))
studentRoute.get('/:id/getAssignment', courseController.findAssignment.bind(courseController))

export default studentRoute