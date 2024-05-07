import Admin from "../models/admin";
import { IAdmin } from "../interfaces/adminInterface";

class AdminRepository {
    async findAdminByEmail(email: string): Promise<IAdmin | null> {
        try {
            const user = await Admin.findOne({ email: email });
            return user;
        } catch (error) {
            console.log('error in finding admin by email', error)
            throw error;
        }
    }

}

export default AdminRepository