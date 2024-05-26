import { Schema, model } from "mongoose";
const courseScema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    instructor:{
        type:Schema.Types.ObjectId,
        ref:'Instructor',
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    enrolledStudents:{
        type:Schema.Types.ObjectId,//this is the id of the students that have enrolled how can i discribe the type 
        ref:'Student',
        required:true
    }
})


export default model('Course',courseScema)
