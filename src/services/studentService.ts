import { IStudent } from "../interfaces/studentInterface"
import OtpRepo from "../repositories/otpRepository"
import StudentRepo from "../repositories/studentRepository"

class StudentServices{
    private studentRep: StudentRepo;
    private otpRepo:OtpRepo

    constructor(studentRep: StudentRepo ,otpRepo:OtpRepo) {
        this.studentRep = studentRep;
        this.otpRepo = otpRepo
    }

    async checkExistingEmail(email: string): Promise<boolean> {
        try {
            const userData:IStudent | null = await this.studentRep.findUserByEmail(email);
            return !!userData;
        } catch (error) {
            console.error("Error in checkExistingEmail:", error);
            throw error;
        }
    }

    async createUser(name: string, phone: string , email: string, password: string): Promise<UserRes> {
        try {
            // Validate required fields
            if (!name || !phone || !email || !password) {
                return { status: false, message: 'Missing required fields' };
            }

            // Check if email already exists
            const checkEmail: boolean = await this.checkExistingEmail(email);
            if (checkEmail) {
                return { status: false, message: 'Email is already in use' };
            }

            const otp:string = await sendVerifyMail(name,email)
            await this.otpRepo.createOrUpdateOtp(email,otp)

            // Hash the password
            const hashedPass: string = await bcrypt.hash(password, 10);

            // Create user
            const userData:IStudent | null = await this.studentRep.createUser(name, phone, email, hashedPass);
            if(!userData) throw error
            return {userData,status: true, message: 'User Signup successfully' };
        } catch (error) {
            console.error("Error in createUser:", error);
            throw error;
        }
    }

    async verifyOtp(_id:string,otp:string): Promise<UserRes> {
        try {

            const userData:IStudent | null = await this.studentRep.findUserById(_id)
            if(!userData) throw error
            const otpData:OtpDoc | null = await this.otpRepo.findOtpByEmail(userData.email);
            if(!otpData) throw error

            if(otpData.otp == otp){
                const userData:IStudent | null = await this.studentRep.findUserByIdAndUpdate(_id,{verified:true})
                return { userData, status: true, message: 'Verification successful' };
            }else{
                return {status:false ,message:"Otp verification filed"}
            }

        } catch (error) {
            console.error("Error in verifyOtp:", error);
            throw error;
        }
    }

    async getOtp(_id:string): Promise<Res> {
        try {

            const userData:IStudent | null = await this.studentRep.findUserById(_id)
            if(!userData) return {status:false,message:"Cant find the user"}
            const otpData:OtpDoc | null = await this.otpRepo.findOtpByEmail(userData?.email);
            return otpData ? {data:otpData,status:true ,message:"Otp get"} : {status:false ,message:"Can't find the otp"}

        } catch (error) {
            console.error("Error in getOtp:", error);
            throw error;
        }
    }

    async resendOtp(_id:string): Promise<Res> {
        try {

            const userData:IStudent | null = await this.studentRep.findUserById(_id)
            if(!userData) return {status:false,message:"Cant find the user"}

            const otp:string = await sendVerifyMail(userData.name,userData.email)
            const otpData:OtpDoc | null = await this.otpRepo.createOrUpdateOtp(userData.email,otp);

            return otpData ? {data:otpData,status:true ,message:"Otp get"} : {status:false ,message:"Can't find the otp"}

        } catch (error) {
            console.error("Error in resendOtp:", error);
            throw error;
        }
    }


    async authUser(email: string, password: string): Promise<UserRes> {
        try {
            const userData:IStudent | null = await this.studentRep.findUserByEmail(email);
            if (userData) {
                const isPasswordValid:Boolean = await bcrypt.compare(password, userData.password);
                if (isPasswordValid) {
                    if(userData.is_blocked){
                        return{status:false,message:"Admin blocked you"}
                    }else{  
                        const token: string = generateToken(userData);
                        return { userData, token, status: true, message: 'Authentication successful' };
                    }
                } else {
                    return { status: false, message: 'Incorrect password' };
                }
            } else {
                return { status: false, message: 'Email not found' };
            }
        } catch (error) {
            console.error("Error in authUser:", error);
            throw error;
        }
    }

    async listUsers(): Promise<Res> {
        try {
            const userData:IStudent[] | null= await this.studentRep.findUsers()
            return {data:userData,status:true, message:'Users find successful'}

        } catch (error) {
            console.error("Error in listUsers:", error);
            throw error;
        }
    }

    async getUserData(_id:string): Promise<Res> {
        try {

            const userData:IStudent | null= await this.studentRep.findUserById(_id)
            if(!userData) return {status:false,message:"Cant find the user"}
            return {data:userData,status:true, message:'User find successful'}

        } catch (error) {
            console.error("Error in getUserData:", error);
            throw error;
        }
    }

    async updateProfile(_id:string,name: string, phone: string , email: string, password: string ,newPassword:string,image:string): Promise<UserRes | null> {
        try {

            const oldUserData:IStudent | null = await this.studentRep.findUserById(_id)
            if(!oldUserData) return {status:false,message:'Cant find the user'}
            let newImage:string = ""
            
            if(password && oldUserData){

                const isMatch:Boolean = await bcrypt.compare(password,oldUserData.password);
                
                if(isMatch){

                    if(image){
                        if(image !== oldUserData.image){
                            newImage = await uploadFile(image, "user_profile");
                        }else{
                            newImage = oldUserData.image
                        }
                    }else{
                        newImage = oldUserData.image
                    }

                    const hashedPass: string = await bcrypt.hash(newPassword, 10);
                    const userData:IStudent | null = await this.studentRep.findUserByIdAndUpdate(_id,{name,phone,email,password:hashedPass,image:newImage})
                    if(!userData) return {status:false,message:"Something error in updating the data"}
                    return { userData, status: true, message: 'Profile Updated successfully' };

                }else{
                    return {status:false,message:"Incorrect password"}
                }
            }


            if(oldUserData){

                if(image){
                    if(image !== oldUserData.image){
                        newImage = await uploadFile(image, "user_profile");
                    }else{
                        newImage = oldUserData.image
                    }
                }else{
                    newImage = oldUserData.image
                }

                const userData:IStudent | null = await this.studentRep.findUserByIdAndUpdate(_id,{name,phone,email,image:newImage})
                return { userData, status: true, message: 'Profile Updated successfully' };
            }

            return {status:false ,message:"Something wrong"}

        } catch (error) {
            console.error("Error in updateProfile:", error);
            throw error;
        }
    }

    async changeBlockStatus(_id:string,is_blocked:Boolean): Promise<Res> {
        try {

            const userData:IStudent | null = await this.studentRep.changeBlockStatus(_id,is_blocked)
            if(!userData) return {status:false,message:"Cant find the user"}
            return {data:userData,status:true,message:`User is ${is_blocked ? "blocked" : "unblocked"}`}
            
        } catch (error) {
            console.error("Error in changeBlockStatus:", error);
            throw error;
        }
    }
}