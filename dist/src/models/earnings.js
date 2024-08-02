"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const earningsSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        default: 0
    }, date: {
        type: Date,
        default: Date.now
    },
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
});
exports.default = (0, mongoose_1.model)('Earnings', earningsSchema);
