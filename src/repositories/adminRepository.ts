import Admin from "../models/admin";

class AdminRepository {

    async findUserByEmail(email: string): Promise<IAdmin | null> {
        try {  
            const user = await Admin.findOne({ email: email });