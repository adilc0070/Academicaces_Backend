"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    courseID: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    studentID: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    replies: [
        {
            comment: String,
            studentID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Student' }
        }
    ]
});
exports.default = (0, mongoose_1.model)('Review', reviewSchema);
