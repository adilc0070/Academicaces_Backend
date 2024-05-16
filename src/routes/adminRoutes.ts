import express, { Router } from "express";

// import AdminController from "../controllers/adminController";
// import AdminServices from "../services/adminService";
// import AdminRepository from "../repositories/adminRepository";

import StudentController from "../controllers/studentController";
import StudentServices from "../services/studentService";
import StudentRepo from "../repositories/studentRepository";

import OtpRepo from "../repositories/otpRepository";


// let adminController=new AdminController(new AdminServices(new AdminRepository()));
let studentController = new StudentController(new StudentServices(new StudentRepo(), new OtpRepo()));


let adminRoute: Router = express.Router();
adminRoute.get('/listUser', studentController.listStudents.bind(studentController))
adminRoute.patch('/changeStatus/:id', studentController.blockAndUnblock.bind(studentController))



export default adminRoute