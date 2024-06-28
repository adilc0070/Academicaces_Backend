import { Schema, model } from "mongoose";
import { IOtp } from "../interfaces/otpInterface";

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
        default: Date.now,
        expires: '5m' // 5 minutes in the 'expires' option
    }
});

export default model<IOtp>('Otp', otpSchema);
