"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
    instructorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    earnings: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Earnings',
        }]
});
exports.default = (0, mongoose_1.model)('Account', accountSchema);
