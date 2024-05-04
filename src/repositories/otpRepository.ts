import { IOtp } from "../interfaces/otpInterface";
import Otp from "../models/otp";

class OtpRepo {

    async createOtp(email: string, otp: string): Promise<IOtp | null> {
        try {
            const filter = { email }
            const update = { otp }
            const options = { upsert: true, new: true }
            const sendingOtp : IOtp | null = await Otp.findOneAndUpdate(filter, update, options).exec()
            return sendingOtp
        } catch (error) {
            console.log('error in creating otp', error)
            throw error
        }
    }

    async findOtp(email: string | undefined): Promise<IOtp | null> {
        try {
            const sendingOtp: IOtp | null = await Otp.findOne({ email: email })
            return sendingOtp
        } catch (error) {
            console.log('error in finding otp', error)
            throw error
        }
    }
}

export default OtpRepo