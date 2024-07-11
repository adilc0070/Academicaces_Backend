import {Schema, model} from "mongoose";
const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    courseID: {
        type: String,
        ref: 'Course',
        required: true
    },
    studentID: {
        type: String,
        ref: 'Student',
        required: true
    }
})

export default model('Review', reviewSchema)
