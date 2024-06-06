import { Schema, model } from "mongoose";

const chapterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lessonId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lesson',
            // required: true
        }
    ],
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        // required: true
    }
})

export default model('Chapter', chapterSchema)
