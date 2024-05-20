import express, { Router } from "express"

import AdminController from "../controllers/adminController"
import AdminRepository from "../repositories/adminRepository"
import AdminServices from "../services/adminService"
import StudentController from "../controllers/studentController"
import StudentServices from "../services/studentService"
import StudentRepo from "../repositories/studentRepository"
import OtpRepo from "../repositories/otpRepository"
import InstructorController from "../controllers/instructorController"
import InstructorService from "../services/instructorService"
import InstructorRepo from "../repositories/instructorRepository"



const adminController = new AdminController(new AdminServices(new AdminRepository()))
const studentController = new StudentController(new StudentServices(new StudentRepo(), new OtpRepo()))
const instructorController= new InstructorController(new InstructorService(new InstructorRepo(),new OtpRepo()))

const authRoute: Router = express.Router()
authRoute.get('/admin', adminController.createAdmin)
authRoute.post('/admin/login', adminController.adminLogin.bind(adminController))


authRoute.post('/user/signUp', studentController.signUpUser.bind(studentController))
authRoute.post('/user/signIn', studentController.signInUser.bind(studentController))
authRoute.post('/user/verifyOtp/', studentController.verifyUser.bind(studentController))
authRoute.post('/user/forgetPassword')
authRoute.post('/user/resetPassword')



authRoute.post('/instructor/signUp', instructorController.create.bind(instructorController))
authRoute.post('/instructor/SignIn', instructorController.login.bind(instructorController))
authRoute.post('/instructor/verifyOtp',)
authRoute.post('/instructor/forgetPassword',)
authRoute.post('/instructor/resetPassword',)

export default authRoute