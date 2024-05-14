import { Request, Response } from "express";
import AdminServices from "../services/adminService";
import { IAdmin, IAdminRes } from "../interfaces/adminInterface";
import { setCookie } from "../utils/coockie";
import Admin from "../models/admin";
import bycrypt from 'bcrypt'



class AdminController {
    private adminService: AdminServices

    constructor(adminService: AdminServices) {
        this.adminService = adminService

    }

    async adminLogin(req: Request, res: Response): Promise<void> {
        try {
            const { email, password }: IAdmin = req.body.data
            const admin: IAdminRes | null = await this.adminService.authAdmin(email, password)
            if (admin?.token) {                
                setCookie(res, 'adminToken', admin.token)
                res.json({ admin, message: "Login successful", status: true, statusCode: 200 })
            }else res.json({ error: "Invalid email or password", status: false, statusCode: 400 })
        } catch (error) {
            console.error("Error in adminLogin:", error);
            res.json({ error: "Failed to login", status: false, statusCode: 500 })
        }
    }
    async createAdmin(): Promise<any> {
        try {
            let adminEmail: string = "admin@gmail.com", password: string = '0070'
            let hashPassword: string = await bycrypt.hash(password, 10)
            let data: IAdmin | null = await new Admin({ email: adminEmail, password: hashPassword }).save()
            if (data) console.log('demo admin created form controller', data);

        } catch (error) {
            console.error("Error in createADemoAdmin:", error);
        }
    }



}

export default AdminController