import { Request, Response } from "express";
import AdminServices from "../services/adminService";
import { IAdmin, IAdminRes } from "../interfaces/adminInterface";
import { setCookie } from "../utils/coockie";
import Admin from "../models/admin";


class AdminController {
    private adminService: AdminServices

    constructor(adminService: AdminServices) {
        this.adminService = adminService
    }

    async adminLogin(req: Request, res: Response): Promise<void> {
        try {
            const { email, password }: IAdmin = req.body
            const admin: IAdminRes | null = await this.adminService.authAdmin(email, password)
            if (admin?.token) setCookie(res, 'adminToken', admin.token)
            res.status(200).json({ admin, message: "Login successful", status: true, statusCode: 200 })
        } catch (error) {
            console.error("Error in adminLogin:", error);
            res.status(500).json({ error: "Failed to login", status: false, statusCode: 500 })
        }
    }
    async createAdmin(): Promise<any> {
        try {
           let data: IAdmin | null = await new Admin({ email: "demoAdmin", password: "demoAdmin" }).save()
           if(data) console.log('demo admin created form controller',data);
           
        } catch (error) {
            console.error("Error in createADemoAdmin:", error);
        }
    }
}

export default AdminController