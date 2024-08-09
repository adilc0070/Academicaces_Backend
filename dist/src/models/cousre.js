"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseScema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    topic: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    instructor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    enrolledStudents: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Student',
        }
    ],
    triler: {
        type: String
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    chapters: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Chapter',
        }
    ]
});
exports.default = (0, mongoose_1.model)('Course', courseScema);
