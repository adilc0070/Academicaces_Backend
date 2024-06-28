import express, { Router } from "express";


// import StudentController from "../controllers/studentController";
// import StudentServices from "../services/studentService";
// import StudentRepo from "../repositories/studentRepository";
import OtpRepo from "../repositories/otpRepository";
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
import ChapterRepo from "../repositories/chapterRepository";
import EnrolledCourseService from "../services/enrolledCourseService";
import EnrolledCourseRepo from "../repositories/enrolledCourseRepository";
import StudentServices from "../services/studentService";
import StudentRepo from "../repositories/studentRepository";


// let studentController = new StudentController(new StudentServices(new StudentRepo(), new OtpRepo()));
let courseController = new CourseController(
    new CourseServices(new CourseRepo()),
    new InstructorService(new InstructorRepo(), new OtpRepo()),
    new LessonService(new LessonRepo()),
    new chapterService(new ChapterRepo()),
    new CatogariesService(new CatogariesRepo()),
    new EnrolledCourseService(new EnrolledCourseRepo()),
    new StudentServices(new StudentRepo(), new OtpRepo())
)
let studentRoute: Router = express.Router();
studentRoute.get('/listCourse', courseController.list.bind(courseController))
studentRoute.post('/enrollCourse', courseController.enrollCourseCheckout.bind(courseController))
studentRoute.post('/enroll', courseController.enroll.bind(courseController))
studentRoute.get('/myCourses/:id', courseController.myCourse.bind(courseController))
studentRoute.get('/:id/viewCourse', courseController.viewCourse.bind(courseController))


export default studentRoute