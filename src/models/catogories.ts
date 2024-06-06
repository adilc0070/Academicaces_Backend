import { Schema,model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    noCoures: {
        default: 0,
        type: Number,
    },
    verified: {
        type: Boolean,
        default: true
    }

})

export default model('Category', categorySchema)