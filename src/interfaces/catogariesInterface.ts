import { Document } from "mongoose";

export interface ICategory extends Document {
    name: string,
    noCoures: number,
    isBlock: boolean
}
