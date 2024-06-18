import { Request, Response } from "express";
import { unlink } from 'fs'
// import { ICourse } from "../interfaces/courseInterface";
import CourseServices from "../services/courseService";
import InstructorService from "../services/instructorService";
import cloudinary from "../utils/coudinaryConfig";
import { ICourse, ICourseRes } from "../interfaces/courseInterface";
import LessonService from "../services/lessonService";
import chapterService from "../services/chapterService";
import CatogariesService from "../services/catoogariesServices";


class CourseController {

    private courseService: CourseServices
    private instructorService: InstructorService
    private lessonService: LessonService
    private chapterService: chapterService
    private categoryService: CatogariesService


    constructor(courseService: CourseServices, instructorService: InstructorService, lessonService: LessonService, chapterService: chapterService, categoryService: CatogariesService) {
        this.courseService = courseService
        this.instructorService = instructorService
        this.lessonService = lessonService
        this.chapterService = chapterService
        this.categoryService = categoryService
    }

    async createCourse(req: any, res: Response): Promise<ICourseRes | void> {
        try {
            let thumbnailurl: string = '', videourl: string = ''
            await cloudinary.uploader.upload(req.files?.thumbnail[0].path, {
                folder: 'Academicaces',
                resource_type: 'image'
            }).then((result) => {
                thumbnailurl = result.url
                unlink(req.files?.thumbnail[0].path, (err) => {
                    if (err) throw err
                })
            }).catch((error) => {
                throw error
            })

            await cloudinary.uploader.upload(req.files?.video[0].path, {
                folder: 'Academicaces',
                resource_type: 'video'
            }).then((result) => {
                videourl = result.url
                unlink(req.files?.video[0].path, (err) => {
                    if (err) throw err
                })
            }).catch((error) => {
                throw error
            })

            const { title, subtitle, category, topic, price } = req.body
            const instructor = await this.instructorService.findId(req.body.instructor)

            let course = await this.courseService.createCourse({ title, subtitle, thumbnail: thumbnailurl, instructor, category, topic, triler: videourl, price })
            res.json({ course, message: 'Course created successfully', status: true, statusCode: 200 })
        } catch (error) {
            res.json({ error: `Failed to create course (${error})`, status: false, statusCode: 500 })
        }
    }

    async editCourse(req: any, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { title, subtitle, category, topic, price } = req.body

            let thumbnailurl: any = '', videourl: any = ''
            if (req.files.thumbnail) {
                console.log("thumbnail", req.files.thumbnail);
                thumbnailurl = await cloudinary.uploader.upload(req.files?.thumbnail[0].path, {
                    folder: 'Academicaces',
                    resource_type: 'image'
                })

                unlink(req.files?.thumbnail[0].path, (err) => {
                    if (err) throw err
                })

            } else {
                thumbnailurl = req.body.thumbnail
            }

            if (req.files.video) {
                videourl = await cloudinary.uploader.upload(req.files?.video[0].path, {
                    folder: 'Academicaces',
                    resource_type: 'video'
                })
                console.log("videourl", videourl.url);

                unlink(req.files?.video[0].path, (err) => {
                    if (err) throw err
                })
            } else {

                videourl = req.body.video
            }

            const course = await this.courseService.editCourse(id, { title, subtitle, thumbnail: thumbnailurl.url, category, topic, triler: videourl.url, price })
            if (course) res.json({ course, message: 'Course updated successfully', status: true, statusCode: 200 })
            else res.json({ error: 'Failed to update course', status: false, statusCode: 500 })
        } catch (error) {
            console.error(error)
            res.json({ error: 'Failed to update course', status: false, statusCode: 500 })
        }
    }
    

    async listCourses(req: Request, res: Response): Promise<void> {
        try {
            const id = req.body.data
            let instructor = await this.instructorService.findId(id)

            const courses: ICourse[] | null = await this.courseService.listCourses(instructor)
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
                    if (file.fieldname === lesson.fileName) {
                        resultFile = file;
                    }
                });
                return resultFile;
            }
            function findingVideo(req: any, lesson: any): any {
                let resultFile: any = '';

                req.files.forEach((file: any) => {
                    if (file.fieldname === lesson.videoName) {
                        resultFile = file;
                    }
                });
                return resultFile;
            }


            // Process sections and their lectures
            const processedSections = await Promise.all(sections.map(async (section: any) => {

                const processedLectures = await Promise.all(section.lectures.map(async (lecture: any) => {
                    let filesUrl = ''
                    let videoUrl = ''
                    if (findingFile(req, lecture)) {

                        await cloudinary.uploader.upload(findingFile(req, lecture).path, {
                            folder: 'Academicaces',
                            resource_type: 'auto'
                        }).then((result) => {
                            filesUrl = result.url
                            unlink(findingFile(req, lecture).path, (err) => {
                                if (err) throw err
                            })
                        }).catch((error) => {
                            throw error
                        })
                    }
                    if (findingVideo(req, lecture)) {
                        let type = findingVideo(req, lecture).mimetype.split('/')[0]
                        await cloudinary.uploader.upload(findingVideo(req, lecture).path, {
                            folder: 'Academicaces',
                            resource_type: type
                        }).then((result) => {
                            videoUrl = result.url
                            unlink(findingVideo(req, lecture).path, (err) => {
                                if (err) throw err
                            })
                        }).catch((error) => {
                            throw error
                        })
                    }
                    const newLesson = await this.lessonService.createLesson({
                        name: lecture.name,
                        description: lecture.description,
                        notes: lecture.notes,
                        files: filesUrl,
                        video: videoUrl,
                        order: section.id
                    })

                    return newLesson._id
                }));


                return await this.chapterService.createChapter(
                    {
                        order: section.id,
                        name: section.name,
                        lessonsID: processedLectures,
                        courseID: id,
                        isFree: section.isFree ? true : false
                    });
            }));

            let result = await this.courseService.addChapter(id, processedSections.map(section => section._id));
            if (result) await this.categoryService.incrimentNos(result.category.toString());
            res.json({ result, message: 'Curriculum added successfully', status: true, statusCode: 200 });
        } catch (error) {
            console.error('Error adding curriculum:', error);
            res.json({ error: 'Failed to add curriculum', status: false, statusCode: 500 });
        }
    }

    async updateCourse(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { sections } = req.body;
    
            function findingFile(req: any, lesson: any): any {
                let resultFile: any = '';
    
                req.files.forEach((file: any) => {
                    if (file.fieldname === lesson.fileName) {
                        resultFile = file;
                    }
                });
                return resultFile;
            }
    
            function findingVideo(req: any, lesson: any): any {
                let resultFile: any = '';
    
                req.files.forEach((file: any) => {
                    if (file.fieldname === lesson.videoName) {
                        resultFile = file;
                    }
                });
                return resultFile;
            }
    
            // Process sections and their lectures
            const processedSections = await Promise.all(sections.map(async (section: any) => {
                console.log('section', section);
                const processedLectures = await Promise.all(section.lectures.map(async (lecture: any) => {
                    console.log('lecture', lecture);
                    
                    let filesUrl = '';
                    let videoUrl = '';
                    if (findingFile(req, lecture)) {
                        await cloudinary.uploader.upload(findingFile(req, lecture).path, {
                            folder: 'Academicaces',
                            resource_type: 'auto'
                        }).then((result) => {
                            filesUrl = result.url;
                            unlink(findingFile(req, lecture).path, (err) => {
                                if (err) throw err;
                            });
                        }).catch((error) => {
                            throw error;
                        });
                    }
                    if (findingVideo(req, lecture)) {
                        let type = findingVideo(req, lecture).mimetype.split('/')[0];
                        await cloudinary.uploader.upload(findingVideo(req, lecture).path, {
                            folder: 'Academicaces',
                            resource_type: type
                        }).then((result) => {
                            videoUrl = result.url;
                            unlink(findingVideo(req, lecture).path, (err) => {
                                if (err) throw err;
                            });
                        }).catch((error) => {
                            throw error;
                        });
                    }
    
                    const updatedLesson: any = await this.lessonService.updateLesson(lecture.id, {
                        name: lecture.name,
                        description: lecture.description,
                        notes: lecture.notes,
                        files: filesUrl,
                        video: videoUrl,
                    });
    
                    return updatedLesson._id;
                }));
                
    
                return await this.chapterService.updateChapter(section.id, {
                    name: section.name,
                    lessonsID: processedLectures,
                    courseID: id,
                    isFree: section.isFree == 'true' ? true : false,
                    
                });
            }));
            
    
            let result = await this.courseService.updateChapter(id, processedSections.map(section => section._id));            
            res.json({ result, message: 'Course Curriculum updated successfully', status: true, statusCode: 200 });
        } catch (error) {
            console.error('Error updating course:', error);
            res.json({ error: 'Failed to update course', status: false, statusCode: 500 });
        }
    }
    


    async listAllCourses(_req: Request, res: Response): Promise<void> {
        try {
            const courses = await this.courseService.listAll();
            res.json({ courses, message: 'Courses fetched successfully', status: true, statusCode: 200 });
        } catch (error) {
            console.error('Error listing courses:', error);
            res.json({ error: 'Failed to list courses', status: false, statusCode: 500 });
        }
    }
    async verifyCourse(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const status = req.body.status;
            const result = await this.courseService.verifyCourse(id, !status);
            res.json({ result, message: 'Course verified successfully', status: true, statusCode: 200 });
        } catch (error) {
            console.error('Error verifying course:', error);
            res.json({ error: 'Failed to verify course', status: false, statusCode: 500 });
        }
    }
    async blockCourse(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            
            const {status} = req.body;
            console.log("req.body,",status);
            
            const result = await this.courseService.blockCourse(id, !status);
            res.json({ result, message: 'Course deleted successfully', status: true, statusCode: 200 });
        } catch (error) {
            console.error('Error deleting course:', error);
            res.json({ error: 'Failed to delete course', status: false, statusCode: 500 });
        }
    }


}

export default CourseController