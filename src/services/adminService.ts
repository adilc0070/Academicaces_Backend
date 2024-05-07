import bcrypt from 'bcrypt'
import AdminRepository from "../repositories/adminRepository";
import { IAdmin, IAdminRes } from "../interfaces/adminInterface";
import { generateToken } from '../utils/jwt';

class AdminServices {

    private adminRep: AdminRepository;

    constructor(adminRep: AdminRepository) {
        this.adminRep = adminRep;
    }

    async authAdmin(email: string, password: string): Promise<IAdminRes | null> {
        try {
            const admin: IAdmin | null = await this.adminRep.findAdminByEmail(email);
            if (admin) {
                const isPasswordValid: boolean = await bcrypt.compare(password, admin.password);
                if (isPasswordValid) {
                    const token: string = generateToken(admin);
                    return { admin, token, status: true, message: 'successful' };
                } else {
                    return { status: false, message: 'Incorrect password' };
                }
            } else {
                return { status: false, message: 'admin not found' };
            }
        } catch (error) {
            console.error("Error in authAdmin:", error);
            throw error;
        }
    }

}


export default AdminServices