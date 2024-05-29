import { Request,Response } from "express";
// import { ICourse } from "../interfaces/courseInterface";
import CourseServices from "../services/courseService";


class CourseController{

    private courseService: CourseServices

    constructor(courseService: CourseServices){
        this.courseService = courseService
    }

    async createCourse(req:Request,res:Response):Promise<void>{
        try{
            // const {courseName,description}=req.body
            console.log('course ',req.body);
            let{thumbnail, video, title, subtitle,category,topic }=req.body
            console.log('course ',thumbnail, video, title, subtitle,category,topic);
            
            // const course= {}
            // console.log('course ',course);
            
            // const createdCourse = await this.courseService.createCourse(course)
            // if(createdCourse)res.json({createdCourse,message:'Course created successfully',status:true,statusCode:201})
            // else res.json({error:'Failed to create course',status:false,statusCode:500})
            return 

        }catch(error){
            console.error(error)
            res.json({error:'Failed to create course',status:false,statusCode:500})
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
    async listCourses(_req:Request,res:Response):Promise<void>{
        try{
            const courses = await this.courseService.listCourses()
            if(courses)res.json({courses,message:'Courses fetched successfully',status:true,statusCode:200})
            else res.json({error:'Failed to fetch courses',status:false,statusCode:500})
        }catch(error){
            console.error(error)
            res.json({error:'Failed to fetch courses',status:false,statusCode:500})
        }
    }
}   

export default CourseController