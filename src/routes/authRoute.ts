import express, { Router } from "express"

import AdminController from "../controllers/adminController"
import AdminRepository from "../repositories/adminRepository"
import AdminServices from "../services/adminService"
import StudentController from "../controllers/studentController"
import StudentServices from "../services/studentService"
import StudentRepo from "../repositories/studentRepository"
import OtpRepo from "../repositories/otpRepository"



const adminController = new AdminController(new AdminServices(new AdminRepository()))
const studentController = new StudentController(new StudentServices(new StudentRepo(),new OtpRepo()))

const authRoute: Router = express.Router()
authRoute.get('/admin', adminController.createAdmin)
authRoute.post('/admin/login', adminController.adminLogin.bind(adminController))

authRoute.post('/user/signUp', studentController.signUpUser.bind(studentController))
authRoute.post('/user/signIn', studentController.signInUser.bind(studentController))
authRoute.post('/user/verifyOtp/', studentController.verifyUser.bind(studentController))

authRoute.get('/', (_, res) => {
    res.send("Hello Worldsaddsa!");
})

export default authRoute