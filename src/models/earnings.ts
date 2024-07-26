import { Schema, model } from "mongoose";

const earningsSchema = new Schema({
    amount: {
        type: Number,
        default: 0
    }, date: {
        type: Date,
        default: Date.now
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
})

export default model('Earnings', earningsSchema)