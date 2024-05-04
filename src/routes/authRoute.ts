import express,{Router,Request, Response}  from "express";
import student from "../models/student";

let authRoute:Router = express.Router();

authRoute.post("/user/signIn", (req:Request ,res: Response) => {
    console.log('req',req.body);
        student.findOne({email:req.body.email}).then((data)=>{
            console.log('data',data);
            if(data){
                if(data.password === req.body.password){
                    res.json({message:"Login Success",data:data})
                }else{
                    res.json({message:"Login Failed"})
                }
            }
        })
        console.log('res',req.body);
        res.json({message:"hello world",data:req.body})
});
authRoute.post("/user/signUp", (req:Request ,res: Response) => {
        console.log('req',req.body);
        let data = new student({
            userName:req.body.userName,
            email:req.body.email,
            password:req.body.password,
            bio:req.body.bio
        })
        data.save().then((data)=>{
            res.json({message:"Sign Up Success",data:data})
        }).catch((err)=>{
            res.json({message:"Sign Up Failed",data:err})
        })  
});

export default authRoute