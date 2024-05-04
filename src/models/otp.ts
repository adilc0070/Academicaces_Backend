import { Schema, model } from "mongoose";
import { IOtp } from "../interfaces/otpInterface"
const otpSchema = new Schema({
    email: {
        type: String,
        required: true

    },
    otp: {
        type: String,
        required: true
    }
})

export default model<IOtp>('Otp', otpSchema)