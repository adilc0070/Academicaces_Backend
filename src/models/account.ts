import { Schema, model } from "mongoose";

const accountSchema = new Schema({
    instructorId: {
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    earnings: [{
        type: Schema.Types.ObjectId,
        ref: 'Earnings',
    }]
})

export default model('Account', accountSchema)