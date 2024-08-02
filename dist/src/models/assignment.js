"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const assignmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    courseId: {
        type: String,
        ref: "Course",
        required: true,
    },
    instructor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Instructor",
        required: true,
    },
    file: {
        type: String
    }
});
const Assignment = (0, mongoose_1.model)("Assignment", assignmentSchema);
exports.default = Assignment;
