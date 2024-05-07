import nodemailer from "nodemailer"

export const sendVerifyMail = async (name: string, email: string): Promise<string> => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_PASSWORD,
            },
        });

        let OTP = Math.floor(1000 + Math.random() * 9000).toString();

        const mailOptions = {
            from: process.env.GOOGLE_EMAIL,
            to: email,
            subject: "user verification from Academicaces",
            html: "<h1> Hello <b>" + name + "</b>,</h1> Please verify your Account, it will expire in 3 minutes. Your OTP is <b>" + OTP + "</b>",
        };

        await transporter.sendMail(mailOptions);

        return OTP;

    } catch (error: any) {
        console.log(error.message);
        throw error
    }
};