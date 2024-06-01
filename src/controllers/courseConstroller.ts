import { Request, Response } from "express";
// import { ICourse } from "../interfaces/courseInterface";
import CourseServices from "../services/courseService";
import InstructorService from "../services/instructorService";
import cloudinary from "../utils/coudinaryConfig";

class CourseController {

    private courseService: CourseServices
    private instructorService: InstructorService

    constructor(courseService: CourseServices,instructorService:InstructorService) {
        this.courseService = courseService
        this.instructorService = instructorService
    }

    async createCourse(req: Request, res: Response): Promise<void> {
        try {
            console.log('req.body',req.body);
            let resss=await cloudinary.uploader.upload(req.body.thumbnail)
            console.log(resss);
            
            console.log('course ', req.body.thumbnail, req.body.video,);
            let { thumbnail, video, title, subtitle, category, topic } = req.body
            console.log('course ', thumbnail, video, title, subtitle, category, topic);
            //find instructor by id
            const instructor=await this.instructorService.findId(req.body.instructor)
            console.log('instructor',instructor);

            // const course = await this.courseService.createCourse({ thumbnail, video, title, subtitle, category, topic, instructor })
            
            

            return

        } catch (error) {
            console.error(error)
            res.json({ error: 'Failed to create course', status: false, statusCode: 500 })
        }
    }

    // async getCourses(_req:Request,res:Response):Promise<void>{
    //     try{
    //         const courses = await this.courseService.getCourses()
    //         if(courses)res.json({courses,message:'Courses fetched successfully',status:true,statusCode:200})
    //         else res.json({error:'Failed to fetch courses',status:false,statusCode:500})

    //     }catch(error){
    //         console.error(error)
    //         res.json({error:'Failed to fetch courses',status:false,statusCode:500})
    //     }
    // }
    async listCourses(_req: Request, res: Response): Promise<void> {
        try {
            const courses = await this.courseService.listCourses()
            if (courses) res.json({ courses, message: 'Courses fetched successfully', status: true, statusCode: 200 })
            else res.json({ error: 'Failed to fetch courses', status: false, statusCode: 500 })
        } catch (error) {
            console.error(error)
            res.json({ error: 'Failed to fetch courses', status: false, statusCode: 500 })
        }
    }
}

export default CourseController