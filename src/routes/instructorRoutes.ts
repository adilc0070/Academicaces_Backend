import  express , {Router} from "express";
import InstructorController from "../controllers/instructorController";
import InstructorServices from "../services/instructorService";
import InstructorRepository from "../repositories/instructorRepository";
import { IInstructor, IInstructorRes } from "../interfaces/instructorInterrface";


let instructorController = new InstructorController(new InstructorServices(new InstructorRepository()))

let instructorRoute: Router = express.Router();
instructorRoute.get('/listInstructor', instructorController.listInstructor.bind(instructorController))

export default instructorRoute