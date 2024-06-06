import { Schema, model } from "mongoose";
const courseScema = new Schema({
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
    price: {
        type: Number,
        required: true
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    enrolledStudents: [
        {
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            ref: 'Chapter',

        }
    ]

})


export default model('Course', courseScema)
