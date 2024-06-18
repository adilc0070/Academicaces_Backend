import { Schema, model } from "mongoose";

const chapterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        // required: true
    },
    lessonsID: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lesson',
            // required: true
        }
    ],
    courseID: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        // required: true
    },
    isFree: {
        type: Boolean,
        default: false
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    completed:{
        type: Boolean,
        default: false
    },
})

export default model('Chapter', chapterSchema)
