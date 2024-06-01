import  express , {Router} from "express";
import InstructorController from "../controllers/instructorController";
import InstructorServices from "../services/instructorService";
import InstructorRepo from "../repositories/instructorRepository";
import OtpRepo from "../repositories/otpRepository";
import CourseController from "../controllers/courseConstroller";
import CourseServices from "../services/courseService";
import CourseRepo from "../repositories/courseRepository";



let instructorController = new InstructorController(new InstructorServices(new InstructorRepo(),new OtpRepo()))
let courseController=new CourseController(new CourseServices(new CourseRepo()),new InstructorServices(new InstructorRepo(),new OtpRepo()))

let instructorRoute: Router = express.Router();
instructorRoute.get('/listInstructor', instructorController.listAll.bind(instructorController))
instructorRoute.post('/addCourse',courseController.createCourse.bind(courseController))
instructorRoute.get('/listCourse',courseController.listCourses.bind(courseController))
export default instructorRoute