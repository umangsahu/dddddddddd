import { Router } from "express";
import bcrypt from 'bcrypt';
import User from "../models/user.js";
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
const router=Router();

router.post('/register',async (req,res)=>{
    //get all form data
    const {password,email}=req.body;
    //check if user exists with same email

    const userExist = await User.findOne({email})
  
    if(userExist){
        res.status(406).json({message:"User already Exists!"});
        return ;
    }
//hashed the password

const saltRounds=10;
const salt=await bcrypt.genSaltSync(saltRounds);
const hashedPassword=await bcrypt.hashSync(password,salt)

    
     const user=await User({
         firstName:req.body.firstName ,
         lastName:req.body.lastName,
         email:req.body.email,
         Password:hashedPassword
     })
    
const savedUser=user.save();

res.status(200).json({"message":"User is created!"})
    }
   
)
router.post('/login',async (req,res)=>{
   const {email,password}=req.body;

   const userExist = await User.findOne({email})
  
    if(!userExist){
        res.status(406).json({message:"Credentials not found"});
        return ;
    }

    const matchd=await bcrypt.compare(password,userExist.Password);
    if(!matchd){
        res.status(406).json({message:"Credentials not found"});
        return
    }
 
//create jwt token
const payload={
    username:email,
    _id:userExist._id
}

const token =jwt.sign(payload,process.env.SECRET_KEY);

res.json({message:"succesfully logged in",token})
    })
export default router