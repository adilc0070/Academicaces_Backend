import express, { Router } from "express";

// import AdminController from "../controllers/adminController";
// import AdminServices from "../services/adminService";
// import AdminRepository from "../repositories/adminRepository";

import StudentController from "../controllers/studentController";
import StudentServices from "../services/studentService";
import StudentRepo from "../repositories/studentRepository";

import OtpRepo from "../repositories/otpRepository";
// import { authMiddlewareAdmin } from "../middleware/authMidlewareAdmin";
import CatagoriesController from "../controllers/catagoriesControlller";
import CatogariesService from "../services/catoogariesServices";
import CatogariesRepo from "../repositories/catogariesRepository";
import InstructorController from "../controllers/instructorController";
import InstructorService from "../services/instructorService";
import InstructorRepo from "../repositories/instructorRepository";
import CourseController from "../controllers/courseConstroller";
import CourseServices from "../services/courseService";
import CourseRepo from "../repositories/courseRepository";
import LessonService from "../services/lessonService";
import LessonRepo from "../repositories/lessonsRepository";
import chapterService from "../services/chapterService";
import ChapterRepo from "../repositories/chapterRepository";


// let adminController=new AdminController(new AdminServices(new AdminRepository()));
let studentController = new StudentController(new StudentServices(new StudentRepo(), new OtpRepo()));
let catogariesController = new CatagoriesController(new CatogariesService(new CatogariesRepo()))
let instructorController = new InstructorController(new InstructorService(new InstructorRepo(), new OtpRepo()))
let courseController = new CourseController(new CourseServices(new CourseRepo()), new InstructorService(new InstructorRepo(), new OtpRepo()),new LessonService(new LessonRepo()),new chapterService(new ChapterRepo()),new CatogariesService(new CatogariesRepo()))
let adminRoute: Router = express.Router();
// adminRoute.use(authMiddlewareAdmin)
adminRoute.get('/listUser', studentController.listStudents.bind(studentController))
adminRoute.get('/listInstructors', instructorController.listAll.bind(instructorController))
adminRoute.patch('/changeStatus/:id', studentController.blockAndUnblock.bind(studentController))

adminRoute.post('/addCatagorie', catogariesController.createCatogary.bind(catogariesController))
adminRoute.get('/listCatagories', catogariesController.getCatogaries.bind(catogariesController))
adminRoute.get('/getCatagories/:id', catogariesController.getCatogaryById.bind(catogariesController))
adminRoute.patch('/updateCatagory/:id', catogariesController.updateCatogary.bind(catogariesController))
adminRoute.delete('/deleteCatagory/:id', catogariesController.deleteCatogary.bind(catogariesController))
adminRoute.patch('/catagory/:id/changeStatus', catogariesController.blockStatus.bind(catogariesController))
// adminRoute.post('/add')



adminRoute.get('/listAllCourses', courseController.listAllCourses.bind(courseController))
adminRoute.patch('/course/:id/changeStatus', courseController.verifyCourse.bind(courseController))
export default adminRoute