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
    notes: {
        type: String,
    },
    files: {
        type: [Schema.Types.Mixed],
    },
    video: {
        type: [Schema.Types.Mixed],
    },
    chapterId: {
        type: Schema.Types.ObjectId,
        ref: 'Chapter',
        // required: true
    },
    order:{
        type: Number
    }
});

export default model('Lesson', lessonSchema);
