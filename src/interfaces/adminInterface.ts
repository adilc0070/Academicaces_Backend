import { Document } from "mongoose";


export  interface IAdmin extends Document {
    email: string;
    password: string;
}

export interface IAdminRes {
    admin?: IAdmin | null;
    token?: string;
    status: boolean;
    message: string;
}