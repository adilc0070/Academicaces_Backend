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

})

export default model('Category', categorySchema)