import { Request, Response } from "express";
import { unlink } from 'fs'
import CourseServices from "../services/courseService";
import InstructorService from "../services/instructorService";
import cloudinary from "../utils/coudinaryConfig";
import { ICourse, ICourseRes } from "../interfaces/courseInterface";
import LessonService from "../services/lessonService";
import chapterService from "../services/chapterService";
import CatogariesService from "../services/catoogariesServices";
import { buyCourse } from "../utils/stripe";
import EnrolledCourseService from "../services/enrolledCourseService";
import StudentServices from "../services/studentService";

// import bycrypt from "bcrypt"

class CourseController {

    private courseService: CourseServices
    private instructorService: InstructorService
    private lessonService: LessonService
    private chapterService: chapterService
    private categoryService: CatogariesService
    private enrollCourseService: EnrolledCourseService
    private studentService: StudentServices


    constructor(courseService: CourseServices, instructorService: InstructorService, lessonService: LessonService, chapterService: chapterService, categoryService: CatogariesService, enrollCourseService: EnrolledCourseService, studentService: StudentServices) {
        this.courseService = courseService
        this.instructorService = instructorService
        this.lessonService = lessonService
        this.chapterService = chapterService
        this.categoryService = categoryService
        this.enrollCourseService = enrollCourseService
        this.studentService = studentService
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
    async listBlockedCourses(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.email
            let instructor = await this.instructorService.findId(id)

            const courses: ICourse[] | null = await this.courseService.listBlockedCourses(instructor)
            if (courses) res.json({ courses, message: 'Courses fetched successfully', status: true, statusCode: 200 })
            else res.json({ error: 'Failed to fetch courses', status: false, statusCode: 500 })
        } catch (error) {
            console.error(error)
            res.json({ error: 'Failed to fetch courses', status: false, statusCode: 500 })
        }
    }

    async listVerifiedCourses(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.email
            let instructor = await this.instructorService.findId(id)

            const courses: ICourse[] | null = await this.courseService.listVerifiedCourses(instructor)
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
    async list(req: Request, res: Response): Promise<void> {
        try {
            let { category, sort, page, limit, search }: any = req.query;

            let sortValue: 1 | -1 = 1; // Default value
            if (typeof sort === 'string') {
                const parsedSort = parseInt(sort, 10);
                if (parsedSort === 1 || parsedSort === -1) {
                    sortValue = parsedSort;
                }
            }

            // Convert `page` and `limit` to numbers with default values
            const pageValue = page ? parseInt(page as string, 10) : 1;
            const limitValue = limit ? parseInt(limit as string, 10) : 10;

            const searchValue = typeof search === 'string' ? search : null;
            const courses = await this.courseService.course(category, sortValue, pageValue, limitValue, searchValue == '' ? null : searchValue);

            res.json({ courses: courses.results, total: courses.total, message: 'Courses fetched successfully', status: true, statusCode: 200 });
        } catch (error) {
            console.error('Error listing courses:', error);
            res.status(500).json({ error: 'Failed to list courses', status: false, statusCode: 500 });
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

            const { status } = req.body;
            const result = await this.courseService.blockCourse(id, !status);
            res.json({ result, message: 'Course deleted successfully', status: true, statusCode: 200 });
        } catch (error) {
            console.error('Error deleting course:', error);
            res.json({ error: 'Failed to delete course', status: false, statusCode: 500 });
        }
    }

    async enrollCourseCheckout(req: Request, res: Response): Promise<void> {
        try {
            const { price, courseId, image } = req.body.data
            let hash = await this.courseService.hashCourse(courseId)

            const session = await buyCourse(image, price, hash, courseId)

            res.json({ session, message: "Course enrolled successfully" })
        } catch (error) {

        }
    }
    async enroll(req: Request, res: Response): Promise<void> {
        try {

            const { courseId, hash, email } = req.body.data
            let resqq = await this.courseService.enrollCourse(courseId, hash,)
            let studentId = await this.studentService.findUserByEmail(email)
            await this.enrollCourseService.enroll(studentId?._id, courseId)
            res.json({ resqq, message: "Course enrolled successfully", status: true, statusCode: 200 })
        } catch (error) {
            console.error('Error enrolling course:', error);
            res.json({ error: 'Failed to enroll course', status: false, statusCode: 500 });
        }
    }
    async myCourse(req: Request, res: Response): Promise<void> {
        try {

            const { id } = req.params
            let student = await this.studentService.findUserByEmail(id)
            let courses = await this.enrollCourseService.getEnrolledCourse(student?._id)
            let myCourse: any = []
            courses.forEach((element) => {

                myCourse.push(element.courseId)
            })

            res.json({ courses, myCourse, message: "Course fetched successfully", status: true, statusCode: 200 })
        } catch (error) {
            console.error('Error enrolling course:', error);
            res.json({ error: 'Failed to enroll course', status: false, statusCode: 500 });
        }
    }

    async viewCourse(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            let course = await this.courseService.viewCourse(id)
            res.json({ course, message: "Course fetched successfully", status: true, statusCode: 200 })
        } catch (error) {
            console.error('Error enrolling course:', error);
            res.json({ error: 'Failed to enroll course', status: false, statusCode: 500 });
        }
    }




}

export default CourseController