"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const coudinaryConfig_1 = __importDefault(require("../utils/coudinaryConfig"));
const stripe_1 = require("../utils/stripe");
const student_1 = __importDefault(require("../models/student"));
class CourseController {
    constructor(courseService, instructorService, lessonService, chapterService, categoryService, enrollCourseService, studentService) {
        this.courseService = courseService;
        this.instructorService = instructorService;
        this.lessonService = lessonService;
        this.chapterService = chapterService;
        this.categoryService = categoryService;
        this.enrollCourseService = enrollCourseService;
        this.studentService = studentService;
    }
    createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let thumbnailurl = '', videourl = '';
                yield coudinaryConfig_1.default.uploader.upload((_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail[0].path, {
                    folder: 'Academicaces',
                    resource_type: 'image'
                }).then((result) => {
                    var _a;
                    thumbnailurl = result.url;
                    (0, fs_1.unlink)((_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail[0].path, (err) => {
                        if (err)
                            throw err;
                    });
                }).catch((error) => {
                    throw error;
                });
                yield coudinaryConfig_1.default.uploader.upload((_b = req.files) === null || _b === void 0 ? void 0 : _b.video[0].path, {
                    folder: 'Academicaces',
                    resource_type: 'video'
                }).then((result) => {
                    var _a;
                    videourl = result.url;
                    (0, fs_1.unlink)((_a = req.files) === null || _a === void 0 ? void 0 : _a.video[0].path, (err) => {
                        if (err)
                            throw err;
                    });
                }).catch((error) => {
                    throw error;
                });
                const { title, subtitle, category, topic, price } = req.body;
                const instructor = yield this.instructorService.findId(req.body.instructor);
                let course = yield this.courseService.createCourse({ title, subtitle, thumbnail: thumbnailurl, instructor, category, topic, triler: videourl, price });
                res.json({ course, message: 'Course created successfully', status: true, statusCode: 200 });
            }
            catch (error) {
                res.json({ error: `Failed to create course (${error})`, status: false, statusCode: 500 });
            }
        });
    }
    editCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const { id } = req.params;
                const { title, subtitle, category, topic, price } = req.body;
                let thumbnailurl = '', videourl = '';
                if (req.files.thumbnail) {
                    thumbnailurl = yield coudinaryConfig_1.default.uploader.upload((_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail[0].path, {
                        folder: 'Academicaces',
                        resource_type: 'image'
                    });
                    (0, fs_1.unlink)((_b = req.files) === null || _b === void 0 ? void 0 : _b.thumbnail[0].path, (err) => {
                        if (err)
                            throw err;
                    });
                }
                else {
                    thumbnailurl = req.body.thumbnail;
                }
                if (req.files.video) {
                    videourl = yield coudinaryConfig_1.default.uploader.upload((_c = req.files) === null || _c === void 0 ? void 0 : _c.video[0].path, {
                        folder: 'Academicaces',
                        resource_type: 'video'
                    });
                    (0, fs_1.unlink)((_d = req.files) === null || _d === void 0 ? void 0 : _d.video[0].path, (err) => {
                        if (err)
                            throw err;
                    });
                }
                else {
                    videourl = req.body.video;
                }
                const course = yield this.courseService.editCourse(id, { title, subtitle, thumbnail: thumbnailurl.url, category, topic, triler: videourl.url, price });
                if (course)
                    res.json({ course, message: 'Course updated successfully', status: true, statusCode: 200 });
                else
                    res.json({ error: 'Failed to update course', status: false, statusCode: 500 });
            }
            catch (error) {
                console.error(error);
                res.json({ error: 'Failed to update course', status: false, statusCode: 500 });
            }
        });
    }
    listCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req.body.data) === null || _a === void 0 ? void 0 : _a.instructorId;
                let instructor = yield this.instructorService.findId(id);
                const courses = yield this.courseService.listCourses(instructor);
                if (courses)
                    res.json({ courses, message: 'Courses fetched successfully', status: true, statusCode: 200 });
                else
                    res.json({ error: 'Failed to fetch courses', status: false, statusCode: 500 });
            }
            catch (error) {
                console.error(error);
                res.json({ error: 'Failed to fetch courses', status: false, statusCode: 500 });
            }
        });
    }
    listBlockedCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.email;
                let instructor = yield this.instructorService.findId(id);
                const courses = yield this.courseService.listBlockedCourses(instructor);
                if (courses)
                    res.json({ courses, message: 'Courses fetched successfully', status: true, statusCode: 200 });
                else
                    res.json({ error: 'Failed to fetch courses', status: false, statusCode: 500 });
            }
            catch (error) {
                console.error(error);
                res.json({ error: 'Failed to fetch courses', status: false, statusCode: 500 });
            }
        });
    }
    listVerifiedCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.email;
                let instructor = yield this.instructorService.findId(id);
                const courses = yield this.courseService.listVerifiedCourses(instructor);
                if (courses)
                    res.json({ courses, message: 'Courses fetched successfully', status: true, statusCode: 200 });
                else
                    res.json({ error: 'Failed to fetch courses', status: false, statusCode: 500 });
            }
            catch (error) {
                console.error(error);
                res.json({ error: 'Failed to fetch courses', status: false, statusCode: 500 });
            }
        });
    }
    addCurriculum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { sections } = req.body;
                function findingFile(req, lesson) {
                    let resultFile = '';
                    req.files.forEach((file) => {
                        if (file.fieldname === lesson.fileName) {
                            resultFile = file;
                        }
                    });
                    return resultFile;
                }
                function findingVideo(req, lesson) {
                    let resultFile = '';
                    req.files.forEach((file) => {
                        if (file.fieldname === lesson.videoName) {
                            resultFile = file;
                        }
                    });
                    return resultFile;
                }
                const sectionQueue = [...sections];
                const processedSections = [];
                while (sectionQueue.length > 0) {
                    const section = sectionQueue.shift();
                    const lectureQueue = [...section.lectures];
                    const processedLectures = [];
                    while (lectureQueue.length > 0) {
                        const lecture = lectureQueue.shift();
                        let filesUrl = '';
                        let videoUrl = '';
                        if (findingFile(req, lecture)) {
                            const file = findingFile(req, lecture);
                            const result = yield coudinaryConfig_1.default.uploader.upload(file.path, {
                                folder: 'Academicaces',
                                resource_type: 'auto'
                            });
                            filesUrl = result.url;
                            (0, fs_1.unlink)(file.path, (err) => {
                                if (err)
                                    throw err;
                            });
                        }
                        if (findingVideo(req, lecture)) {
                            const video = findingVideo(req, lecture);
                            const type = video.mimetype.split('/')[0];
                            const result = yield coudinaryConfig_1.default.uploader.upload(video.path, {
                                folder: 'Academicaces',
                                resource_type: type
                            });
                            videoUrl = result.url;
                            (0, fs_1.unlink)(video.path, (err) => {
                                if (err)
                                    throw err;
                            });
                        }
                        const newLesson = yield this.lessonService.createLesson({
                            name: lecture.name,
                            description: lecture.description,
                            notes: lecture.notes,
                            files: filesUrl,
                            video: videoUrl,
                            order: section.id
                        });
                        processedLectures.push(newLesson._id);
                    }
                    const newSection = yield this.chapterService.createChapter({
                        order: section.id,
                        name: section.name,
                        lessonsID: processedLectures,
                        courseID: id,
                        isFree: section.isFree === true ? true : false
                    });
                    processedSections.push(newSection._id);
                }
                let result = yield this.courseService.addChapter(id, processedSections);
                if (result)
                    yield this.categoryService.incrimentNos(result.category.toString());
                res.json({ result, message: 'Curriculum added successfully', status: true, statusCode: 200 });
            }
            catch (error) {
                console.error('Error adding curriculum:', error);
                res.json({ error: 'Failed to add curriculum', status: false, statusCode: 500 });
            }
        });
    }
    updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { sections } = req.body;
                function findingFile(req, lesson) {
                    let resultFile = '';
                    req.files.forEach((file) => {
                        if (file.fieldname === lesson.fileName) {
                            resultFile = file;
                        }
                    });
                    return resultFile;
                }
                function findingVideo(req, lesson) {
                    let resultFile = '';
                    req.files.forEach((file) => {
                        if (file.fieldname === lesson.videoName) {
                            resultFile = file;
                        }
                    });
                    return resultFile;
                }
                const processedSections = yield Promise.all(sections.map((section) => __awaiter(this, void 0, void 0, function* () {
                    const processedLectures = yield Promise.all(section.lectures.map((lecture) => __awaiter(this, void 0, void 0, function* () {
                        let filesUrl = '';
                        let videoUrl = '';
                        if (findingFile(req, lecture)) {
                            yield coudinaryConfig_1.default.uploader.upload(findingFile(req, lecture).path, {
                                folder: 'Academicaces',
                                resource_type: 'auto'
                            }).then((result) => {
                                filesUrl = result.url;
                                (0, fs_1.unlink)(findingFile(req, lecture).path, (err) => {
                                    if (err)
                                        throw err;
                                });
                            }).catch((error) => {
                                throw error;
                            });
                        }
                        if (findingVideo(req, lecture)) {
                            let type = findingVideo(req, lecture).mimetype.split('/')[0];
                            yield coudinaryConfig_1.default.uploader.upload(findingVideo(req, lecture).path, {
                                folder: 'Academicaces',
                                resource_type: type
                            }).then((result) => {
                                videoUrl = result.url;
                                (0, fs_1.unlink)(findingVideo(req, lecture).path, (err) => {
                                    if (err)
                                        throw err;
                                });
                            }).catch((error) => {
                                throw error;
                            });
                        }
                        const updatedLesson = yield this.lessonService.updateLesson(lecture.id, {
                            name: lecture.name,
                            description: lecture.description,
                            notes: lecture.notes,
                            files: filesUrl,
                            video: videoUrl,
                        });
                        return updatedLesson._id;
                    })));
                    return yield this.chapterService.updateChapter(section.id, {
                        name: section.name,
                        lessonsID: processedLectures,
                        courseID: id,
                        isFree: section.isFree == 'true' ? true : false,
                    });
                })));
                let result = yield this.courseService.updateChapter(id, processedSections.map(section => section._id));
                res.json({ result, message: 'Course Curriculum updated successfully', status: true, statusCode: 200 });
            }
            catch (error) {
                console.error('Error updating course:', error);
                res.json({ error: 'Failed to update course', status: false, statusCode: 500 });
            }
        });
    }
    listAllCourses(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield this.courseService.listAll();
                res.json({ courses, message: 'Courses fetched successfully', status: true, statusCode: 200 });
            }
            catch (error) {
                console.error('Error listing courses:', error);
                res.json({ error: 'Failed to list courses', status: false, statusCode: 500 });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { category, sort, page, limit, search } = req.query;
                let sortValue = 1;
                if (typeof sort === 'string') {
                    const parsedSort = parseInt(sort, 10);
                    if (parsedSort === 1 || parsedSort === -1) {
                        sortValue = parsedSort;
                    }
                }
                const pageValue = page ? parseInt(page, 10) : 1;
                const limitValue = limit ? parseInt(limit, 10) : 10;
                const searchValue = typeof search === 'string' ? search : null;
                const courses = yield this.courseService.course(category, sortValue, pageValue, limitValue, searchValue == '' ? null : searchValue);
                res.json({ courses: courses.results, total: courses.total, message: 'Courses fetched successfully', status: true, statusCode: 200 });
            }
            catch (error) {
                console.error('Error listing courses:', error);
                res.status(500).json({ error: 'Failed to list courses', status: false, statusCode: 500 });
            }
        });
    }
    verifyCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const status = req.body.status;
                const result = yield this.courseService.verifyCourse(id, !status);
                res.json({ result, message: 'Course verified successfully', status: true, statusCode: 200 });
            }
            catch (error) {
                console.error('Error verifying course:', error);
                res.json({ error: 'Failed to verify course', status: false, statusCode: 500 });
            }
        });
    }
    blockCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status } = req.body;
                const result = yield this.courseService.blockCourse(id, !status);
                res.json({ result, message: 'Course deleted successfully', status: true, statusCode: 200 });
            }
            catch (error) {
                console.error('Error deleting course:', error);
                res.json({ error: 'Failed to delete course', status: false, statusCode: 500 });
            }
        });
    }
    enrollCourseCheckout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { price, courseId, image, studentEmail } = req.body.data;
                const studentId = yield student_1.default.findOne({ email: studentEmail });
                const isExist = yield this.enrollCourseService.checkEnrolledCourse(studentId === null || studentId === void 0 ? void 0 : studentId._id, courseId);
                if (isExist)
                    throw new Error('Course already enrolled');
                const hash = yield this.courseService.hashCourse(courseId);
                const session = yield (0, stripe_1.buyCourse)(image, price, hash, courseId);
                res.json({ session, message: "Course enrolled successfully" });
            }
            catch (error) {
            }
        });
    }
    enroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { courseId, hash, email } = req.body.data;
                let resqq = yield this.courseService.enrollCourse(courseId, hash);
                let studentId = yield this.studentService.findUserByEmail(email);
                yield this.enrollCourseService.enroll(studentId === null || studentId === void 0 ? void 0 : studentId._id, courseId);
                res.json({ resqq, message: "Course enrolled successfully", status: true, statusCode: 200 });
            }
            catch (error) {
                console.error('Error enrolling course:', error);
                res.json({ error: 'Failed to enroll course', status: false, statusCode: 500 });
            }
        });
    }
    myCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let student = yield this.studentService.findUserByEmail(id);
                let courses = yield this.enrollCourseService.getEnrolledCourse(student === null || student === void 0 ? void 0 : student._id);
                let myCourse = [];
                courses.forEach((element) => {
                    myCourse.push(element.courseId);
                });
                res.json({ courses, myCourse, message: "Course fetched successfully", status: true, statusCode: 200 });
            }
            catch (error) {
                console.error('Error enrolling course:', error);
                res.json({ error: 'Failed to enroll course', status: false, statusCode: 500 });
            }
        });
    }
    viewCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let course = yield this.courseService.viewCourse(id);
                res.json({ course, message: "Course fetched successfully", status: true, statusCode: 200 });
            }
            catch (error) {
                console.error('Error enrolling course:', error);
                res.json({ error: 'Failed to enroll course', status: false, statusCode: 500 });
            }
        });
    }
    isEnrolled(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { id, courseId } = req.params;
                const student = yield this.studentService.findUserByEmail(id);
                if (!student) {
                    res.status(404).json({ error: 'Student not found', status: false });
                    return;
                }
                const courses = yield this.enrollCourseService.getEnrolledCourse(student === null || student === void 0 ? void 0 : student._id);
                let isEnrolled = false;
                if (courseId) {
                    for (const element of courses) {
                        if (((_a = element === null || element === void 0 ? void 0 : element.courseId) === null || _a === void 0 ? void 0 : _a._id.toString()) == courseId) {
                            isEnrolled = true;
                            break;
                        }
                    }
                }
                res.json(isEnrolled);
            }
            catch (error) {
                console.error('Error enrolling course:', error);
                res.status(500).json({ error: 'Failed to check enrollment', status: false });
            }
        });
    }
    postReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, courseId } = req.params;
                const { rating, feedback } = req.body;
                const student = yield this.studentService.findUserByEmail(id);
                if (!student) {
                    res.status(404).json({ error: 'Student not found', status: false });
                    return;
                }
                const review = {
                    rating,
                    comment: feedback,
                    studentId: student._id,
                    courseId: courseId
                };
                yield this.courseService.postrating(courseId, review);
                res.json({ message: 'Review posted successfully', status: true, statusCode: 200 });
            }
            catch (error) {
                console.error('Error posting review:', error);
                res.status(500).json({ error: 'Failed to post review', status: false });
            }
        });
    }
    postReply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reviewId } = req.params;
                const reply = req.body;
                const student = yield this.studentService.findUserByEmail(reply.studentId);
                if (!student) {
                    res.status(404).json({ error: 'Student not found', status: false });
                    return;
                }
                reply.studentID = student._id;
                const updatedReview = yield this.courseService.addReply(reviewId, reply);
                res.json({ review: updatedReview, message: 'Reply added successfully', status: true, statusCode: 200 });
            }
            catch (error) {
                console.error('Error posting reply:', error);
                res.status(500).json({ error: 'Failed to post reply', status: false });
            }
        });
    }
    getReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { courseId } = req.params;
                if (!courseId) {
                    res.status(400).json({ error: 'Course ID is required', status: false });
                    return;
                }
                const review = yield this.courseService.getReview(courseId);
                res.json({ review, message: 'Review fetched successfully', status: true, statusCode: 200 });
            }
            catch (error) {
                console.error('Error fetching review:', error);
                res.status(500).json({ error: 'Failed to fetch review', status: false });
            }
        });
    }
    createAssignment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    res.status(400).json({ error: 'No file uploaded', status: false });
                    return;
                }
                const fileUrl = req.file.path;
                const result = yield coudinaryConfig_1.default.uploader.upload(fileUrl, {
                    folder: 'Academicaces',
                    resource_type: 'auto'
                });
                (0, fs_1.unlink)(fileUrl, (err) => {
                    if (err) {
                        console.error('Error deleting local file:', err);
                    }
                });
                const { course, assignmentName, instructions } = req.body;
                const courseId = yield this.courseService.findCourse(course);
                console.log('Course:', courseId === null || courseId === void 0 ? void 0 : courseId._id);
                console.log('Assignment Name:', assignmentName);
                console.log('Instructions:', instructions);
                console.log('File URL:', result.url);
                console.log(req.params);
                const instructor = yield this.instructorService.findId(req.params.id);
                const assignment = yield this.courseService.createAssignment({
                    name: assignmentName,
                    instructions,
                    courseId: courseId === null || courseId === void 0 ? void 0 : courseId._id,
                    file: result.url,
                    instructor: instructor._id
                });
                res.status(200).json({ assignment, message: 'Assignment created successfully', status: true });
            }
            catch (error) {
                console.error('Error creating assignment:', error);
                res.status(500).json({ error: 'Failed to create assignment', status: false });
            }
        });
    }
    findAssignment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log("req.params", req.params);
                const assignment = yield this.courseService.findAssignmentByCourseId(id);
                res.status(200).json({ assignment, message: 'Assignment fetched successfully', status: true });
            }
            catch (error) {
                console.error('Error finding assignment:', error);
                res.status(500).json({ error: 'Failed to find assignment', status: false });
            }
        });
    }
    findInstructorAssignment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req.params", req.params);
                const { id } = req.params;
                const instructor = yield this.instructorService.findId(id);
                const assignments = yield this.courseService.findAssignmentByInstructorId(instructor._id);
                res.status(200).json({ assignments, message: 'Assignment fetched successfully', status: true });
            }
            catch (error) {
                console.error('Error finding assignment:', error);
                res.status(500).json({ error: 'Failed to find assignment', status: false });
            }
        });
    }
    findAssignmentByCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req.params", req.params);
                const { id } = req.params;
                const assignment = yield this.courseService.findAssignmentByCourseId(id);
                res.status(200).json({ assignment, message: 'Assignment fetched successfully', status: true });
            }
            catch (error) {
                console.error('Error finding assignment:', error);
                res.status(500).json({ error: 'Failed to find assignment', status: false });
            }
        });
    }
    myEarnings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req.params", req.params);
                const { id } = req.params;
                const earnings = yield this.enrollCourseService.myEarning(id);
                res.status(200).json({ earnings, message: 'Earnings fetched successfully', status: true });
            }
            catch (error) {
                console.error('Error finding earnings:', error);
                res.status(500).json({ error: 'Failed to find earnings', status: false });
            }
        });
    }
}
exports.default = CourseController;
