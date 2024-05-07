import { IOtp } from "../interfaces/otpInterface";
import Otp from "../models/otp";

class OtpRepo {

    async createOtp(email: string, otp: string): Promise<IOtp | null> {
        try {
            const filter = { email }
            const update = { otp }
            const options = { upsert: true, new: true }
            const sendingOtp: IOtp | null = await Otp.findOneAndUpdate(filter, update, options).exec()
            return sendingOtp
        } catch (error) {
            console.log('error in creating otp', error)
            throw error
        }
    }

    async findOtpByEmail(email: string): Promise<IOtp | null> {

        try {
            const otp: IOtp | null = await Otp.findOne({ email: email }).exec()
            return otp 
        } catch (error) {
            console.log('error in finding otp by email', error);
            return null
        }

    }
}

export default OtpRepo