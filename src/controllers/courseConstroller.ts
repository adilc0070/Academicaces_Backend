import { Request, Response } from "express";
// import { ICourse } from "../interfaces/courseInterface";
import CourseServices from "../services/courseService";
import InstructorService from "../services/instructorService";
import cloudinary from "../utils/coudinaryConfig";
import { ICourse, ICourseRes } from "../interfaces/courseInterface";
import lesson from "../models/lesson";


class CourseController {

    private courseService: CourseServices
    private instructorService: InstructorService


    constructor(courseService: CourseServices, instructorService: InstructorService) {
        this.courseService = courseService
        this.instructorService = instructorService
    }

    async createCourse(req: any, res: Response): Promise<ICourseRes | void> {
        try {

            let thumbnailurl: string = '', videourl: string = ''
            await cloudinary.uploader.upload(req.files?.thumbnail[0].path, {
                folder: 'Academicaces',
                resource_type: 'image'
            }).then((result) => { thumbnailurl = result.url }).catch((error) => {
                throw error
            })

            await cloudinary.uploader.upload(req.files?.video[0].path, {
                folder: 'Academicaces',
                resource_type: 'video'
            }).then((result) => { videourl = result.url }).catch((error) => {
                throw error
            })




            const { title, subtitle, category, topic, price } = req.body

            const instructor = await this.instructorService.findId(req.body.instructor)
            let course = await this.courseService.createCourse({ title, subtitle, thumbnail: thumbnailurl, instructor, category, topic, triler: videourl, price })

            res.json({ course, message: 'Course created successfully', status: true, statusCode: 200 })

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
    async listCourses(req: Request, res: Response): Promise<void> {
        try {
            const id = req.body.data
            let instructor = await this.instructorService.findId(id)
            console.log("instructor id", instructor);

            const courses: ICourse[] | null = await this.courseService.listCourses(instructor)
            console.log("courses", courses);

            if (courses) res.json({ courses, message: 'Courses fetched successfully', status: true, statusCode: 200 })
            else res.json({ error: 'Failed to fetch courses', status: false, statusCode: 500 })
        } catch (error) {
            console.error(error)
            res.json({ error: 'Failed to fetch courses', status: false, statusCode: 500 })
        }
    }
    async addCurriculum(req: any, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { sections } = req.body;

            function findingFile(req: any, lesson: any): any {
                let resultFile: any = '';

                req.files.forEach((file: any) => {
                    if (file.fieldname === lesson.fileName ) {
                        resultFile = file;
                    }
                });
                return resultFile;
            }
            function findingVideo(req: any, lesson: any): any {
                let resultFile: any = '';

                req.files.forEach((file: any) => {
                    if (file.fieldname === lesson.videoName ) {
                        resultFile = file;
                    }
                });
                return resultFile;
            }


            // Process sections and their lectures
            const processedSections = await Promise.all(sections.map(async (section: any) => {
                console.log("section", section);

                const processedLectures = await Promise.all(section.lectures.map(async (lecture: any) => {
                    console.log("lecture", lecture);
                    // console.log("video", findingFile(req, lecture));

                    const newLesson = new lesson({
                        name: lecture.name,
                        description: lecture.description,
                        notes: lecture.notes,
                        files: findingFile(req, lecture),
                        video: findingVideo(req, lecture),
                        courseId: id, // Assuming the course ID is provided in the request
                        section: section.id // Assuming each lecture belongs to a section
                    });

                    console.log("newLesson", newLesson);

                    const savedLesson = await newLesson.save();
                    return savedLesson._id; // Return the ID of the saved lesson
                }));

                return {
                    id: section.id,
                    name: section.name,
                    lectures: processedLectures
                };
            }));

            console.log('Processed Sections:', processedSections);
            processedSections.forEach(section => {
                console.log("section", section);
            })

            // Update the course with the saved lessons
            // await Course.findByIdAndUpdate(id, { $push: { lessons: { $each: processedSections.map(section => section.lectures) } } });

            res.json({ message: 'Curriculum added successfully', status: true, statusCode: 200 });
        } catch (error) {
            console.error('Error adding curriculum:', error);
            res.json({ error: 'Failed to add curriculum', status: false, statusCode: 500 });
        }
    }


}

export default CourseController