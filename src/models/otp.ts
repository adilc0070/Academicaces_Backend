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
    },
    createdAt: {
        type: Date,
        expires: 900000,
        default: Date.now,
    }
})

export default model<IOtp>('Otp', otpSchema)