import { Schema, model, Types } from "mongoose";

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
        type: Types.ObjectId,
        ref: 'Course',
        required: true
    },
    studentID: {
        type: Types.ObjectId,
        ref: 'Student',
        required: true
    },
    replies: [
        {
            comment: String,
            studentID: { type: Schema.Types.ObjectId, ref: 'Student' }
        }
    ]
});

export default model('Review', reviewSchema);
