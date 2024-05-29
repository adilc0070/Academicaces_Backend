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


// let adminController=new AdminController(new AdminServices(new AdminRepository()));
let studentController = new StudentController(new StudentServices(new StudentRepo(), new OtpRepo()));
let catogariesController = new CatagoriesController(new CatogariesService(new CatogariesRepo()))
let instructorController = new InstructorController(new InstructorService(new InstructorRepo(), new OtpRepo()))

let adminRoute: Router = express.Router();
// adminRoute.use(authMiddlewareAdmin)
adminRoute.get('/listUser', studentController.listStudents.bind(studentController))
adminRoute.get('/listInstructors', instructorController.listAll.bind(instructorController))
adminRoute.patch('/changeStatus/:id', studentController.blockAndUnblock.bind(studentController))

adminRoute.post('/addCatagorie', catogariesController.createCatogary.bind(catogariesController))
adminRoute.get('/listCatagories', catogariesController.getCatogaries.bind(catogariesController))
adminRoute.get('/getCatagories/:id', catogariesController.getCatogaryById.bind(catogariesController))

// adminRoute.post('/add')

export default adminRoute