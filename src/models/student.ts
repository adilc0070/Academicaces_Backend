import { Schema, model} from "mongoose"

const studentSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio:{
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
})

export default model('Student', studentSchema)