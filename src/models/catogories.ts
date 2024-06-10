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
    isBlock: {
        type: Boolean,
        default: false
    }

})

export default model('Category', categorySchema)