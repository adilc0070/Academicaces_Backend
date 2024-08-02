"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    noCoures: {
        default: 0,
        type: Number,
    },
    isBlock: {
        type: Boolean,
        default: false
    }
});
exports.default = (0, mongoose_1.model)('Category', categorySchema);
