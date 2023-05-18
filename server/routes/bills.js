import { Router } from "express";
import passport from "passport";
import Transaction from "../models/transaction.js";


const router=Router();
let id;
router.get('/',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    id=req.user;
    const transaction=await Transaction.find({user_id:req.user._id}).sort({createdAt:-1});
    
    res.json({
        data:transaction,
        name:`${id.firstName} ${id.lastName}`
    })})
export default router