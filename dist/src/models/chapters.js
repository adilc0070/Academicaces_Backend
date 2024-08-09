"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chapterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
    },
    lessonsID: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Lesson',
        }
    ],
    courseID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
    },
    isFree: {
        type: Boolean,
        default: false
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
});
exports.default = (0, mongoose_1.model)('Chapter', chapterSchema);
