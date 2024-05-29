import { Schema, model } from "mongoose";

const lessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    files: [
        {
            name: {
                type: String
            },
            url: {
                type: String
            },
            type: {
                type: String
            }
        }
    ],
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
});

export default model('Lesson', lessonSchema);
