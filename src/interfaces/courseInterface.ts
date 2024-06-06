import { ObjectId } from "mongoose";

export interface ICourse  {
    title: String,
    subtitle: String,
    category: String | null,
    topic: String,
    thumbnail: | String,
    triler: String,
    instructor: ObjectId | null
    price: Number|null

}
export interface ICourseRes {
    course?: ICourse | null,
    token?: string
    status: boolean
    message: string
}