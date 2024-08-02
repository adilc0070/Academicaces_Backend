"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const lessonSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    files: {
        type: [mongoose_1.Schema.Types.Mixed],
    },
    video: {
        type: [mongoose_1.Schema.Types.Mixed],
    },
    chapterId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Chapter',
    },
    order: {
        type: Number
    }
});
exports.default = (0, mongoose_1.model)('Lesson', lessonSchema);
